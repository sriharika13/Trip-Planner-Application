const express = require('express')
const passport = require('passport')
const userController = require('../controllers/users')
const { storeReturnTo } = require('../middlewares')

const router = express.Router()

router.get('/login', userController.getLogin)
router.get('/register', userController.getRegister)
router.post('/register', userController.postRegisterInfo)
// can't use below middleware in register route bcoz this middleware requires user to first register , hence use req.login()
router.post('/login', 
            storeReturnTo, 
            passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
            userController.postLoginInfo)
/*Applies the nameed strategy (or strategies) to the incoming request, in order to authenticate the request. 
If authentication is successful, the user will be logged in and populated at req.user and a session will be established by default. 
If authentication fails, an unauthorized response will be sent. */
router.get('/logout', userController.getLogout)

module.exports = router