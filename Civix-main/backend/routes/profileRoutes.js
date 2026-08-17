const express = require('express');
const router = express.Router();
const { 
  getUserByClerkId, 
  updateUserProfile, 
  createOrUpdateUserProfile,
  uploadProfilePicture
} = require('../controllers/profileControllers.js');
const upload = require('../middlewares/upload');

// Get user profile by Clerk ID
router.get('/:clerkUserId', getUserByClerkId);

// Update user profile
router.put('/:clerkUserId', updateUserProfile);

// Create or update user profile (for Clerk integration)
router.post('/create-or-update', createOrUpdateUserProfile);

// Upload optional profile picture
router.post('/:clerkUserId/profile-picture', upload.single('image'), uploadProfilePicture);

module.exports = router;
