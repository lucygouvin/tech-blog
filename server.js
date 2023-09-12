// Require packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const routes = require("./controllers");
const sequelize = require("./config/connection");
// Instantiate express and set the port depending on environment
const app = express();
const PORT = process.env.PORT || 3001;

// Instantiate the session
const sess = {
    secret: process.env.SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Instantiate handlebars, using helpers
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Express middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use routers
app.use(routes);

// Sync sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
