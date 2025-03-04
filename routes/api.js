const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Route for receiving quote requests
router.post('/quote', (req, res) => {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Please fill in all required fields'
        });
    }

    const query = `INSERT INTO quotes (name, email, company, message) VALUES (?, ?, ?, ?)`;
    
    db.run(query, [name, email, company, message], function(err) {
        if (err) {
            console.error('Error saving quote request:', err);
            return res.status(500).json({
                success: false,
                error: 'An error occurred while saving the quote request'
            });
        }

        res.json({
            success: true,
            message: 'Quote request successfully sent',
            quoteId: this.lastID
        });
    });
});

// Route for sending messages through the contact form
router.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            error: 'Please fill in all fields'
        });
    }

    const query = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    
    db.run(query, [name, email, subject, message], function(err) {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).json({
                success: false,
                error: 'An error occurred while sending the message'
            });
        }

        res.json({
            success: true,
            message: 'Message successfully sent',
            contactId: this.lastID
        });
    });
});

module.exports = router; 