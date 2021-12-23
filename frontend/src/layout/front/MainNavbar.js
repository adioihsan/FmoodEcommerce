import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  DropdownItem,
  UncontrolledDropdown,
  Dropdown,
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
import {
  faSearch,
  faShoppingCart,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
function MainNavbar() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const userToggle = () => {
    setIsUserOpen((prevState) => !prevState);
  };
  const storeToggle = () => {
    setIsStoreOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  function handleInput(e) {
    setSearchKeyword(e.target.value);
  }
  const LoginComp = () => {
    let isLogin = localStorage.getItem("auth_token");
    if (isLogin) {
      return (
        <>
          {/* Store button dropdown */}
          <Dropdown
            isOpen={isStoreOpen}
            onMouseEnter={() => {
              storeToggle();
            }}
            onMouseLeave={() => {
              storeToggle();
            }}
            toggle={() => {}}
            className="mx-3"
          >
            <DropdownToggle data-toggle="dropdown" tag="span">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="/store-default.png"
                  className="user-image-2"
                  alt="store"
                />
                <span className="user-name">Toko</span>
              </div>
            </DropdownToggle>
            <DropdownMenu className="user-dropdown-menu bg-light shadow">
              <div className="bg-light shadow-sm p-3 w-100">
                <img
                  src="/store-default.png"
                  className="user-image-3 rounded float-start"
                  alt="user"
                />{" "}
                <small>Nama Toko</small>
                <br />
                <a href="/store">
                  <Button size="sm" className="nav-button mt-1">
                    <FontAwesomeIcon icon={faTachometerAlt} /> Buka Dashboard
                  </Button>
                </a>
              </div>
              <DropdownItem></DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* User button dropdown */}
          <Dropdown
            isOpen={isUserOpen}
            onMouseEnter={() => {
              userToggle();
            }}
            onMouseLeave={() => {
              userToggle();
            }}
            toggle={() => {}}
          >
            <DropdownToggle data-toggle="dropdown" tag="span">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="/user-default.png"
                  className="user-image-2"
                  alt="user"
                />
                <span className="user-name">
                  {localStorage.getItem("auth_username").slice(0, 10)}
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu className="user-dropdown-menu bg-light shadow p-2">
              <div className="bg-light shadow-sm p-3 w-100">
                <img
                  src="/user-default.png"
                  className="user-image-3 rounded float-start"
                  alt="user"
                />{" "}
                <small>
                  {" "}
                  {localStorage.getItem("auth_username").slice(0, 20)}
                </small>
                <br />
                <Button size="sm">Profile {">>"}</Button>
              </div>
              <div>
                <Button
                  size="sm"
                  className="nav-button"
                  onClick={(e) => {
                    askLogout(e);
                  }}
                >
                  Logout
                </Button>
              </div>
              <DropdownItem></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <>
          <Button outline className="nav-button outline mx-2" href="/login">
            Masuk
          </Button>

          <Button className="nav-button mx-2" href="/register">
            Daftar
          </Button>
        </>
      );
    }
  };

  const askLogout = (e) => {
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
          localStorage.removeItem("auth_id");
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
    <Container className="bg-light border mb-3 sticky-top" fluid>
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
            <Input
              bsSize="sm"
              placeholder="Cari yang enak di sini"
              onChange={(e) => handleInput(e)}
            />
            <InputGroupText>
              <Link
                to={{
                  pathname: "/find",
                  search: searchKeyword,
                }}
              >
                <FontAwesomeIcon icon={faSearch} />{" "}
              </Link>
            </InputGroupText>
          </InputGroup>
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{ color: "gray", cursor: "pointer" }}
            className="mx-3"
          />
          <span className="vertical-divider">&nbsp; </span>
          {LoginComp()}
        </Collapse>
      </Navbar>
    </Container>
  );
}
export default MainNavbar;
