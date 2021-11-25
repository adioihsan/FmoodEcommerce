import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import LogoCenterNavbar from "../../../layout/front/LogoCenterNavbar";
import "../../../assets/front/css/register.css";
import "../../../assets/front/css/custom-button.css";
import { useState } from "react";
function Login() {
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: {},
  });
  const inputHandler = (e) => {
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
  };
  return (
    <div>
      <LogoCenterNavbar />
      <div className="centerize">
        <Container fluid="md">
          <Row md="2" sm="1" xs="1">
            <Col className="mr-3">
              <div className="register-picture mb-4">
                <img
                  src="/logo-circle-fmood.png"
                  width="256px"
                  alt="Food For Your Mood"
                ></img>
              </div>
            </Col>
            <Col>
              <h4 className="text-center mt-4 mb-3">Masuk</h4>
              <h6 className="text-center mb-4">
                Belum punya akun Fmood? <a href="/register">Daftar sekarang</a>
              </h6>
              <Form inline onSubmit={loginSubmit}>
                <FormGroup floating>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginInput.email}
                    onChange={inputHandler}
                  />
                  <Label for="exampleEmail">Email</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginInput.password}
                    onChange={inputHandler}
                  />
                  <Label for="password">Password</Label>
                </FormGroup>{" "}
                <Button block className="orange-button mt-4">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Login;
