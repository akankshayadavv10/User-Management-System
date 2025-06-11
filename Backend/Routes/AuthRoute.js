const { Signup, Login } = require('../Controllers/AuthController')
const router = require('express').Router()

router.get("/signup", (req, res) => {
  res.send("Signup route is POST only. Use Postman to send a POST request.");
});
router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router