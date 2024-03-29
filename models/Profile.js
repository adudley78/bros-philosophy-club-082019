const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  profession: {
    type: String
  },
  website: {
    type: String
  },
  blog: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: [String]
  },
  bio: {
    type: String
  },
  background: {
    type: String
  },
  beliefs: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
