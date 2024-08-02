const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    req.session.user_id = newUser.id;
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }
    req.session.user_id = user.id;
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
