const express = require('express');
const router = express.Router();
const fileModel = require('../models/files.model');



router.get('/home', (req, res) => {
    res.render('home');
});



router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router;

