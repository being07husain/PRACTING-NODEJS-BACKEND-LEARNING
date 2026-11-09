const express = require('express');
const app = express();
const port = 3000;

const { mongoConnect } = require('./utils/database.js');

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("cookie set middleware", req.get("Cookie"));
    req.isLoggedIn = req.get("Cookie") ? req.get("Cookie").split('=')[1] === 'true' : false;
    next();

});
app.use(express.json());

const userRouter = require('./routes/routing.js');

app.set('view engine', 'ejs');

app.use(userRouter);

mongoConnect(client => {

    console.log("Database ready");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

});