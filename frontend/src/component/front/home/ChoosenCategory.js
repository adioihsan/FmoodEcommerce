import { Card, CardBody, CardImg } from "reactstrap";

function ChoosenCategory() {
  return (
    <div className="bg-light shadow p-3">
      <h5>Kategori Pilihan</h5>
      <br />
      <Card style={{ width: "10rem" }}>
        <CardImg src="/images/cat-cake.png" top />
        <CardBody className="text-center pt-0 pb-1">Kue</CardBody>
      </Card>
    </div>
  );
}
export default ChoosenCategory;
