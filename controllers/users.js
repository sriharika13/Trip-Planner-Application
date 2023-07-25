const { UserModel } = require('../models/UserModel')

function getLogin(req, res) {
    res.render('login')
}

async function postRegisterInfo(req, res) {
    const { username, email, password } = req.body
    try {
        const newUser = new UserModel({ username, email })
        const registeredUser = await UserModel.register(newUser, password)
        req.login(registeredUser, ()=>{
            //plugin method creates obj tht has user_id, email, username, salt, hashed pwd saved to mongodb
            req.flash('success', "Welcome to YelpCamp!")
            res.redirect('/camping')
        })
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('/register')
    }

}

function getRegister(req, res) {
    res.render('register')
}

function postLoginInfo(req, res) {
    req.flash('success', "Welcome Back!")
    const redirectUrl= res.locals.returnTo || '/camping'
    res.redirect(redirectUrl)
}

function getLogout(req, res){
    req.logout(()=>{
        req.flash('success', 'Goodbye!')
        res.redirect('/camping')  
    })
}


module.exports = {
    getRegister,
    postRegisterInfo,
    getLogin,
    postLoginInfo,
    getLogout
};
