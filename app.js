const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AdminRouter = require("./routes/Admin");
const Newsrouter = require("./routes/News");
const DashboardRouter = require("./routes/Dashboard");
const AboutRouter = require("./routes/About-us");
const BlogRouter = require("./routes/Blog");
const AuthRouter = require("./routes/Auth");
const UseCaseRouter = require("./routes/Use-case");
const EcommerceRouter = require("./routes/E-commerce");
const { engine } = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const ContactRouter = require("./routes/Contact-information");
const policy = require("./routes/privacyRouter");
const story = require("./routes/storyRouter");
const caseRouter = require("./routes/caseRouter");
const contactInfo = require("./routes/contactInfoRouter");
const hiringData = require("./routes/hiringRouter")
const dashAdminRouter = require("./routes/dashAdminRouter")
const IndustrieRouter = require("./routes/Industries")
const serviceRouter = require("./routes/serviceRouter")
const subscribRouter = require("./routes/SubscribeRouter")

dotenv.config();
const app = express();

app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    })
);

// For accessing  in publicly
app.use("/public", express.static("public"));

app.use("/api", AuthRouter);
app.use("/admin", AdminRouter);
app.use("/api", Newsrouter);
app.use("/v2", DashboardRouter);
app.use("/aboutus", AboutRouter);
app.use("/blog", BlogRouter);
app.use("/e-commerce", EcommerceRouter);
app.use("/Use-case", UseCaseRouter); 
app.use("/contact-us", ContactRouter);
app.use("/policy", policy);
app.use("/story", story);
app.use("/case", caseRouter);
app.use("/contact-info", contactInfo);
app.use("/hiring",hiringData)
app.use("/dashAdmin",dashAdminRouter)
app.use("/industrie",IndustrieRouter)
app.use("/service",serviceRouter)
app.use ('/subscribe',subscribRouter)

app.get("/", (req, res) => {
    res.sendStatus(200);
});

// database connection created
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected successfully!")) 
    .catch(console.log);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// multer error middleware

app.use((error, req, res, next) => {
    const message = `This is the unexpected field ->${error.field}`;
    console.log(message);
    return res.status(500).send(message);
});

//server created
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
});
