const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Spark = require('../../models/Spark');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/sparks
// @desc    Create a spark
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newSpark = new Spark({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const spark = await newSpark.save();

      res.json(spark);
    } catch (er) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/sparks
// @desc    Read all sparks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const sparks = await Spark.find().sort({ date: -1 });
    res.json(sparks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/sparks/:id
// @desc    Get spark by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const spark = await Spark.findById(req.params.id);

    if (!spark) {
      return res.status(404).json({ msg: 'Spark not found' });
    }
    res.json(spark);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Spark not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/sparks/:id
// @desc    Delete a spark
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const spark = await Spark.findById(req.params.id);

    if (!spark) {
      return res.status(404).json({ msg: 'Spark not found' });
    }

    // Check user
    if (spark.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await spark.remove();

    res.json({ msg: 'Spark removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Spark not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
