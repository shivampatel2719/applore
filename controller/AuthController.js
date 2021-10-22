const User = require('../models/user')
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

async function loginUser (req,res,next) {
    try {
        let user = await User.findOne({ email : req.body.email });
        argon2.verify(user.password, req.body.password).then((data) => {
            if(data) {
                const token = jwt.sign({ user }, 'MY_SECRET_KEY');
                res.json({
                    'statusCode' : 200,
                    'user': user,
                    'token' : token
                });
            }
            else {
                res.json({
                    'statusCode' : 400,
                    'error' : '* Invalid User or Password'
                });
            }        
        }).catch((err) => {
            res.json({
                'statusCode' : 400,
                'error' : '* Invalid User or Password'
            });
        })        
    }
    catch (err) {
        res.json({
            'statusCode' : 400,
            'error' : '* Invalid User or Password'
        });
    }
}

async function registerUser (req,res) {
    try {
        let user1 = await User.findOne({ email : req.body.email });
        if(user1) {
            res.json({
                'statusCode' : 400,
                'error' : 'Emai already taken'
            });
        }
        if(!req.body.username || !req.body.email) {
            res.json({
                'statusCode' : 400,
                'error' : 'Invalid Object'
            });
        }
        let hashedPassword = await argon2.hash(req.body.password);
        let user = new User({
            name: req.body.username,
            email : req.body.email,
            password : hashedPassword,
            isAdmin : req.body.isAdmin ? true : false
        })
        user.save();
        const token = jwt.sign({ user }, 'MY_SECRET_KEY');
        res.json({
            'statusCode' : 200,
            'user' : user,
            'token' : token
        });
    }
    catch (err) {
        res.json({
            'statusCode' : 400,
            'error' : '* Invalid User or Password'
        });
    }
};

async function verifyAuthentication(req,res,next) {
    try {
        if(req.body.token) {
            jwt.verify(req.body.token , 'MY_SECRET_KEY', function (err, data) {
                if(data) {
                    next();
                }
                if(err) {
                    res.sendStatus(403);
                }
            })
        }
        else {
            res.sendStatus(403);
        }
    }
    catch (err) {
        res.sendStatus(403);
    }
};

async function verifyNotAuthentication(req,res,next) {
    try {
        if(req.body.token) {
            res.sendStatus(403);            
        }
        else {
            next();
        }
    }
    catch (err) {
        res.sendStatus(403);
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyAuthentication,
    verifyNotAuthentication
}