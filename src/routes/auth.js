const express = require("express")
const router = express.Router()


const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};


const register = function (req , res){
  res.send('register page')
}

const login = function (req , res){
  res.send('login page')
} 

const logout = function (req , res){
  res.send('logout page')
} 

const resetPassword = function (req , res){
  res.send('reset password page')
} 


router.get('/register', register)

router.get('/login', login)

router.get('/logout', logout)

router.get('/reset-password', resetPassword)


router.use("/auth" , myLogger , router)


module.exports = router
