const express = require("express")
const router = express.Router()


const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

// router.use(myLogger)


router.get('/register', (req, res) => {
  // res.send('register page')
  console.log('register page')
})

router.get('/login', (req, res) => {
  // res.send('login page')
  console.log('login page')
  
})

router.get('/logout', (req, res) => {
  // res.send('logout page')
  console.log('logout page')

})

router.get('/reset-password', (req, res) => {
  // res.send('reset password page')
  console.log('reset password page')

})


router.use("/auth" , myLogger , router)


module.exports = router
