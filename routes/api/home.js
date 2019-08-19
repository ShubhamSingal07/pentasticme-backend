const route = require("express").Router();

const { userAuthViaToken } = require("../../middlewares");
const { getStories, getPhotos } = require("../../controllers");

// this route is called when user refreshes and send data
// accordingly if user has token in localStorage or not
route.get("/", userAuthViaToken, async (req, res) => {
  try {
    const stories = getStories(3);
    const photos = getPhotos(3);
    const res = [await stories, await photos];
    res.status(200).send({
      success: true,
      user: req.user,
      stories: res[0],
      photos: res[1],
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
});

module.exports = route;