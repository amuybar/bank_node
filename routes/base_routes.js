const router = require("express").Router();
const baseController = require("../controller/base_controller");
const { authenticate, authorize } = require("../middleware/auth_middleware");



router.get('/', authenticate, baseController.gethealthCheck);
router.get('/admin',authorize,baseController.getAdminCheck)


module.exports = router;