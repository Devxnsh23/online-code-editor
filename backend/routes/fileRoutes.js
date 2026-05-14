const express = require('express');
const router = express.Router();

const {
  saveFile,
  getFiles,
  deleteFile,
  getUserFiles,
} = require('../controllers/fileController');

router.post('/save', saveFile);
router.get('/', getFiles);
router.get('/user/:id', getUserFiles);
router.delete('/:id', deleteFile);

module.exports = router;