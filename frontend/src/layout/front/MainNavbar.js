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
function MainNavbar() {
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
                <FontAwesomeIcon icon={faSearch} />
              </InputGroupText>
            </InputGroup>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="vertical-divider">&nbsp; </span>
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
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
export default MainNavbar;
