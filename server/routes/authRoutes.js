const express = require('express')
const router = express.Router()
// Auth controllers
const { check, login, signup, logout } = require('../controllers/auth')
// Middlewares
const requireAuth = require('../middlewares/requireAuth')

router.get('/', requireAuth, check)
router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)

module.exports = router