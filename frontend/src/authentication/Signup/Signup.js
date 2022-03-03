import React from "react";
import { NavLink } from "react-router-dom";
import { useHttpClient } from "../../customHooks/httpHook";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import style from "./Assets/signup.module.css";
const Signup = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const registerdata = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    sendRequest(process.env.REACT_APP_APIURL+"/signup",
      "POST",
      JSON.stringify(Object.fromEntries(formdata)),
      {
        "Content-Type": "application/json",
      }
    )
    .then((res) => {
        console.log(res)
        if (res.success) {
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
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
          <h1>Register To Your Account</h1>
         
        </div>
        <form onSubmit={registerdata} className={style.container6}>
          <input
            className={style.container3}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            className={style.container3}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className={style.container3}
            type="text"
            name="bio"
            placeholder="About You"
          />
          <input
            className={style.container3}
            type="text"
            name="interest"
            placeholder="Interest"
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
              <span>Register </span>
            </button>
          </div>
        </form>
        <div className={style.container4}>
          <h3>
            Already Registered?
            <NavLink style={{ textDecoration: "none", color: "e91717" }} to="/">
              {" "}
              Login
            </NavLink>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Signup;
