import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddAddress from "./AddAddress";
function UserAddress() {
  const [loading, setLoading] = useState(true);
  const [userAddresses, setUserAddresses] = useState([]);
  useEffect(() => {
    axios
      .get("/api/get-user-address")
      .then((response) => {
        setUserAddresses(response.data);
        setLoading(false);
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "Gagal mengambil alamat", "error");
      });
  }, []);
  let viewAddresses = "Mengambil Alamat....";
  if (!loading) {
    viewAddresses = userAddresses.map((address) => {
      return (
        <Card className="my-3" key={address.id}>
          <CardBody className="d-flex flex-column">
            <small>{address.lable}</small>
            <p className="fw-bold mb-1">{address.receiver}</p>
            <span>{address.phone_number}</span>
            <p>
              {address.address}
              <br />
              Kota/Kabupaten {address.city}, {address.zip_code}
              <br />
              Provinsi {address.province}
            </p>
            <a href="/profile/address" className="text-orange">
              Ubah Alamat
            </a>
          </CardBody>
        </Card>
      );
    });
  }
  function addAddress() {
    const addSwal = withReactContent(Swal);
    addSwal.fire({
      title: "Tambah Alamat",
      html: <AddAddress />,
      showConfirmButton: false,
    });
  }
  return (
    <div className="position-relative  lh-base">
      <p className="fs-5 fw-bold">Alamat</p>
      <Card>
        <CardBody>
          {viewAddresses}
          <Card
            className="orange-button outline"
            onClick={(e) => {
              addAddress();
            }}
          >
            <CardBody className="d-flex justify-content-center align-items-center">
              <span className="fs-4">
                <FontAwesomeIcon icon={faPlus} /> Tambah Alamat
              </span>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
export default UserAddress;
