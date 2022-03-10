const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbcomments => res.json(dbcomments))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(dbcomments => res.json(dbcomments))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', auth, (req, res) => {
    if (req.session) {
        Comment.create({
                text: req.body.text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            .then(dbcomments => res.json(dbcomments))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

router.put('/:id', auth, (req, res) => {
    Comment.update({
        text: req.body.text
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbcomments => {
        if (!dbcomments) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbcomments);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbcomments => {
        if (!dbcomments) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbcomments);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;