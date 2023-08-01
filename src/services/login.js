

const config = require('../config');
const { sign } = require('jsonwebtoken');


function getUser(login){
    if (login != config.user) return null
    return {
        email: config.user,
        password: config.password,
    }
}

function compare(password, hash){
    return password === hash
}

const login = async function(login,password) {
  try{
    
    if(!login || !password) return {
        type: 'Error',
        status: 400,
        message: 'Login and password are required.'
    }

    const user = getUser(login)

    if(!user){
        return {
            type: 'Error',
            status: 401,
            message: 'Credentials are invalid.'
        }
    }

    const passwordMatches = compare(password, user.password)
    if(!passwordMatches){
      return {
        type: 'Error',
        status: 401,
        message: 'Credentials are invalid.'
      }
    }
    
    const { email } = user

    const token = sign(
      { email }, 
      config.secret, 
      { expiresIn: '1d' }
      );
    return {
        type: 'Success',
        status: 202,
        message: 'Login successfully',
        data: {token}
    }
  } 

  catch(err){
    return {
        type: 'Error',
        status: 500,
        message: 'Error accessing database.',
        data: err.stack
    }
  }
}

module.exports = { login }