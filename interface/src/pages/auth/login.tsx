
import './Login.css'

import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div id="container-login" className='container-login'>
        <div className="login-box">
            <h1>Login</h1>
            <div id="box" className='box'>
              <label>Email:</label>
              <input type="email" name="email" id="email" placeholder="Digite seu email" />
              <label>Senha:</label>
              <input type="password" name="password" id="password" placeholder="Digite sua senha" />
              <Link to="/">
                  <button type="submit">Entrar</button>
              </Link>

              <p>Syncer</p>
            </div>
        </div>
    </div>
  )
}
