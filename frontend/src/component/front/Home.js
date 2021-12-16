import MainNavbar from "../../layout/front/MainNavbar";
import { Col, Container, Row } from "reactstrap";
import SlidePromo from "./home/SlidePromo";
import ChoosenCategory from "./home/ChoosenCategory";
function Home() {
  return (
    <>
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-3">
          <Col sm="12">
            <SlidePromo />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm="12">
            <ChoosenCategory />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
