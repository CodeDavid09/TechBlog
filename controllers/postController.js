const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/index');
const auth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbposts => res.json(dbposts.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbposts => {
            if (!dbposts) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbposts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', auth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(dbposts => res.json(dbposts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', auth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbposts => {
            if (!dbposts) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbposts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbposts => {
        if (!dbposts) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbposts);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;