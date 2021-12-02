import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
function StoreRoute(props) {
  let Cmp = props.Cmp;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("api/isLogin").then((res) => {
      if (res.status === 200) {
      } else {
        navigate("/login");
      }
    });
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Kamu belum masuk",
          showConfirmButton: false,
          footer: '<a href="/login">Masuk sekarang untuk akses toko mu</a>',
        });
      }
      return error;
    }
  );
  return (
    <>
      <Cmp />
    </>
  );
}
export default StoreRoute;
