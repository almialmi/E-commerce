const User = require('../models/user.model');
const Comment = require('../models/comment.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const { roles } = require('./role');
const moment = require('moment-timezone');
const validator = require("email-validator");



module.exports.AdminRegister = async (req, res, next) => {
    const valid = validator.validate(req.body.email);
    if(valid){
        var admin = new User({
            userName: req.body.userName,
            fullName:req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            role: "Admin"
        });
    
        admin.save((err) => {
            if (!err) {
                let token = jwt.sign({
                    admin_id: admin._id,
                    role: admin.role,
                    email: admin.email,
                    userName:admin.userName
                },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXP });
    
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 3000000),
                    secure: false,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                res.status(201).send({
                    role: admin.role,
                    message: "Admin is registered successfully!"
                });
            }
            else {
                if (err)
                    res.status(422).send(err.message);
                else
                    return next(err);
            }
    
        });

    }else{
        return res.status(400).send({
            message: "Please provide a valid email address.",
        })
    }
    

}

module.exports.customerRegister = async (req, res, next) => {
    const valid = validator.validate(req.body.email);
    if(valid){
        var customer = new User({
            userName: req.body.userName,
            fullName:req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            role: "Customer"
    
        });
        customer.save((err) => {
            if (!err) {
                let token = jwt.sign({
                    customer_id: customer._id,
                    role: customer.role,
                    email: customer.email,
                    userName:customer.userName
                },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXP });
    
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 3000),
                    secure: false,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                res.status(201).send({
                    role: customer.role,
                    message: "Customer is registered successfully!"
                });
    
            }
            else {
                if (err)
                    res.status(422).send(err.message);
                else
                    return next(err);
            }
    
        });
    }else{
        return res.status(400).send({
            message: "Please provide a valid email address.",
        })
    }
    

}


module.exports.userLogin = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const admin = await User.findOne({ userName });
        if (!admin) {
            return res.status(404).json({
                message: 'User is not found',
                success: false
            })
        }
        if (admin.isActive === false) {
            return res.status(403).json({
                message: 'Your Account is deactivated',
                success: false
            })

        }
        if (admin.isLocked) {
            return admin.incrementLoginAttempts(function (err) {
                if (err) {
                    return send({
                        message: err
                    });
                }
                return res.status(403).json({
                    message: 'You have exceeded the maximum number of login attempts.Your account is locked until ' + moment(admin.lockUntil).tz("East Africa Time ").format('LT z') + '.  You may attempt to log in again after that time.'
                });
            });
        }

        let isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
            var updates = {
                $set: { loginAttempts: 0 },
                $unset: { lockUntil: 1 }
            }
            admin.updateOne(updates, function (err) {
                if (err) console.log(err);
            });
            let token = jwt.sign({
                admin_id: admin._id,
                role: admin.role,
                email: admin.email
            },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXP });

            res.cookie('token', token, {
                expires: new Date(Date.now() + 3000),
                secure: false,
                httpOnly: true,
                sameSite: 'strict'
            });
            return res.status(200).json({
                role: admin.role,
                message: "Login Successfully!!"
            });
        } else {
            admin.incrementLoginAttempts(function (err) {
                if (err) {
                    return res.status(403).send(err);
                }
                return res.status(403).json({
                    message: 'Incorrect password',
                    success: false
                });
            });

        }
    } catch (error) {
        next(error);
    }
}



module.exports.fetchOwnProfile = async (req, res) => {
    try {
        var id;
        var token = req.body.token || req.query.token || req.cookies['token'] || req.headers['token'];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            id = decoded.admin_id;
        });
        User.findById(id, function (err, user) {
            if (err) {
                res.status(401).send(err)
            }
            else {
                res.status(200).send({
                    "_id": user._id,
                    "userName": user.userName,
                    "email": user.email
                })
            }
        })
    } catch (error) {
        next(error)
    }

}



module.exports.userLogout = (req, res, next) => {
    res.cookie('token', 'none', {
        httpOnly: true,
    });

    res.status(200).send({
        success: true,
        message: "logout"
    });

}


module.exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        var role;
        var token = req.body.token || req.query.token || req.cookies['token'] || req.headers['token'];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            role = decoded.role;
        });
        try {
            const permission = roles.can(role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports.addComment =(req,res)=>{
        var comment = new Comment({
            comment:req.body.comment,
        });
    
        comment.save((err) => {
            if (!err) {
                res.status(201).send({
                    message: "Your comment add successfully!"
                });
            }
            else {
                if (err)
                    res.status(422).send(err.message);
                else
                    return next(err);
            }
    
        });
}

module.exports.fetchAllComment = async(req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfComments;
        
        numOfComments = await Comment.countDocuments({});
        result = await Comment.find({__v:0}) 
                              .populate('customer',{userName:1,email:1})
                              .skip(offset) 
                              .limit(limit)
                              .sort({$natural:-1}); 
          
        const response = {
          "totalItems": numOfComments,
          "totalPages": Math.ceil(result.length / limit),
          "pageNumber": page,
          "pageSize": result.length,
          "Categorys": result
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }
     
}


