import { Card, CardBody, CardImg, Badge } from "reactstrap";
import serverUrls from "../../serverUrls";
function ProductCard(props) {
  const data = props.data;
  return (
    <Card
      style={{ minHeight: "360px", width: "200px", fontSize: "0.9rem" }}
      className="shadow-sm my-2 mx-2"
    >
      <CardImg src={serverUrls.storage + "/" + data.img_main} />
      <CardBody className="py-2 px-2 ">
        <div className="d-flex flex-column justify-content-around fw-lighter h-100">
          <span id="pruduct-name">
            {data.name.slice(0, 50)}
            {data.name.length > 50 ? "..." : ""}
          </span>
          <span className="fw-bold my-1">Rp. {data.price}</span>
          <div className="my-1">
            {" "}
            <Badge color="danger">{data.discount_percent}%</Badge>
            <small
              id="dicount-price"
              className="fw-light text-decoration-line-through mx-1"
            >
              Rp. {data.discount_price}{" "}
            </small>
          </div>
          <div style={{ fontSize: "0.8rem" }} className="my-1">
            <img
              src="/images/pin.png"
              width="16px"
              height="16px"
              className="float-start mx-1"
              alt="origin: "
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
              alt="rating: "
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
