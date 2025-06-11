const { Signup, Login,DeleteUser,UpdateUser } = require('../Controllers/AuthController')
const router = require('express').Router()

router.get("/signup", (req, res) => {
  res.send("Signup route is POST only. Use Postman to send a POST request.");
});
router.post('/signup', Signup)
router.post('/login', Login)
router.delete('/user/:id', DeleteUser);
router.put('/user/:id', UpdateUser);
module.exports = router