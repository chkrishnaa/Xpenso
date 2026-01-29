require('dotenv').config();
const express = require('express')
const cors= require('cors')
// const path=require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const passport = require("passport");
require("./config/passport");


const app = express()
const PORT = process.env.PORT || 5000;
app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
//     console.log(`CLIENT_URL: ${process.env.CLIENT_URL}`)
//     console.log(`GOOGLE_CALLBACK_URL: ${process.env.GOOGLE_CALLBACK_URL}`)
})