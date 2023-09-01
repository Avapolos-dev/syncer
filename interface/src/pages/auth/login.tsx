
import './Login.css'

import { useAuth  } from '../../context/authContext'
import { Navigate } from 'react-router-dom' 

import axios  from 'axios'

export const Login = () => {
  const context = useAuth()
  const isLogged = context?.isLogged()
  
  const loginSubmit = async () => {
    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    axios.post('http://localhost:3000/login', {
      login: email.value,
      password: password.value
    })
    .then((response) => {
      context?.signIn({ access: response.data.token })
    })
    .catch(() => {
      alert('Erro ao logar')
    })
  }

  return (
    <div id="container-login" className='container-login'>
        <div className="login-box">
            <h1>Login</h1>
            <div id="box" className='box'>
              <label>Email:</label>
              <input type="email" name="email" id="email" placeholder="Digite seu email" />
              <label>Senha:</label>
              <input type="password" name="password" id="password" placeholder="Digite sua senha" />
             
              <button onClick={loginSubmit} type="submit">Entrar</button>
         
              <p>Syncer</p>
            </div>
        </div>
        {isLogged && <Navigate to='/' /> }
    </div>
  )
}
