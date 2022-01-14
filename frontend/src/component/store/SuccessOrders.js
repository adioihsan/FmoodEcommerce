import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Table } from "reactstrap";
import serverUrls from "../../serverUrls";
import Swal from "sweetalert2";
function SuccessOrders() {
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
      .get("/api/get-store-orders/" + "delivered" + "?page=" + page)
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
  let viewOrders = "";
  if (!loading) {
    viewOrders = Object.values(orders).map((order) => {
      console.log(order);
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
          <td>
            {order.user.name} <br /> ({order.user.email})
          </td>
          <td>{order.detail.created_at}</td>
          <td>{order.detail.updated_at}</td>
          <td>Rp. {order.detail.total_cost.toLocaleString("id-ID")}</td>
          <td>Rp. {order.detail.shipment_cost.toLocaleString("id-ID")}</td>
          <td>Rp. {order.detail.product_cost.toLocaleString("id-ID")}</td>
        </tr>
      );
    });
  }
  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Pesanan Selesai</h1>
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
                <th>Info Pelanggan </th>
                <th>Tanggal Pemesanan</th>
                <th>Tanggal Selesai</th>
                <th>Total Pembayaran</th>
                <th>Biaya Pengiriman</th>
                <th>Total Pendapatan</th>
              </tr>
            </thead>
            <tbody className="text-black">{viewOrders}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
export default SuccessOrders;
