import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import serverUrls from "../../serverUrls";
import Swal from "sweetalert2";
function NewOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    getOrders(1);
  }, []);

  function getOrders(page) {
    axios
      .get("/api/get-store-orders/" + "paid" + "?page=" + page)
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
  function processOrder(orderId) {
    axios
      .get("/api/process-order/" + orderId)
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire(
            "Berhasil",
            "status pesanan di ubah ke 'onprocess'",
            "success"
          );
        } else {
          Swal.fire("Terjadi Kesalahan", "coba beberapa saat lagi", "error");
        }
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "cek koneksi internet mu", "error");
      });
  }
  let viewOrders = "";
  if (!loading) {
    console.log(orders);
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
                  processOrder(order.detail.order_id);
                }}
              >
                Proses
              </Button>
              <Button color="danger" className="mx-2">
                Tolak
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
      <h1 className="h3 mb-2 text-gray-800">Pesanan Baru</h1>
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
export default NewOrders;
