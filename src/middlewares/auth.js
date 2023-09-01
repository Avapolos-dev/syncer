'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

exports.format = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
       return res.status(401).send({
            status: 'Error',
            statusCode: 401,
            message: 'No token provided'
       })
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({
            status: 'Error',
            statusCode: 401,
            message: 'Token error'
        });
    }
    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({
            status: 'Error',
            statusCode: 401,
            message: 'Token malformatted'
        });
    }
    req.token = token
    next()
}

exports.valid = (req, res, next) => {
    const token = req.token
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                status: 'Error',
                statusCode: 401,
                message: 'Token invalid'
            });
        } 
        return next()
    })
}