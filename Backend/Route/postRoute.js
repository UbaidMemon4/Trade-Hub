const express = require("express");
const {
  createPostController,
  getAllPostController,
  updatePostController,
  deletePostController,
  userPostController,
  PostByCategoryController,
  PostBySearchController,
  idPostController,
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

//Get-User-Post || get
router.get("/user-post/:id", userPostController);

//Category-Post || POST
router.post("/category-post", PostByCategoryController);

//Search-Post || POST
router.post("/serch-post", PostBySearchController);

//Id-Post || POST
router.post("/id-post", idPostController);

module.exports = router;
