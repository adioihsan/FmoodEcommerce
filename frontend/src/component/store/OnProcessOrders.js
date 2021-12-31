import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Table, Button, FormGroup, Input, Label } from "reactstrap";
import serverUrls from "../../serverUrls";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function OnProcessOrders() {
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [shipmentCode, setShipmentCode] = useState({
    code: "",
  });

  useEffect(() => {
    getOrders(1);
  }, [load]);

  function getOrders(page) {
    axios
      .get("/api/get-store-orders/" + "onprocess" + "?page=" + page)
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data.data);
        } else {
          Swal.fire("Terjadi Kesalahan", "coba beberapa saat lagi", "error");
        }
        setLoading(false);
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "cek koneksi internet mu", "error");
      });
  }
  const viewSendOrder = (
    <FormGroup>
      <Label for="shipmentCode">Resi Pengiriman</Label>
      <Input
        id="code"
        name="code"
        type="text"
        onChange={(e) => {
          shipmentCode.code = e.target.value;
          console.log(shipmentCode.code);
        }}
      />
    </FormGroup>
  );
  const sendSwal = withReactContent(Swal);
  function sendOrder(orderId) {
    sendSwal.fire(viewSendOrder).then((e) => {
      if (e.isConfirmed) {
        axios
          .get("/api/send-order/" + orderId + "/" + shipmentCode.code)
          .then((response) => {
            if (response.data.status === 200) {
              Swal.fire(
                "Berhasil",
                "status pesanan di ubah ke 'dalam proses pengiriman'",
                "success"
              );
              setLoad(!load);
            } else {
              Swal.fire(
                "Terjadi Kesalahan",
                "coba beberapa saat lagi",
                "error"
              );
            }
          })
          .catch((e) => {
            Swal.fire("Terjadi Kesalahan", "cek koneksi internet mu", "error");
          });
      }
    });
  }
  let viewOrders = "";
  if (!loading) {
    viewOrders = Object.values(orders).map((order) => {
      return (
        <tr>
          <td>{order.detail.order_id}</td>
          <td>
            {order.products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="mt-1 border-bottom border-1 pb-3"
                >
                  <div className="product d-flex mt-3">
                    <img
                      src={serverUrls.storage + "/" + product.img_main}
                      className="rounded float-start me-2"
                      height="64px"
                      alt="product"
                    />
                    <div>
                      <p className="my-1">{product.name}</p>
                      <p className="fw-bold">Kuantitas : {product.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </td>
          <td>{order.detail.created_at}</td>
          <td>{order.detail.shipment_service}</td>
          <td
            dangerouslySetInnerHTML={{ __html: order.detail.user_address }}
          ></td>
          <td>
            {order.user.name} <br /> ({order.user.email})
          </td>
          <td>
            <div className="d-flex">
              <Button
                color="primary"
                className="mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  sendOrder(order.detail.order_id);
                }}
              >
                Kirim
              </Button>
              <Button color="danger" className="mx-2">
                Batalkan
              </Button>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Pesanan Sedang diproses</h1>
      <Row>
        <Col className="sm-12">
          <Table
            bordered
            responsive
            style={{ fontSize: "0.8rem" }}
            className="overflow-visible"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Info Produk</th>
                <th>Tanggal Pemesanan</th>
                <th>Jasa Pengiriman</th>
                <th>Alamat Pengiriman</th>
                <th>Pelanggan</th>
                <th>Tindakan </th>
              </tr>
            </thead>
            <tbody className="text-black">{viewOrders}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
export default OnProcessOrders;
