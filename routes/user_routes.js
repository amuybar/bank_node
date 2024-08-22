const router = require("express").Router();
const userController = require("../controller/user_controller");



router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getuser', userController.getUser);
router.put('/updateuser', userController.updateUser);
router.delete('/deleteuser', userController.deleteUser);
module.exports = router;  