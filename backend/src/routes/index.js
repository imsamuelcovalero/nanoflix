/* src/routes/index.js */
const router = require('express').Router();

const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

module.exports = router;