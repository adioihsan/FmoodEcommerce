import { Outlet } from "react-router";
import MainNavbar from "../../layout/front/MainNavbar";
import { Container, Row, Col } from "reactstrap";
import ProfileSidebar from "../../layout/front/profile/ProfileSidebar";
function UserProfile() {
  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-3">
          <Col sm="3">
            <ProfileSidebar />
          </Col>
          <Col sm="9" className="position-relative px-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default UserProfile;
