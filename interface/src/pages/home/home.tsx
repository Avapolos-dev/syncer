

import { Instances } from './components/Instances';
import { Panel } from './components/panel'
import './home.css';

export const Home = () => {

  return (
    <div id="container-home" className="container">
      <div className="container-backgroud">
        <Panel />
        <Instances />
      </div>
    </div>
  )
}


