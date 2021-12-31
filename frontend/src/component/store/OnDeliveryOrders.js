import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import serverUrls from "../../serverUrls";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function OnDeliveryOrders() {
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    getOrders(1);
  }, [load]);

  function getOrders(page) {
    axios
      .get("/api/get-store-orders/" + "ondelivery" + "?page=" + page)
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
  const traceSwal = withReactContent(Swal);
  const viewTrace = (
    <Table bordered responsive hover>
      <thead>
        <th>Status</th>
        <th>Keterangan</th>
        <th>Waktu</th>
      </thead>
      <tbody>
        <tr>
          <td>delivered</td>
          <td>Paket sudah di terima oleh customer</td>
          <td>31-12-2021 : 14:25</td>
        </tr>
        <tr>
          <td>send to customer</td>
          <td>Paket sedang dalam perjalanan ke alamt tujuan</td>
          <td>28-12-2021 : 10:13</td>
        </tr>
        <tr>
          <td>arrive</td>
          <td>Paket telah sampai di gateway padang</td>
          <td>28-12-2021 : 00:25</td>
        </tr>
        <tr>
          <td>on transit</td>
          <td>Paket dalam proses transit ke padang</td>
          <td>26-12-2021 : 12:35</td>
        </tr>
        <tr>
          <td>arrive on gateway</td>
          <td>Paket telah sampai di gerbang 1 jakarta pusat</td>
          <td>26-12-2021 : 07:25</td>
        </tr>
        <tr>
          <td>send to gateway</td>
          <td>Paket telah dikirim ke gerbang 1 jakarta pusat</td>
          <td>26-12-2021 : 06:21</td>
        </tr>
        <tr>
          <td>sortir</td>
          <td>Paket sampai di tempat sortir pertama (jabar32)</td>
          <td>25-12-2021 : 17:25</td>
        </tr>
        <tr>
          <td>Taken</td>
          <td>Paket sudah di ambil dari penjual </td>
          <td>25-12-2021 : 11:44</td>
        </tr>
      </tbody>
    </Table>
  );
  function traceOrder(orderId) {
    traceSwal.fire({
      title: "Lacak Pesanan",
      html: viewTrace,
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
          <td>{order.detail.updated_at}</td>
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
                  traceOrder();
                }}
              >
                Lacak Pesanan
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
                <th>Tanggal Pengiriman</th>
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
export default OnDeliveryOrders;
