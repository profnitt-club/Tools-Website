const path = require('path');
const fs = require('fs');
const { sql } = require('../config/db');

const getProjects = async (req, res) => {
  try {
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

    let rows;
    if (showAll) {
      rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    } else {
      rows = await sql`SELECT * FROM projects WHERE is_published = ${true} ORDER BY created_at DESC`;
    }

    const projects = rows.length ? rows.map((row) => ({
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
    })) : [];

    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await sql`SELECT * FROM projects WHERE id = ${id}`;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const row = rows[0];
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
};

const createProject = async (req, res) => {
  try {
    const {
      title, description, createdTime, tags, trades, drawdown,
      minCapital, winRate, returns, monthlyFee, contributors,
      params, video, gitlink, isPublished,
    } = req.body;

    const thumbnail = req.file ? `/uploads/projects/${req.file.filename}` : null;

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : (tags || []);
    const parsedContributors = typeof contributors === 'string' ? JSON.parse(contributors) : (contributors || []);
    const parsedParams = typeof params === 'string' ? JSON.parse(params) : (params || []);

    const createdTimeValue = createdTime || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const inserted = await sql`
      INSERT INTO projects 
        (title, description, created_time, tags, trades, drawdown, 
         min_capital, win_rate, returns, monthly_fee, contributors, 
         params, video, gitlink, thumbnail, is_published)
      VALUES (
        ${title}, ${description}, ${createdTimeValue}, ${parsedTags}, ${trades}, ${drawdown},
        ${minCapital}, ${winRate}, ${returns}, ${monthlyFee}, ${parsedContributors}, ${parsedParams},
        ${video}, ${gitlink}, ${thumbnail}, ${isPublished === 'false' ? false : true}
      ) RETURNING *`;

    res.status(201).json(inserted[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project.' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, description, createdTime, tags, trades, drawdown,
      minCapital, winRate, returns, monthlyFee, contributors,
      params, video, gitlink, isPublished,
    } = req.body;

    const existing = await sql`SELECT * FROM projects WHERE id = ${id}`;
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    let thumbnail = existing[0].thumbnail;
    if (req.file) {
      if (thumbnail) {
        const oldPath = path.join(__dirname, '..', thumbnail.replace(/^\//, ''));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      thumbnail = `/uploads/projects/${req.file.filename}`;
    }

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : (tags || existing[0].tags);
    const parsedContributors = typeof contributors === 'string' ? JSON.parse(contributors) : (contributors || existing[0].contributors);
    const parsedParams = typeof params === 'string' ? JSON.parse(params) : (params || existing[0].params);

    const updated = await sql`
      UPDATE projects SET
        title = ${title}, description = ${description}, created_time = ${createdTime}, tags = ${parsedTags},
        trades = ${trades}, drawdown = ${drawdown}, min_capital = ${minCapital}, win_rate = ${winRate},
        returns = ${returns}, monthly_fee = ${monthlyFee}, contributors = ${parsedContributors}, params = ${parsedParams},
        video = ${video}, gitlink = ${gitlink}, thumbnail = ${thumbnail}, is_published = ${isPublished === 'false' ? false : (isPublished === 'true' ? true : existing[0].is_published)},
        updated_at = NOW()
      WHERE id = ${id} RETURNING *`;

    res.json(updated[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project.' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await sql`SELECT thumbnail FROM projects WHERE id = ${id}`;
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    if (existing[0].thumbnail) {
      const filePath = path.join(__dirname, '..', existing[0].thumbnail.replace(/^\//, ''));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await sql`DELETE FROM projects WHERE id = ${id}`;
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
};

const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await sql`UPDATE projects SET is_published = NOT is_published, updated_at = NOW() WHERE id = ${id} RETURNING *`;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error toggling publish:', err);
    res.status(500).json({ error: 'Failed to toggle publish status.' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
};
