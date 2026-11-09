const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const url = "mongodb+srv://shubbuhusain2007_db_user:rBA4JDdeWisWoadu@being07husain.qn7fjaq.mongodb.net/?appName=being07husain";;
const app = express();
const port = 3000;

const { mongoConnect } = require('./utils/database.js');
app.set('view engine', 'ejs');
const store = new MongoDBStore({
    uri: url,
    collection: "sessions"
});
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "SHUBBU HUSAIN LOVE SONAKSHI SEThi", resave: false, saveUninitialized: false, store
})
);
app.use((req, res, next) => {
    console.log("cookie set middleware", req.get("Cookie"));
    req.isLoggedIn = req.get("Cookie") ? req.get("Cookie").split('=')[1] === 'true' : false;
    next();
});
app.use(express.json());

const userRouter = require('./routes/routing.js');

app.use(userRouter);

mongoConnect(client => {

    console.log("Database ready");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

});