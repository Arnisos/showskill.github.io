const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('index');
});

// Portfolio page
router.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

// FAQ page
router.get('/faq', (req, res) => {
    res.render('faq');
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router; 