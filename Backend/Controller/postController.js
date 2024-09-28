const { default: mongoose } = require("mongoose");
const PostModal = require("../Modal/postModal");
const AuthModal = require("../Modal/authModal");

// Create-New-Post Controller
exports.createPostController = async (req, res) => {
  try {
    const { title, description, category, img, modal, location, token } =
      req.body;
    // User validation: Check if all required fields are present

    if (!title || !description || !category || !img || !location || !token) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // Find the user by token
    const user = await AuthModal.findOne({ token });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }
    // Create a new post
    const newPost = new PostModal({
      title,
      description,
      category,
      img,
      modal,
      location,
    });
    // Save the new post to the database
    await newPost.save();
    user.post.push(newPost);
    // Save the updated user
    await user.save();
    return res.status(201).send({
      success: true,
      message: "Post created successfully",
      newPost,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while creating post",
      error: error.message,
    });
  }
};

//Get-All-Post
exports.getAllPostController = async (req, res) => {
  try {
    const posts = await PostModal.find({}).populate("auth");
    if (!posts) {
      return res.status(400).send({
        success: false,
        message: "post not found",
      });
    }
    return res.status(200).send({
      success: true,
      postCount: posts.length,
      message: "all post list",
      posts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error While Getting All Blogs",
      error,
    });
  }
};

//Update-Post
exports.updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModal.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Post Updated Suceesful",
      post,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating Post",
      error,
    });
  }
};

//Delete-Post
exports.deletePostController = async (req, res) => {
  try {
    const Post = await PostModal.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Post Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while delete Post",
      error,
    });
  }
};

//Get-User-Post
exports.userPostController = async (req, res) => {
  try {
    const { id } = req.params;
    const token = id;
    const populatedUser = await AuthModal.findOne({ token }).populate("Post");
    if (!populatedUser) {
      res.status(404).send({
        success: false,
        message: "Post not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Post",
      populatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in user Post",
      error,
    });
  }
};

//Get-Post-By-Category
// exports.PostByCategoryController = async (req, res) => {
//   try {
//     const { category } = req.body;

//     const posts = await PostModal.find({}).populate("auth");
//     console.log("posts=>", category);
//     const categoryPost = posts.filter((post) => post.category === category);
//     console.log("categoryPost=>", categoryPost);
//     if (!categoryPost) {
//       res.status(404).send({
//         success: false,
//         message: "Post not found with this category",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: "Category Found Sucessfully by this category Post",
//       posts,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: "Error in user Post",
//       error,
//     });
//   }
// };
// Get-Post-By-Category
exports.PostByCategoryController = async (req, res) => {
  try {
    const { category } = req.body;

    // Fetch all posts and populate the 'auth' field
    const posts = await PostModal.find({}).populate("auth");

    // Filter posts by category
    const categoryPost = posts.filter((post) => post.category === category);

    if (categoryPost.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No posts found for this category",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Posts found for the given category",
      categoryPost,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching posts by category",
      error: error.message, // Include error details
    });
  }
};
