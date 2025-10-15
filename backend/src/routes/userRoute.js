const userController = require("../controllers/userController");
const router = require("express").Router();
const { authorization } = require("../middlewares/auth");

router.get("/", authorization(["superadmin"]), userController.findAll);
router.get("/:id", userController.findById);
router.post(
  "/createUser",
  authorization(["superadmin"]),
  userController.createUser
);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
module.exports = router;
