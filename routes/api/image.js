const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const auth = require('../../middleware/auth');
const User = require('../../models/Image');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Reject storing file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// @route POST api/uploadmulter
// @desc Upload an image
// @access Private
router.post('/uploadmulter', upload.single('imageData'), (req, res, next) => {
  console.log(req.body);
  [
    auth,
    [
      check('imageName', 'Image is required')
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
        const newImage = new Image({
          imageName: req.body.imageName,
          imageData: req.file.path,
          user: req.user.id
        });

        const image = await newImage.save();
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
});

module.exports = router;
