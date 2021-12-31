import {
  faExclamation,
  faShoppingBag,
  faStar,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Badge, Button } from "reactstrap";
import { useEffect, useState } from "react";
import serverUrls from "../../../serverUrls";

function CartTransaction(props) {
  console.log(props);
  const [status, setStatus] = useState({
    badge: <Badge>Mengambil status...</Badge>,
    button: <Button>Mengambil status...</Button>,
  });
  useEffect(() => {
    createStatusMessage();
  }, []);
  function createStatusMessage() {
    switch (props.detail.status) {
      case "paid":
        setStatus({
          badge: <Badge color="secondary">Menuggu Respon</Badge>,
          button: (
            <Button color="secondary" size="sm">
              <FontAwesomeIcon icon={faExclamation} /> Batalkan pesanan
            </Button>
          ),
        });
        break;
      case "unpaid":
        setStatus({
          badge: <Badge color="warning">Belum Bayar</Badge>,
          button: (
            <Button color="warning" size="sm">
              Bayar sekarang
            </Button>
          ),
        });
        break;
      case "onprocess":
        setStatus({
          badge: <Badge color="info">proses</Badge>,
          button: (
            <Button color="info" size="sm" outline disabled>
              Pesanan sedang diproses penjual
            </Button>
          ),
        });
        break;
      case "ondelivery":
        setStatus({
          badge: <Badge color="primary">Pengiriman</Badge>,
          button: (
            <Button color="primary" size="sm">
              Lacak Pesanan
            </Button>
          ),
        });
        break;
      case "delivered":
        setStatus({
          badge: <Badge color="success">Sukses</Badge>,
          button: (
            <Button color="success" size="sm">
              <FontAwesomeIcon icon={faStar} /> Berikan penilain
            </Button>
          ),
        });
        break;
      case "reviewed":
        setStatus({
          badge: <Badge color="success">Sukses</Badge>,
          button: (
            <Button color="success" size="sm" outline disabled>
              Pesanan Berhasil
            </Button>
          ),
        });
        break;
      case "cancelled":
        setStatus({
          badge: <Badge color="danger">Batal</Badge>,
          button: (
            <Button color="danger" size="sm" outline disabled>
              Pesanan dibatalkan
            </Button>
          ),
        });
        break;
      default:
        setStatus({
          badge: <Badge>Mengambil status...</Badge>,
          button: <Button>Mengambil status...</Button>,
        });
        break;
    }
  }
  const viewProducts = props.products.map((product, index) => {
    return (
      <div key={product.id} className="mt-1 border-bottom border-1 pb-3">
        <div className="product d-flex mt-3">
          <img
            src={serverUrls.storage + "/" + product.img_main}
            className="rounded float-start me-2"
            height="64px"
            alt="product"
          />
          <div>
            <p className="my-1">{product.name}</p>
            <small className="text-secondary">
              {product.quantity} barang x Rp. {product.price}
            </small>
          </div>
        </div>
      </div>
    );
  });
  return (
    <Card className="mt-3">
      <CardBody>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faShoppingBag} className="text-orange me-2" />
          <small className="me-2">
            {props.detail.created_at.substring(0, 10)}
          </small>
          {status.badge}
        </div>
        <div className="store mt-2 p-1">
          <img
            src="/store-default.png"
            className="rounded-circle float-start me-2"
            height="24px"
            alt="store"
          />
          <small className="fw-bold">{props.store.name}</small>
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-100">{viewProducts}</div>
        </div>
        <div className="d-flex mt-3 flex-row-reverse justify-content-between align-items-center">
          {status.button}
          <div className="d-flex">
            <small className=" text-secondary border-end px-2">
              Total Harga <span> Rp.{props.detail.product_cost} </span>
            </small>
            <small className=" text-secondary border-end px-2">
              Biaya Ongkir <span> Rp.{props.detail.shipment_cost} </span>
            </small>
            <small className=" ms-2">
              Total Bayar{" "}
              <span className="fw-bold"> Rp.{props.detail.total_cost} </span>
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
export default CartTransaction;
