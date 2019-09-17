const mongoose = require('mongoose');

const ImageSchema = new Schema({
  imageName: {
    type: String,
    default: 'none',
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
});

module.exports = Image = mongoose.model('image', ImageSchema);
