import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const baseurl = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  async function login(e) {
      console.log(baseurl);
      const username = e.target[0].value;
      const password = e.target[1].value;
      const response = await fetch(`${baseurl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          Accept: "application/json",
          body: JSON.stringify({username, password})
      });
      const status = await response.status;
      const json = await response.json();
      if(status==201 ) {
          // console.log(json.user.id);
          setUserId(json.user.id);
          setToken(json.token);
          setIsLoggedIn(true);
      }
      if(status ==401) {
          alert('credenciales invalidas');
      }
  }

  async function logout(e) {

      const response = await fetch(`${baseurl}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          Accept: "application/json"
      });
      const json = await response.json();
      setIsLoggedIn(false);
      setUserId(null);
  }
  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} logout={logout}/>
      <div className="container">
        <div className="row">
          <div className="col col-md ">
            {isLoggedIn? <Dashboard token={token} id={userId}/>:
            <LoginForm login={login} token={token}/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
