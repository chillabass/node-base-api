const router = require('express').Router();
const userController = require('../controllers/UserController');
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');
const isUser = require('../middleware/isUser');
const isValidData = require('../middleware/isValidData');

// Регистрация
router.post('/signup', isValidData, userController.signUp);
// Аутентификация
router.post('/signin', userController.signIn);
// Получить 1 пользователя
router.get('/:id', isAuth, userController.getUser);
// Получить всех пользователей
router.get('/', isAuth, isAdmin, userController.getAll);
// Обновить пользователя
router.put('/:id', isAuth, isUser, isValidData, userController.updateUser);
// Удалить пользователя
router.delete('/:id', isAuth, isAdmin, userController.deleteUser);

module.exports = router;