import React,{useContext} from 'react'
import { useHttpClient } from '../../customHooks/httpHook'
import { UserContext } from '../../customHooks/reducer/UserContext'
import { NavLink ,useHistory  } from 'react-router-dom'
import style from "../Login/assets/login.module.css"
import { CircularProgress } from "@material-ui/core";
import {toast} from "react-toastify"
const Login = () => {
    const { sendRequest, isLoading } = useHttpClient();
    const {login} = useContext(UserContext)
    const history = useHistory()
    const LoginData = (e) => {
      e.preventDefault();
      const formdata = new FormData(e.target);
      //console.log(formdata);
      //  sendRequest("http://localhost:9000/api/auth/signin"
      sendRequest(
        process.env.REACT_APP_APIURL+"/signin",
        "POST",
        JSON.stringify(Object.fromEntries(formdata)),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.success) {
             console.log(res)
            toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
            login(res.userDetails, res.token);
            // console.log(res.token)
  
            history.push("/update");
          } else {
            toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong, Please try again", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    };
  return (
    <div className={style.container}>
      <div className={style.container1}>
        <div className={style.container2}>
          <h1>Login</h1>
          
        </div>
        <form onSubmit={LoginData} className={style.container6}>
          <input
            className={style.container3}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className={style.container3}
            type="password"
            name="password"
            placeholder="Password"
          />
          <div style={{ display: "flex" }}>
          {isLoading && <CircularProgress style={{ color: "blueviolet" }} />}
            <button className={style.button}>
              <span>Login </span>
            </button>
          </div>
        </form>
        <div className={style.container4}>
          <h3>
            Not a member yet?
            <NavLink
              style={{ textDecoration: "none", color: "#e91717" }}
              to="/signup"
            >
              {" "}
              Register
            </NavLink>
          </h3>
          <h3>
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/auth/forgot"
            >
              Forgot Password?
            </NavLink>
          </h3>
        </div>
      </div>
      
    </div>
  );
}

export default Login