const express = require("express");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const { getUserById, loginUser, signupUser } = require("./query/user");

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

function requireAuthUser(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/user/login");
  }
}

function requireAuthSGC(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/sgc");
  }
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/user/login", (req, res) => {
  res.render("user/login");
});

app.post("/user/login", async (req, res) => {
  const { u_email, u_password } = req.body;
  const user = await loginUser(u_email, u_password);

  if (!user) {
    res.render("user/login");
    return;
  } else {
    req.session.userId = user.u_id;
    res.redirect(`/user/${user.u_id}/home`);
  }
});

app.get("/user/signup", (req, res) => {
  res.render("user/signup");
});

app.post("/user/signup", async (req, res) => {
  const { u_name, u_password, u_email } = req.body;

  const existUser = await loginUser(u_email, u_password);
  if (existUser) {
    return res.redirect("/user/login");
  } else {
    const newUser = await signupUser({ u_name, u_password, u_email });
    req.session.userId = newUser.u_id;

    return res.redirect(`/user/${newUser.u_id}/home`);
  }
});

app.get("/user/:userId/home", requireAuthUser, (req, res) => {
  const userId = req.params.userId;
  if (userId == req.session.userId) {
    res.render("user/home");
  } else {
    res.send("Hi");
  }
});

app.get("/sgc", (req, res) => {
  res.render("sgc/login");
});

app.post("/sgc", (req, res) => {
  const { u_email, u_password } = req.body;
  if (u_email === "sgc@iiitg.ac.in" && u_password === "iitg@123") {
    req.session.SGCId = 1;
    res.redirect("/sgc/dashboard");
  } else {
    res.redirect("/sgc");
  }
});

app.get("/sgc/dashboard", requireAuthSGC, (req, res) => {
  if (req.session.SGCId == 1) {
    res.render("sgc/dashboard");
  }
  else{
    res.redirect("/sgc");
  }
});

app.listen(3000, () => {
  console.log("Server is running on: http://localhost:3000");
});
