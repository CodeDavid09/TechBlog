const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {
    createUser,
    getAllUsers,
    getUserById,
    login,
    signupHandler,
    logout,
} = require('../../../controllers');

router.route('/')
    .get(getAllUsers)
	.post(createUser)

router.post('/signup', signupHandler);
router.post('/login', login);
router.post('/logout', logout);

router.route('/:userId')
    .get(getUserById);
    
module.exports = router;