import React, {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import authService from "../services/auth.service";

const Auth = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const {id} = useParams();
  const authorization = (e) => {
    e.preventDefault();

    const authInfo = {login: login, password: password, id};
    {
      authService.getJWT(authInfo)
      .then(response => {
        console.log("Auth successfully", response.data);
        localStorage.setItem("token", response.data);
        history.push("/getAllTouristicPlace");
      })
      .catch(error => {
        console.log('Incorrect login or password!', error);
      })
    }
  }

  return (
      <div className="container">
        <h3 className="offset-sm-4">-Authorization Page-</h3>
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
          <div className="col-lg-9.5 offset-lg-1">
            <button onClick={(e) => authorization(e)}
                    className="btn btn-success col-lg-2 offset-lg-0">Log In
            </button>
          </div>
          <div className="col-lg-10 offset-lg-1">
            <Link className="col-lg-2 offset-lg-0"
                  to="/register">Register</Link>
          </div>
        </form>

      </div>
  )
}

export default Auth;