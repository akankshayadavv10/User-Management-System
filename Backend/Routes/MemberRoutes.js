const {add,update,deleteMember, getMember,getAllMembers} = require('../Controllers/MemberController');
const { userVerification } = require('../Middlewares/AuthMiddleware');

const router = require('express').Router()

router.get("/member/:id", getMember);
router.get("/members", getAllMembers);
router.post('/member/add', add)
// router.post('/user/update',userVerification, update)
router.delete('/member/:id',deleteMember);
router.put('/member/:id', update);
// router.get('/dashboard', userVerification);
module.exports = router