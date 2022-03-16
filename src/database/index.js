const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

module.exports = mongoose