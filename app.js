const express = require("express");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const {
  getUserById,
  loginUser,
  signupUser,
} = require("./query/user");

const {
  getClubDetails,
  getAllClubNames,
  deleteClub,
  addNewClub,
} = require("./query/sgc");

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use("/public", express.static("public", { extensions: ["html", "js"] }));

function requireAuthUser(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/user/login");
  }
}

function requireAuthSGC(req, res, next) {
  if (req.session.SGCId) {
    next();
  } else {
    res.redirect("/sgc");
  }
}

function requireAuthCC(req, res, next) {
  if (req.session.CCId) {
    next();
  } else {
    res.redirect("/coordinators");
  }
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/user/login", (req, res) => {
  res.render("home");
});

app.post("/user/login", async (req, res) => {
  const { u_email, u_password } = req.body;
  const user = await loginUser(u_email, u_password);

  if (!user) {
    res.render("home");
    return;
  } else {
    req.session.userId = user.u_id;
    res.redirect(`/user/${user.u_id}/home`);
  }
});

app.get("/user/signup", (req, res) => {
  res.render("home");
});

app.post("/user/signup", async (req, res) => {
  const { u_name, u_password, u_email } = req.body;

  const existUser = await loginUser(u_email, u_password);
  if (existUser) {
    return res.redirect("/");
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
  if (u_email == "sgc@iiitg.ac.in" && u_password == "iitg@123") {
    req.session.SGCId = 1;
    res.redirect("/sgc/dashboard");
  } else {
    res.redirect("/sgc");
  }
});

app.get("/sgc/dashboard", requireAuthSGC, async (req, res) => {
  if (req.session.SGCId == 1) {
    const clubs = await getAllClubNames();
    res.render("sgc/dashboard", { clubs });
  } else {
    res.redirect("/sgc");
  }
});

app.post("/sgc/dashboard/delete", async (req, res) => {
  const { c_id } = req.body;
  const del = await deleteClub(c_id);
  if (del) {
    res.redirect("/sgc/dashboard");
  } else {
    res.send("Error Occured");
  }
});

app.get("/sgc/new_club", (req, res) => {
  res.render("sgc/new_club");
})

app.post("/sgc/new_club", (req, res) => {
  const club = addNewClub(req.body);
  if(club) {
    res.redirect("/sgc/dashboard");
  }
})

app.get("/coordinators", (req, res) => {
  res.redirect("/sgc");
});

app.post("/coordinators", async (req, res) => {
  const { c_name, c_email, c_password } = req.body;
  const club = await getClubDetails({ c_name, c_email, c_password });
  if (!club) {
    res.redirect("/sgc");
  } else {
    req.session.CCId = 1;
    res.redirect("/coordinators/dashboard");
  }
});

app.get("/coordinators/dashboard", requireAuthCC, (req, res) => {
  if (req.session.CCId == 1) {
    res.render("coordinators/dashboard");
  } else {
    res.redirect("/sgc");
  }
});

app.listen(3000, () => {
  console.log("Server is running on: http://localhost:3000");
});
