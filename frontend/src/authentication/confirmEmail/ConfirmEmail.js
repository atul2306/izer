import React, { useEffect } from "react";
import { useHttpClient } from "../../customHooks/httpHook";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { useParams ,useHistory} from "react-router-dom";
const ConfirmEmail = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { id } = useParams();
  const history = useHistory()
  useEffect(() => {
    sendRequest(process.env.REACT_APP_APIURL+"/confirm/" + id)
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
          history.push("/")
        } else {
          toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong, Please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, [id]);
  return (
   <>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    {isLoading && <CircularProgress style={{ color: "blueviolet" }} />}
    </div>
   </>
  );
};

export default ConfirmEmail;
