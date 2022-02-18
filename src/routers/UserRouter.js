const router = require('express').Router();
const userController = require('../controllers/UserController').UserController;

// Регистрация
router.post('/signup', userController.signUp);
// Аутентификация
router.post('/auth', userController.auth);
// Получить 1 пользователя
router.get('/:id', userController.getUser);
// Получить всех пользователей
router.get('/', userController.getAll);
// Обновить пользователя
router.put('/:id', userController.updateUser);
// Удалить пользователя
router.delete('/:id', userController.deleteUser);

module.exports.router = router;