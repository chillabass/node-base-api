const router = require('express').Router();
const userController = require('./UserController').UserController;

// Регистрация
router.post('/signup', userController.signUp);
// Аутентификация
router.post('/auth', userController.auth);
// Получить 1 пользователя
router.get('/:id');
// Получить всех пользователей
router.get('/all', userController.getAll);
// Обновить пользователя
router.put('/:id');
// Удалить пользователя
router.delete('/:id');

module.exports.router = router;