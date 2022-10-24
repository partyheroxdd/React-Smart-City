import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import authService from "../services/auth.service";

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const {id} = useParams();
  const registration = (e) => {
    e.preventDefault();

    const registerInfo = {login: login, password: password, role: 'USER', id};
    {
      authService.register(registerInfo)
      .then(response => {
        console.log("Register successfully", response.data);
        history.push("/");
      })
      .catch(error => {
        console.log('Something went wroing', error);
      })
    }
  }

  return (
      <div className="container">
        <h3 className="offset-sm-4">-Registration Page-</h3>
        <form className="col-lg-8 offset-lg-4">
          <div className="form-group ">
            <input
                type="text"
                className="form-control col-4"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login"
            />

          </div>
          <div className="form-group">
            <input
                type="password"
                className="form-control col-4"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

          </div>
          <div className="col-lg-8 offset-lg-1">
            <button onClick={(e) => registration(e)}
                    className="btn btn-success col-lg-2.8 offset-lg-0">Register
            </button>
          </div>
        </form>
      </div>
  )
}

export default Register;