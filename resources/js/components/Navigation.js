import React from 'react';

const Navigation = ({isLoggedIn=false, logout}) => {
  function handleLogout() {
    logout();
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">NeoSystems</a>
          <ul className="ms-auto navbar-nav pe-2">
            {isLoggedIn?
              <li className="nav-item">
                  <a className="nav-link active"
                     onClick={handleLogout}>
                    logout
                  </a>
                </li>
            :null}
          </ul>
      </div>
    </nav>
    )
}

export default Navigation;
