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

// @route   PUT api/sparks/upvote/:id
// @desc    Upvote a spark
// @access  Private
router.put('/upvote/:id', auth, async (req, res) => {
  try {
    const spark = await Spark.findById(req.params.id);

    // Check if spark has already been upvoted by this user
    if (
      spark.upvotes.filter(upvote => upvote.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Spark already upvoted' });
    }

    spark.upvotes.unshift({ user: req.user.id });

    await spark.save();

    res.json(spark.upvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/sparks/unupvote/:id
// @desc    Un-upvote a spark
// @access  Private
router.put('/unupvote/:id', auth, async (req, res) => {
  try {
    const spark = await Spark.findById(req.params.id);

    // Check if spark has already been upvoted by this user
    if (
      spark.upvotes.filter(upvote => upvote.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Spark has not yet been upvoted' });
    }

    // Get remove index
    const removeIndex = spark.upvotes
      .map(upvote => upvote.user.toString())
      .indexOf(req.user.id);

    spark.upvotes.splice(removeIndex, 1);

    await spark.save();

    res.json(spark.upvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/sparks/comment/:id
// @desc    Create comment on a spark
// @access  Private
router.post(
  '/comment/:id',
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
      const spark = await Spark.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      spark.comments.unshift(newComment);

      await spark.save();

      res.json(spark.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/sparks/comment/:id/:comment_id
// @desc    Delete comment on a spark
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const spark = await Spark.findById(req.params.id);

    // Pull out comment
    const comment = spark.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = spark.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    spark.comments.splice(removeIndex, 1);

    await spark.save();

    res.json(spark.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
