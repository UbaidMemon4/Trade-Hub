const { default: mongoose } = require("mongoose");
const PostModal = require("../Modal/postModal");
const AuthModal = require("../Modal/authModal");
const { uploadImage } = require("../config/cloudinary");

// Create-New-Post Controller
exports.createPostController = async (req, res) => {
  try {
    const { title, description, category, location, token } = req.body;
    console.log("req.body =>:", req.body);

    const img = req.files;
    console.log("req.files =>:", req.files);

    // Check if required fields are provided
    if (!title || !description || !category || !location || !img || !token) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Find the user by token
    const user = await AuthModal.findOne({ token });
    console.log("user =>:", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    // Upload image to Cloudinary
    const imageData = await uploadImage(img);
    console.log("imageData =>:", imageData);
    const imageUrl = imageData.url;
    // Create a new post
    const newPost = new PostModal({
      title,
      description,
      category,
      img: imageUrl,
      modal,
      location,
    });
    console.log("newPost =>:", newPost);

    // Save the new post to the database
    await newPost.save();

    // Add post to user's post list and save user
    user.post.push(newPost);
    await user.save();

    return res.status(201).send({
      success: true,
      message: "Post created successfully",
      newPost,
      user,
    });
  } catch (error) {
    console.error("Error while creating post:", error);
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
    const populatedUser = await AuthModal.findOne({ id }).populate("posts");
    console.log("populatedUser", populatedUser);

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

// Get-Post-By-Category
exports.PostByCategoryController = async (req, res) => {
  try {
    const { category } = req.body;

    const posts = await PostModal.find({ category }).populate("auth");

    if (posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No posts found for this category",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Posts found for the given category",
      posts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching posts by category",
      error: error.message,
    });
  }
};

// Get-Post-By-Search
exports.PostBySearchController = async (req, res) => {
  try {
    const { text } = req.body;

    const posts = await db.collection
      .find({ title: { $regex: `^${text}`, $options: "i" } })
      .toArray();
    if (posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No posts found for this word",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Posts found for the given word",
      posts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching posts by search",
      error: error.message,
    });
  }
};

//Get-Id-Post
exports.idPostController = async (req, res) => {
  try {
    const { id } = req.params;
    const populatedPost = await PostModalModal.findOne({ id }).populate("Auth");

    if (!populatedPost) {
      res.status(404).send({
        success: false,
        message: "Post not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Post Found",
      populatedPost,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting Post",
      error,
    });
  }
};
