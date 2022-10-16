// 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


// router.get("/", userController.get_all_users);
router.get("/", userController.getAllUsers);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);


// Get single resource
router.get("/:userId", userController.getUser);
// router.get("/:userId", userController.get_a_user);


// router.patch("/:userId", userController.update_a_user);
router.patch("/:userId", userController.updateUser);


// router.delete("/:userId", userController.delete_a_user);
router.delete("/:userId", userController.deleteUser);


module.exports = router;