import React, {useState, useEffect} from 'react';
//import baseurl from '../url';
const baseurl = process.env.REACT_APP_API_BASE_URL;

const UpdateUserDataForm = ({token, id}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");

  async function updateUserData() {
      const response = await fetch(`${baseurl}/user/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
          Accept: "application/json",
          body: JSON.stringify({firstname, lastname, email, dni})
      });
      const status = await response.status;
      const json = await response.json();

      if(status==200 ) {
        alert('Cambios guardados');
      }
  }

  const handleSubmit =(e)=> {
      e.preventDefault();
      updateUserData();
  }
  // populate fields
  useEffect( ()=>{
   console.log('id = ', id);
    async function fetchUserData() {
      const response = await fetch(`${baseurl}/user/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
          Accept: "application/json"
      });
      const status = await response.status;
      const json = await response.json();

      if(status == 200 ) {
        console.log('ok', json);
        setFirstname(json.firstname);
        setLastname(json.lastname);
        setEmail(json.email);
        setDni(json.dni);

      }
    }

    fetchUserData();
  },[]);

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">Nombre</label>
        <input type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e)=>setFirstname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">Apellido</label>
        <input type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e)=>setLastname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dni" className="form-label">DNI</label>
        <input type="text"
              className="form-control"
              id="dni"
              name="dni"
              value={dni}
              onChange={(e)=>setDni(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success">Guardar cambios</button>
  </form>
  )
}

export default UpdateUserDataForm;
