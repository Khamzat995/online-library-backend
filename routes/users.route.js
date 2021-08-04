const { Router } = require("express");
const { userController } = require("../controllers/users.controller");

const router = Router();

router.post("/user", userController.createUser);
router.get("/users", userController.getAllUsers);
router.patch("/user/:id", userController.editUser);
router.patch("/user/:id/book/:id", userController.rentBook);
router.delete("/admin/user/:id", userController.removeUser);

module.exports = router;
