const express = require("express");
const {
  createPostController,
  getAllPostController,
  updatePostController,
  deletePostController,
  userPostController,
  PostByCategoryController,
} = require("../Controller/postController");

// router object
const router = express.Router();

//Create Post || Post
router.post("/create-post", createPostController);

//Get-All-Post || get
router.get("/get-all-post", getAllPostController);

//Update-Post || PUT
router.put("/update-post/id", updatePostController);

//Delete-Post || delete
router.delete("/delete-post/:id", deletePostController);

//Get-All-Post || get
router.get("/user-post", userPostController);

//Update-Post || POST
router.post("/category-post", PostByCategoryController);

module.exports = router;
