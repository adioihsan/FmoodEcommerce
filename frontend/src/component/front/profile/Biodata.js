import { faLock, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardImg, Col, Row } from "reactstrap";

function Biodata() {
  return (
    <div className="position-relative  lh-base">
      <p className="fs-5 fw-bold">Biodata</p>
      <Card>
        <CardBody>
          <Row>
            <Col sm="4">
              <Card className="mb-3">
                <CardImg
                  src={
                    "https://i.pravatar.cc/300?u=" +
                    localStorage.getItem("auth_id")
                  }
                />
                <CardBody>
                  <Button className="w-100" color="light">
                    Pilih Foto
                  </Button>
                  <small className="text-secondary">
                    Besar file: maksimum 2.500.000 bytes (2.5 Megabytes).
                    Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                  </small>
                </CardBody>
              </Card>
              <Button className="w-100" color="dark">
                <FontAwesomeIcon icon={faLock} /> Ubah Password
              </Button>
            </Col>
            <Col sm="8">
              <p className="fs-6 ps-2 mb-0 fw-bold text-secondary">
                Ubah Biodata
              </p>
              <table className="text-secondary">
                <tr>
                  <td className="p-2">Nama</td>
                  <td className="p-2">Abrsar</td>
                  <td className="p-1">
                    <small className="text-orange">Ubah</small>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Tanggal Lahir</td>
                  <td className="p-2">02-12-1999</td>
                  <td className="p-1">
                    <small className="text-orange">Ubah</small>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Jenis Kelamin</td>
                  <td className="p-2">Laki-Laki</td>
                  <td className="p-1">
                    <small className="text-orange">Ubah</small>
                  </td>
                </tr>
              </table>
              <p className="fs-6 ps-2 mt-3 mb-0 fw-bold text-secondary">
                Ubah Kontak
              </p>
              <table className="text-secondary">
                <tr>
                  <td className="p-2">Email</td>
                  <td className="p-2">absar@gmail.com</td>
                  <td className="p-1">
                    <small className="text-orange">Ubah</small>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Nomer Telpon</td>
                  <td className="p-2">02-12-1999</td>
                  <td className="p-1">
                    <small className="text-orange">Ubah</small>
                  </td>
                </tr>
              </table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
export default Biodata;
