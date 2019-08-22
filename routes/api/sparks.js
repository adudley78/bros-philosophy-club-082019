const express = require('express');
const router = express.Router();

// @route   GET api/sparks
// @desc    Test route
// @access  Public (no token required)
router.get('/', (req, res) => res.send('Sparks route'));

module.exports = router;
