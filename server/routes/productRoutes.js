const express = require('express')
const router = express.Router()
// Product controllers
const { getAll, create, buy, getCreated, getBought } = require('../controllers/product')
// Middlewares
const multer = require('multer')
const requireAuth = require('../middlewares/requireAuth')

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getAll);
router.post('/', upload.single('image'), requireAuth, create)
router.get('/created', requireAuth, getCreated)
router.get('/transactions', requireAuth, getBought)
router.put('/:id', requireAuth, buy)

module.exports = router