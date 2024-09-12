// Create web server
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// Create comments array
const comments = [
  {
    id: 1,
    name: "John Doe",
    comment: "I am John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
    comment: "I am Jane Doe",
  },
  {
    id: 3,
    name: "Jim Doe",
    comment: "I am Jim Doe",
  },
];
// Get all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});
// Get comment by id
app.get("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  if (!comment) {
    res.status(404).send("Comment not found");
    return;
  }
  res.json(comment);
});
// Create new comment
app.post("/comments", (req, res) => {
  const { name, comment } = req.body;
  const id = comments.length + 1;
  comments.push({ id, name, comment });
  res.json({ id, name, comment });
});
// Update comment
app.put("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, comment } = req.body;
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex === -1) {
    res.status(404).send("Comment not found");
    return;
  }
  comments[commentIndex] = { id, name, comment };
  res.json({ id, name, comment });
});
// Delete comment
app.delete("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex === -1) {
    res.status(404).send("Comment not found");
    return;
  }
  comments.splice(commentIndex, 1);
  res.send("Comment deleted");
});
// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000