const { Comment } = require('../models');

// Hard code Comments
const comments = [{
    text: 'This is a comment.',
    user_id: 1,
    post_id: 1
},
{
    text: 'This is a comment too!',
    user_id: 2,
    post_id: 2
},
{
    text: 'This is a comment, again.',
    user_id: 3,
    post_id: 3
},
];

// The bulkCreate() method allows you to insert multiple records to your database table with a single function call.
const commentSeed = () => Comment.bulkCreate(comments);

module.exports = commentSeed;