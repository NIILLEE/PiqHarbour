/* Shariff Muhammad u23611732 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const seedReasons = require('./config/seed');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const albumRoutes = require('./routes/albumRoutes');
const userRoutes = require('./routes/userRoutes');
const reasonRoutes = require('./routes/reasonRoutes');
const feedRoutes = require('./routes/feedRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(seedReasons);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reasons', reasonRoutes)
app.use('/api/feed', feedRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});