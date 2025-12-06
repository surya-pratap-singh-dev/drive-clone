const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

/* GET /users/test */


router.get('/register', (req, res) => {
    res.render('register');
});
 
router.post('/register', 
    body('email,').trim().isEmail().isLength({min: 10}).withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').notEmpty().withMessage('Username is required'),
    async (req, res) => {
    
    
    const errors = validationResult(req);
   
    if (errors.isEmpty()) {
       return res.status(400).json({
         errors: errors.array(),
        message : 'Validation failed'
        });
    }
    const { username, email, password } = req.body;
    
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,  
        password: hashPassword
});
 res.json({
    message: 'User registered successfully',
    user: newUser
 });
});

router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login', 
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 6 }),
    async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Validation failed'
        });
    }
    const { username, password } = req.body;

    const user = await userModel.findOne({ 
        
        username: username 
    });     

    if (!user) {
        return res.status(400).json({
            message: 'Invalid username or password'
        });
    }

 const isMatch = await bcrypt.compare(password, user.password)
    
 
    if (!isMatch){
        return res.status(400).json({
            message: 'Invalid username or password'
        })
    }   

    const token = jwt.sign(
        { 
            userId: user._id, 
            username: user.username,
            email: user.email
        },
          
          process.env.JWT_SECRET,

    )

res.cookie('token', token)


res.send('logged in successfully')



});



module.exports = router;
