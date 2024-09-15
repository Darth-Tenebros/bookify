const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.post("/add", userController.createUser);

router.get("/get-all", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.delete("/delete-all", userController.deleteAllUsers);

router.delete("/delete-one/:id", userController.deleteUserById);

router.put("/update/:id", userController.updateUserById);

module.exports = router;