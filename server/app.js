const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const questRoutes = require('./routes/quest');
const reflectionRoutes = require('./routes/reflection');
const rewardRoutes = require('./routes/reward');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/reflections', reflectionRoutes);
app.use('/api/rewards', rewardRoutes);



module.exports = app;
