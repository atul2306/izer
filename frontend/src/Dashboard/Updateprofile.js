import React,{useContext} from "react";
import style from "../Dashboard/updateprofile.module.css";
import { useHttpClient } from "../customHooks/httpHook";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from "../customHooks/reducer/UserContext";
const Updateprofile = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { userDetails ,token,login,logout } = useContext(UserContext);
   //console.log(userDetails)
   const id=userDetails.userId;
  const updatedet = (e) => {
      e.preventDefault();
    const formdata = new FormData(e.target);
    formdata.append("userId",id);
    sendRequest(
        process.env.REACT_APP_APIURL+"/update",
      "POST",
      JSON.stringify(Object.fromEntries(formdata)),
      {
        "Content-Type": "application/json",
      }
    )
    .then((res) => {
        console.log(res)
       if (res.success) {
           login(res.userDetails, token);
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
    })

  };

  return (
    <>
      <div className={style.container}>
      <button className={style.button} onClick={logout}>
              <span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  exact
                  to="/"
                >
                  LOGOUT
                </NavLink>
              </span>
            </button>
        <div className={style.container1}>
          <h2 style={{ color: "black" }}>Update Profile</h2>
          <form onSubmit={updatedet} className={style.container2}>
            <input
              className={style.container3}
              type="text"
              placeholder="Update Name"
              name="name"
            />
            <input
              className={style.container3}
              type="text"
              placeholder="Update Email"
              name="email"
            />
            <input
              className={style.container3}
              type="text"
              placeholder="Update Interest"
              name="interest"
            />
            <input
              className={style.container3}
              type="text"
              placeholder="Update About"
              name="bio"
            />

            <div>
            {isLoading && (
                <CircularProgress style={{ color: "blueviolet" }} />
              )}
              <button className={style.button}>
                <span>Update </span>
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Updateprofile;
