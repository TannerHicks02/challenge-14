const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });
    res.redirect(`/posts/${req.body.post_id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
