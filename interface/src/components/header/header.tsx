
import './Header.css'
import { Button } from 'antd';
import { LogoutOutlined } from "@ant-design/icons";

import { useAuth  } from '../../context/authContext'

export const Header = () => {
  const context = useAuth()
  return (
        <header>
            <img src='/logoAVA2.png' alt='logo' />
            {context?.isLogged() &&
              <Button onClick={context?.signOut}  shape='round' size='small' danger={context?.isLogged()} icon={<LogoutOutlined />}>Sair</Button> 
            }
        </header>
  )
}