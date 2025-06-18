const { Signup, Login,DeleteUser,UpdateUser } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router()

router.get("/signup", (req, res) => {
  res.send("Signup route is POST only. Use Postman to send a POST request.");
});
router.post('/signup', Signup)
router.post('/login',userVerification, Login)
router.delete('/user/:id', DeleteUser);
router.put('/user/:id', UpdateUser);
// router.get('/dashboard', userVerification);
module.exports = router