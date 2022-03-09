const { Post } = require('../models');

const posts = [
    {
        title: 'Example Post',
        content: 'Example content: testing testing one two three',
        user_id: 1
    },
    {
        title: 'Example Post #2',
        content: 'Example content: testing testing one two three!',
        user_id: 2
    },
];

const postSeed = () => Post.bulkCreate(posts);

module.exports = postSeed;