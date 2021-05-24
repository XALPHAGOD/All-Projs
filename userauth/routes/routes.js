const router= require("express").Router();
const passport= require("passport");
const crypto = require("crypto");
const User= require("../config/dbConn").models.User;

const genPassword= (password)=>{
    var genSalt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, genSalt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: genSalt,
      hash: genHash
    };
}

router.get("/", (req, res, next)=>{
    res.send(`<h1>Home Page</h1>
    <p><a href="/register">Register</a>
    <a href="/login">Login</a></p>`);
});

router.get("/register", (req, res, next)=>{
    res.send(`<h1>Register Page</h1>
    <form method="post" action="/register">
    Enter Username:<br><input type="text" name="xyzname" autocomplete="off">
    <br>Enter Password:<br><input type="password" name="pasword" autocomplete="off">
    <br><br><input type="submit" value="Submit"></form>`);
});

router.get("/login", (req, res, next)=>{
    res.send(`<h1>Login Page</h1>
    <form method="post" action="/login">
    Enter Username:<br><input type="text" name="xyzname" autocomplete="off">
    <br>Enter Password:<br><input type="password" name="pasword" autocomplete="off">
    <br><br><input type="submit" value="Submit"></form>`);
});

router.post("/register", async (req, res, next)=>{
    const encrypted= genPassword(req.body.pasword);

    const newUser= new User({
        username: req.body.xyzname,
        hash: encrypted.hash,
        salt: encrypted.salt,
        admin: false
    });

    const resSave= await newUser.save();

    // if(resSave)
    //     console.log(resSave);

    res.redirect("/login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login-failure", successRedirect: "/login-success"}));

router.get('/login-success', (req, res, next) => {
    res.send('<p>Logged in. --> <a href="/protected-route">Go to protected route</a> <a href="/admin-route">Go to admin route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('Wrong Credentials');
});

const isAuth= (req, res, next)=>{
    if(req.isAuthenticated())
        next();
    else
        res.status(401).json({ msg: 'Un-Authorized' });
}

const isAdmin= (req, res, next)=>{
    if(req.isAuthenticated() && req.user.admin)
        next();
    else
        res.status(401).json({ msg: 'Admins Only' });
}

router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('<h1>Protected Route</h1><p><a href="/logout">Logout</a></p>');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('Admin Route.');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

module.exports= router;