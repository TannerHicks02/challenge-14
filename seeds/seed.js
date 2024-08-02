const sequelize = require('../db/connection');
const { User, Post, Comment } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Users
  const user1 = await User.create({
    username: 'user1',
    password: 'password1'
  });

  // Seed Posts
  const post1 = await Post.create({
    title: 'First Post',
    content: 'This is the content of the first post.',
    user_id: user1.id
  });

  // Seed Comments
  await Comment.create({
    content: 'This is a comment.',
    post_id: post1.id,
    user_id: user1.id
  });

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();
