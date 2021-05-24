const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto= require("crypto");
const User= require("./dbConn").models.User;



const verifyPassword= (password, hash, salt)=>{
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

const inputFields= {
    usernameField: 'xyzname',
    passwordField: 'pasword'
}

const verifyCallback= async (username, password, authResults)=>{
    try {
        const foundUser= await User.findOne({username: username});

        if(!foundUser)
            return authResults(null, false);

        const isValid= verifyPassword(password, foundUser.hash, foundUser.salt);

        if(isValid)
            return authResults(null, foundUser);
        else
            return authResults(null, false);

    } catch (error) {
        return authResults(error);
    }
}

const strategy= new LocalStrategy(inputFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});