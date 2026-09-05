const mongoose = require('mongoose');
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log(' MongoDB connected'))
        .catch(err => console.error(' MongoDB connection error:', err));
} else {
    mongoose.set('bufferCommands', false);
    console.warn('MongoDB is not configured; static pages will work, but complaint APIs are unavailable. Set MONGO_URI in backend/.env.');
}
