/// alert in react 

npm i sweetalert

import swal from "sweetalert";

 swal({
            title: "Success",
            text: "Password is updated!",
            icon: "success",
          });

///////////////////////////////////////////////////////////////
// alert error in react 

import sweetError from "../../../services/sweetError"; 



import swal from "sweetalert";

const sweetError = (e) => {
  console.error(e);
  if (e.response?.data.error)
    swal({
      title: "Something went wrong",
      text: e.response?.data.error,
    });
  else
    swal({
      title: "Something went wrong",
      text: e.message,
    });
};

export default sweetError;


catch (e) {
          sweetError(e);
        }





















