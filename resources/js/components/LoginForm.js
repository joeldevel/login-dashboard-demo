import React, {useState} from 'react';

const LoginForm = ({login}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =(e)=> {
      e.preventDefault();
      login(e);
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Usuario</label>
        <input type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password"
               className="form-control"
               id="password"
               name="password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
  </form>
  )
}

export default LoginForm;
