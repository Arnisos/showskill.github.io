const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Импорт маршрутов
const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

// Настройка middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Настройка шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Использование маршрутов
app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// Обработка 404 ошибки
app.use((req, res) => {
    res.status(404).render('404', { title: 'Страница не найдена' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Ошибка сервера',
        message: 'Что-то пошло не так! Пожалуйста, попробуйте позже.'
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
}); 