const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.locals.metaTags = {
    title: "Test Project",
    description: "Notification UI/UX designing for Test Project",
    keywords: "Notification UI/UX designing for Test Project",
    generator: "0.0.0.1"
  };
  res.json({
    status: "ok",
    message: "Server is running"
  });
});

module.exports = router;
