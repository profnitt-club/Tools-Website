const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const projectsController = require('../controllers/projects.controller');

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
router.get('/', projectsController.getProjects);

/**
 * GET /api/projects/:id
 * Public — get single project by ID.
 */
router.get('/:id', projectsController.getProjectById);

/**
 * POST /api/projects
 * Admin — create a new project.
 */
router.post('/', authMiddleware, upload.single('thumbnail'), projectsController.createProject);

/**
 * PUT /api/projects/:id
 * Admin — update a project.
 */
router.put('/:id', authMiddleware, upload.single('thumbnail'), projectsController.updateProject);

/**
 * DELETE /api/projects/:id
 * Admin — delete a project.
 */
router.delete('/:id', authMiddleware, projectsController.deleteProject);

/**
 * PATCH /api/projects/:id/toggle-publish
 * Admin — toggle publish status.
 */
router.patch('/:id/toggle-publish', authMiddleware, projectsController.togglePublish);

module.exports = router;
