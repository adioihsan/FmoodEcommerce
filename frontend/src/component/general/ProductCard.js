import { Card, CardBody, CardImg, Badge } from "reactstrap";
import serverUrls from "../../serverUrls";
function ProductCard(props) {
  const data = props.data;
  return (
    <Card
      style={{ height: "400px", width: "225px", fontSize: "0.9rem" }}
      className="shadow-sm"
    >
      <CardImg src={serverUrls.storage + "/" + data.img_main} />
      <CardBody className="py-2 px-2 ">
        <div className="d-flex flex-column justify-content-around fw-lighter h-100">
          <span id="pruduct-name">{data.name}</span>
          <span className="fw-bold">Rp. {data.price}</span>
          <div>
            {" "}
            <Badge color="danger">{data.discount_percent}%</Badge>
            <small
              id="dicount-price"
              className="fw-light text-decoration-line-through mx-1"
            >
              Rp. {data.discount_price}{" "}
            </small>
          </div>

          <div style={{ fontSize: "0.8rem" }}>
            <img
              src="/images/pin.png"
              width="16px"
              height="16px"
              className="float-start mx-1"
            />{" "}
            <span id="origin">{data.origin}</span>
          </div>
          <div
            className="d-flex justify-content-start align-items-center"
            style={{ fontSize: "0.8rem" }}
          >
            <img
              src="/images/star.png"
              width="16px"
              height="16px"
              className="float-start mx-1"
            />{" "}
            <span id="rating"> {data.rating}</span>
            <span className="mx-1">|</span>
            <span>
              {" "}
              Terjual<span id="sold"> {data.sold}</span>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
export default ProductCard;
