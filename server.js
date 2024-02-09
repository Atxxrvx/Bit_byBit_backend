const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/user');
const queryRoutes = require('./routes/query');
const nutritionRoutes = require('./routes/nutritionRoute');
const Appointment = require("./routes/Appointment");
const Symptom = require('./routes/symptom');
const mongoose = require('mongoose');

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('https://bitbybit-api.onrender.com/api/news', newsRoutes);
app.use('https://bitbybit-api.onrender.com/api/user', userRoutes);
app.use('https://bitbybit-api.onrender.com/api/nearby', queryRoutes);
app.use('https://bitbybit-api.onrender.com/api/nutrition', nutritionRoutes);
app.use('https://bitbybit-api.onrender.com/appointmentinfo', Appointment);
app.use('https://bitbybit-api.onrender.com/symptom', Symptom);

// Connect to the database
mongoose.connect(process.env.MONGOURI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}!!!`);
        });
    })
    .catch(err => {
        console.log(err);
    });
