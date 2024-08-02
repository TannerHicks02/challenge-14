const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
