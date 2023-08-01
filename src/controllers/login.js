const service = require('../services/login');

const login = async (req, res) => {

    const { login, password } = req.body

    const response = await service.login(login, password);
    
    if (response.type === 'Success'){
      const { user, token } = response.data
      return  res.status(response.status).json({ user, token })
  
    } else{
      res.status(response.status).send(response)
    }
}

module.exports = {login};