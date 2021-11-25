import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Container,
} from "reactstrap";
import "../../assets/front/css/main-navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
function MainNavbar() {
  const navigate = useNavigate();
  const LoginComp = () => {
    let isLogin = localStorage.getItem("auth_token");
    if (isLogin) {
      return (
        <>
          <Button size="sm" className="nav-button" onClick={Logout}>
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            size="sm"
            outline
            className="nav-button outline"
            href="/login"
          >
            Masuk
          </Button>

          <Button size="sm" className="nav-button" href="/register">
            Daftar
          </Button>
        </>
      );
    }
  };

  const Logout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Kamu yakin akan keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });

    function logout() {
      axios.post("/api/logout").then((response) => {
        if (response.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_username");
          Swal.fire({
            icon: "info",
            title: "Kamu telah keluar",
            text: "Mengalihkan mu ke halaman utama",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      });
    }
  };

  return (
    <div>
      <Container className="bg-light border" fluid>
        <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">
            <img src="/logo-reg-fmood.png" alt="Fmood" className="logo" />
            <span className="brand-text">Fmood</span>
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Kategori
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <InputGroup className="input-search">
              <Input bsSize="sm" placeholder="Cari yang enak di sini" />
              <InputGroupText>
                <FontAwesomeIcon icon={faSearch} />{" "}
              </InputGroupText>
            </InputGroup>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ color: "gray", cursor: "pointer" }}
            />
            <span className="vertical-divider">&nbsp; </span>
            {LoginComp()}
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
export default MainNavbar;
