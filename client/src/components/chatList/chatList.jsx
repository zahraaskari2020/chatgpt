import { Link } from 'react-router-dom'
import './chatList.css'

const chatList = () => {
  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore React AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <div className="list">
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
        <Link to="/">my chat title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src='/logo.png' alt='' />
        <div className="texts">
            <span>Upgrade to React AI Pro</span>
            <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default chatList
