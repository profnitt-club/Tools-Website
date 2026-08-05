const path = require('path');
const fs = require('fs');
const { sql } = require('../config/db');

const safeParseJson = (val, fallback) => {
  if (!val) return fallback;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch (e) {
      return fallback;
    }
  }
  return val;
};

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
      tags: safeParseJson(row.tags, []),
      trades: row.trades,
      drawdown: row.drawdown,
      minCapital: row.min_capital,
      winRate: row.win_rate,
      returns: row.returns,
      monthlyFee: row.monthly_fee,
      contributors: safeParseJson(row.contributors, []),
      params: safeParseJson(row.params, []),
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
    res.status(500).json({ error: 'Failed to fetch projects: ' + err.message });
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
      tags: safeParseJson(row.tags, []),
      trades: row.trades,
      drawdown: row.drawdown,
      minCapital: row.min_capital,
      winRate: row.win_rate,
      returns: row.returns,
      monthlyFee: row.monthly_fee,
      contributors: safeParseJson(row.contributors, []),
      params: safeParseJson(row.params, []),
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
    res.status(500).json({ error: 'Failed to fetch project: ' + err.message });
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

    const parsedTags = safeParseJson(tags, []);
    const parsedContributors = safeParseJson(contributors, []);
    const parsedParams = safeParseJson(params, []);

    const createdTimeValue = createdTime || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const inserted = await sql`
      INSERT INTO projects 
        (title, description, created_time, tags, trades, drawdown, 
         min_capital, win_rate, returns, monthly_fee, contributors, 
         params, video, gitlink, thumbnail, is_published)
      VALUES (
        ${title || ''}, ${description || ''}, ${createdTimeValue}, ${parsedTags}, ${trades || ''}, ${drawdown || ''},
        ${minCapital || ''}, ${winRate || ''}, ${returns || ''}, ${monthlyFee || ''}, ${parsedContributors}, ${JSON.stringify(parsedParams)},
        ${video || ''}, ${gitlink || ''}, ${thumbnail}, ${isPublished === 'false' ? false : true}
      ) RETURNING *`;

    res.status(201).json(inserted[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project: ' + err.message });
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
    const current = existing[0];
    let thumbnail = current.thumbnail;
    if (req.file) {
      if (thumbnail) {
        const oldPath = path.join(__dirname, '..', thumbnail.replace(/^\//, ''));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      thumbnail = `/uploads/projects/${req.file.filename}`;
    }

    const safeParse = (val, fallback) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch (e) {
          return fallback;
        }
      }
      return val || fallback;
    };

    const parsedTags = safeParse(tags, current.tags || []);
    const parsedContributors = safeParse(contributors, current.contributors || []);
    const parsedParams = safeParse(params, current.params || []);

    const finalTitle = title !== undefined ? title : current.title;
    const finalDescription = description !== undefined ? description : current.description;
    const finalCreatedTime = createdTime !== undefined ? createdTime : current.created_time;
    const finalTrades = trades !== undefined ? trades : current.trades;
    const finalDrawdown = drawdown !== undefined ? drawdown : current.drawdown;
    const finalMinCapital = minCapital !== undefined ? minCapital : current.min_capital;
    const finalWinRate = winRate !== undefined ? winRate : current.win_rate;
    const finalReturns = returns !== undefined ? returns : current.returns;
    const finalMonthlyFee = monthlyFee !== undefined ? monthlyFee : current.monthly_fee;
    const finalVideo = video !== undefined ? video : current.video;
    const finalGitlink = gitlink !== undefined ? gitlink : current.gitlink;

    let finalIsPublished = current.is_published;
    if (isPublished === 'false' || isPublished === false) finalIsPublished = false;
    else if (isPublished === 'true' || isPublished === true) finalIsPublished = true;

    const updated = await sql`
      UPDATE projects SET
        title = ${finalTitle}, description = ${finalDescription}, created_time = ${finalCreatedTime}, tags = ${parsedTags},
        trades = ${finalTrades}, drawdown = ${finalDrawdown}, min_capital = ${finalMinCapital}, win_rate = ${finalWinRate},
        returns = ${finalReturns}, monthly_fee = ${finalMonthlyFee}, contributors = ${parsedContributors}, params = ${JSON.stringify(parsedParams)},
        video = ${finalVideo}, gitlink = ${finalGitlink}, thumbnail = ${thumbnail}, is_published = ${finalIsPublished},
        updated_at = NOW()
      WHERE id = ${id} RETURNING *`;

    res.json(updated[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project: ' + err.message });
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
