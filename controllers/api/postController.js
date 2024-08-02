const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/new', (req, res) => {
  res.render('createPost');
});

router.post('/new', async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [User]
    });
    res.render('post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
