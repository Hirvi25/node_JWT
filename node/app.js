require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');

// app.get('/api', (req, res) => {
//     res.json({
//         success: 1,
//         message: "Reat api"
//     })
// })

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    next();
});

app.use("/api/user", userRouter);
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running")
})