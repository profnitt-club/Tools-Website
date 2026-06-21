const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool } = require('../config/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configure multer for project thumbnail uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'projects');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

/**
 * GET /api/projects
 * Public — list all published projects.
 * Admin (with token) — list all projects including drafts.
 */
router.get('/', async (req, res) => {
  try {
    // Check if admin token is present (optional)
    let showAll = false;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const jwt = require('jsonwebtoken');
        jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
        showAll = true;
      } catch (e) {
        // Invalid token — just show published
      }
    }

    const query = showAll
      ? 'SELECT * FROM projects ORDER BY created_at DESC'
      : 'SELECT * FROM projects WHERE is_published = true ORDER BY created_at DESC';

    const result = await pool.query(query);

    // Transform rows to match frontend expected format
    const projects = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      createdTime: row.created_time,
      tags: row.tags || [],
      trades: row.trades,
      drawdown: row.drawdown,
      minCapital: row.min_capital,
      winRate: row.win_rate,
      returns: row.returns,
      monthlyFee: row.monthly_fee,
      contributors: row.contributors || [],
      params: row.params || [],
      video: row.video,
      gitlink: row.gitlink,
      thumbnail: row.thumbnail,
      isPublished: row.is_published,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

/**
 * GET /api/projects/:id
 * Public — get single project by ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const row = result.rows[0];
    const project = {
      id: row.id,
      title: row.title,
      description: row.description,
      createdTime: row.created_time,
      tags: row.tags || [],
      trades: row.trades,
      drawdown: row.drawdown,
      minCapital: row.min_capital,
      winRate: row.win_rate,
      returns: row.returns,
      monthlyFee: row.monthly_fee,
      contributors: row.contributors || [],
      params: row.params || [],
      video: row.video,
      gitlink: row.gitlink,
      thumbnail: row.thumbnail,
      isPublished: row.is_published,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project.' });
  }
});

/**
 * POST /api/projects
 * Admin — create a new project.
 */
router.post('/', authMiddleware, upload.single('thumbnail'), async (req, res) => {
  try {
    const {
      title, description, createdTime, tags, trades, drawdown,
      minCapital, winRate, returns, monthlyFee, contributors,
      params, video, gitlink, isPublished,
    } = req.body;

    const thumbnail = req.file ? `/uploads/projects/${req.file.filename}` : null;

    // Parse arrays and JSON that come as strings from form data
    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : (tags || []);
    const parsedContributors = typeof contributors === 'string' ? JSON.parse(contributors) : (contributors || []);
    const parsedParams = typeof params === 'string' ? JSON.parse(params) : (params || []);

    const result = await pool.query(
      `INSERT INTO projects 
        (title, description, created_time, tags, trades, drawdown, 
         min_capital, win_rate, returns, monthly_fee, contributors, 
         params, video, gitlink, thumbnail, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [
        title, description, createdTime || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        parsedTags, trades, drawdown, minCapital, winRate, returns,
        monthlyFee, parsedContributors, JSON.stringify(parsedParams),
        video, gitlink, thumbnail,
        isPublished === 'false' ? false : true,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

/**
 * PUT /api/projects/:id
 * Admin — update a project.
 */
router.put('/:id', authMiddleware, upload.single('thumbnail'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, description, createdTime, tags, trades, drawdown,
      minCapital, winRate, returns, monthlyFee, contributors,
      params, video, gitlink, isPublished,
    } = req.body;

    // Check if project exists
    const existing = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    let thumbnail = existing.rows[0].thumbnail;
    if (req.file) {
      // Delete old thumbnail if exists
      if (thumbnail) {
        const oldPath = path.join(__dirname, '..', thumbnail);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      thumbnail = `/uploads/projects/${req.file.filename}`;
    }

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : (tags || existing.rows[0].tags);
    const parsedContributors = typeof contributors === 'string' ? JSON.parse(contributors) : (contributors || existing.rows[0].contributors);
    const parsedParams = typeof params === 'string' ? JSON.parse(params) : (params || existing.rows[0].params);

    const result = await pool.query(
      `UPDATE projects SET
        title = $1, description = $2, created_time = $3, tags = $4,
        trades = $5, drawdown = $6, min_capital = $7, win_rate = $8,
        returns = $9, monthly_fee = $10, contributors = $11, params = $12,
        video = $13, gitlink = $14, thumbnail = $15, is_published = $16,
        updated_at = NOW()
       WHERE id = $17 RETURNING *`,
      [
        title, description, createdTime, parsedTags, trades, drawdown,
        minCapital, winRate, returns, monthlyFee, parsedContributors,
        JSON.stringify(parsedParams), video, gitlink, thumbnail,
        isPublished === 'false' ? false : (isPublished === 'true' ? true : existing.rows[0].is_published),
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

/**
 * DELETE /api/projects/:id
 * Admin — delete a project.
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Get project to delete thumbnail file
    const existing = await pool.query('SELECT thumbnail FROM projects WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Delete thumbnail file if exists
    if (existing.rows[0].thumbnail) {
      const filePath = path.join(__dirname, '..', existing.rows[0].thumbnail);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

/**
 * PATCH /api/projects/:id/toggle-publish
 * Admin — toggle publish status.
 */
router.patch('/:id/toggle-publish', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE projects SET is_published = NOT is_published, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error toggling publish:', err);
    res.status(500).json({ error: 'Failed to toggle publish status.' });
  }
});

module.exports = router;
