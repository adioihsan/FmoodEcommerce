import { Card, CardBody, CardImg, Badge } from "reactstrap";

function ProductCard() {
  return (
    <Card
      style={{ height: "400px", width: "225px", fontSize: "0.9rem" }}
      className="shadow-sm"
    >
      <CardImg src="/images/cat-cake.png" />
      <CardBody className="py-2 px-2 ">
        <div className="d-flex flex-column justify-content-around fw-lighter h-100">
          <span id="pruduct-name">Product name here</span>
          <span className="fw-bold">Rp. 70.000 </span>
          <div>
            {" "}
            <Badge color="danger">32%</Badge>
            <small
              id="dicount-price"
              className="fw-light text-decoration-line-through mx-1"
            >
              Rp. 80.000{" "}
            </small>
          </div>

          <div style={{ fontSize: "0.8rem" }}>
            <img
              src="/images/pin.png"
              width="16px"
              height="16px"
              className="float-start mx-1"
            />{" "}
            <span id="origin">Padang</span>
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
            <span id="rating"> 4.95 </span>
            <span className="mx-1">|</span>
            <span>
              {" "}
              Terjual<span id="sold"> 2.4rb</span>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
export default ProductCard;
