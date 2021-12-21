import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Badge,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Input,
  Button,
  InputGroup,
  FormGroup,
  Label,
} from "reactstrap";
import MainNavbar from "../../layout/front/MainNavbar";
import classnames from "classnames";
import { Carousel } from "react-responsive-carousel";
import LoadingPage from "../front/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import serverUrls from "../../serverUrls";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  faCartPlus,
  faComments,
  faDotCircle,
  faMinus,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router";
function ProductDetail() {
  const [activeTabDetail, setActiveTabDetail] = useState("1");
  const [loading, setLoading] = useState([]);
  const [product, setProduct] = useState([]);
  const [cartForm, setCartForm] = useState({
    userId: 0,
    productId: 0,
    totalPrice: 0,
    quantity: 1,
    note: "",
  });
  const [note, setNote] = useState("");
  const [store, setStore] = useState([]);
  const params = useParams();
  function detailToggle(tabId) {
    if (activeTabDetail !== tabId) setActiveTabDetail(tabId);
  }
  useEffect(() => {
    axios.get("/api/get-product-detail/" + params.id).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setStore(res.data.store);
        const getUserId = localStorage.getItem("auth_id");
        setCartForm({
          userId: getUserId,
          productId: res.data.product.id,
          quantity: 1,
          totalPrice: res.data.product.prices.sell_price,
        });
        setLoading(false);
      }
    });
  }, [params]);
  if (loading) {
    return <LoadingPage />;
  }
  function loadProductImages() {
    const arrImages = [product.img_main];
    if (product.img_top) arrImages.push(product.img_top);
    if (product.img_side) arrImages.push(product.img_side);
    if (product.img_front) arrImages.push(product.img_front);
    if (product.img_other) arrImages.push(product.img_other);
    return (
      <Carousel showIndicators={false}>
        {arrImages.map((image) => {
          if (image !== null) {
            return (
              <div>
                <img
                  src={serverUrls.storage + "/" + image}
                  alt="p1"
                  className="rounded"
                ></img>
              </div>
            );
          } else {
            return (
              <div>
                <img
                  src={"/images/no-images.png"}
                  alt="p1"
                  className="rounded"
                ></img>
              </div>
            );
          }
        })}
      </Carousel>
    );
  }
  function addQuantity() {
    if (cartForm.quantity <= product.stock) {
      setCartForm({
        ...cartForm,
        totalPrice: product.prices.sell_price * (cartForm.quantity + 1),
        quantity: cartForm.quantity + 1,
      });
      // countTotalPrice();
    }
  }
  function removeQuantity() {
    if (cartForm.quantity > 1) {
      setCartForm({
        ...cartForm,
        totalPrice: product.prices.sell_price * (cartForm.quantity - 1),
        quantity: cartForm.quantity - 1,
      });
    }
  }
  function handelInput(e) {
    if (e.target.name === "quantity") {
      let newVal = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1");
      if (newVal == "") newVal = 1;
      if (newVal <= product.stock) {
        setCartForm({
          ...cartForm,
          totalPrice: product.prices.sell_price * newVal,
          quantity: newVal,
        });
      }
    } else if (e.target.name === "note") {
      setNote(e.target.value);
    } else {
    }
  }
  function addNote(e) {
    const noteForm = document.querySelector("#note-form");
    noteForm.classList.toggle("d-none");
    if (!noteForm.classList.contains("d-none")) {
      e.target.innerText = "- Hapus Catatan";
      setNote("");
    } else {
      e.target.innerText = "+ Tambah Catatan";
    }
  }
  const cartSwal = withReactContent(Swal);
  function cartPopUp() {
    return (
      <div class="d-flex justify-content-around align-items-center p-2 flex-wrap">
        <div>
          <img
            src={serverUrls.storage + "/" + product.img_main}
            height="64px"
            className="rounded float-start mx-2"
            alt="product"
          />
        </div>
        <div>
          <p className="fw-5">{product.name + " x" + cartForm.quantity}</p>
        </div>
        <Button className="orange-button">Lihat keranjang</Button>
      </div>
    );
  }
  function addToCart() {
    axios
      .post("/api/add-cart", cartForm)
      .then((response) => {
        if (response.data.status === 200) {
          cartSwal.fire({
            title: "<span class='fs-5'>Berhasil di tambahkan</span>",
            html: cartPopUp(),
            width: "50vw",
            showConfirmButton: false,
            showCloseButton: true,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan",
            text: "Pastikan koneksi internet mu stabil",
            showConfirmButton: true,
            showCancelButton: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Kamu belum masuk",
            showConfirmButton: false,
            showCancelButton: true,
            footer:
              '<a href="/login" class="text-orange">Masuk sekarang untuk menambahkan keranjang</a>',
          });
        }
        return error;
      }
    );
  }
  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="">
        <Row>
          <Col sm="4" className="position-relative px-4">
            <div className=" position-sticky top-0 overflow-hidden">
              {loadProductImages()}
            </div>
          </Col>
          <Col sm="5" className="px-4">
            <div id="product-name" className="fs-4 fw-bold my-1">
              {product.name}
            </div>
            <div className="d-flex justify-content-start align-items-center text-secondary">
              <span>
                {" "}
                Terjual<span id="sold"> 1500 </span>
              </span>
              <span className="mx-1">|</span>
              <img
                src="/images/star.png"
                width="16px"
                height="16px"
                className="float-start mx-1"
                alt="rating: "
              />{" "}
              <span id="rating"> 4.5</span>
              <span className="mx-1">|</span>
              <span>
                {" "}
                Diskusi<span id="sold"> (7) </span>
              </span>
            </div>
            <div id="price " className="fw-bold mt-1 fs-3">
              Rp. {product.prices.sell_price}
            </div>
            <div
              id="discount"
              className={classnames({
                "d-none":
                  product.prices.discount_price == null ||
                  product.prices.discount_percent === 0,
              })}
            >
              {" "}
              <Badge color="danger">{product.prices.discount_percent}%</Badge>
              <span
                id="dicount-price"
                className="fw-light text-decoration-line-through mx-1"
              >
                Rp. {product.prices.real_price + " "}
              </span>
            </div>
            <div id="tab-detail" className="my-3">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTabDetail === "1",
                      "text-secondary": activeTabDetail !== "1",
                      "text-orange": activeTabDetail === "1",
                    })}
                    onClick={() => detailToggle("1")}
                  >
                    Detail
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTabDetail === "2",
                      "text-secondary": activeTabDetail !== "2",
                      "text-orange": activeTabDetail === "2",
                    })}
                    onClick={() => detailToggle("2")}
                  >
                    Info Penting
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTabDetail}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <div id="detail-short" className="">
                        <span className="text-secondary">Berat : </span>
                        <span>{product.weight} gram</span>
                        <br className="my-1" />
                        <span className="text-secondary">Kategori : </span>
                        <span>{product.main_category}</span>
                        <br className="my-1" />
                        <span className="text-secondary">Sub-Kategori : </span>
                        <span>{product.sub_category}</span>
                        <br className="my-1" />
                        <span className="text-secondary">BPOM/PIRT/SNI : </span>
                        <span>{product.reg_code}</span>
                        <br className="my-1" />
                      </div>
                      <div
                        id="detail-description"
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></div>
                      <div className="d-flex justify-content-between border-top mt-3 p-3">
                        <div className="d-flex">
                          <img
                            src="/store-default.png"
                            className="rounded-circle float-start"
                            height="64px"
                            alt="store"
                          />
                          <p className="fw-bold mb-1 mx-3 ">
                            Store Name{" "}
                            <span className="text-success mt-2">
                              {" "}
                              <FontAwesomeIcon icon={faDotCircle} /> Online
                            </span>
                          </p>
                        </div>
                        <Button className="align-self-center orange-button">
                          <FontAwesomeIcon icon={faComments} /> Chat
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <h4>Tab 2 Content</h4>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Col>
          <Col sm="3" className="position-relative px-4">
            <div className="position-fixed overflow-hidden">
              <Card className="shadow-sm w-75">
                <CardBody className="p-3">
                  <p className="fs-6 fw-bold mb-3">Atur jumlah dan catatan</p>
                  <div className="d-flex align-items-center">
                    {" "}
                    <InputGroup className="w-50">
                      <Button
                        size="sm"
                        outline
                        onClick={() => {
                          removeQuantity();
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} color="#ff3d00 " />
                      </Button>
                      <Input
                        type="text"
                        name="quantity"
                        bsSize="sm"
                        placeholder="1"
                        className="text-center"
                        onChange={(e) => {
                          handelInput(e);
                        }}
                        value={cartForm.quantity}
                      />
                      <Button
                        size="sm"
                        outline
                        onClick={() => {
                          addQuantity();
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} color="#ff3d00 " />
                      </Button>
                    </InputGroup>
                    <span className="ms-3">
                      Stock <span className="fw-bold">{product.stock}</span>
                    </span>
                  </div>
                  <div id="note">
                    <p
                      className="my-3 text-orange"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => addNote(e)}
                    >
                      <FontAwesomeIcon icon={faPen} /> Tambah catatan
                    </p>
                    <FormGroup floating id="note-form" className="d-none">
                      <Input
                        id="note"
                        name="note"
                        placeholder="Tulis Catatan"
                        type="text"
                        value={note}
                        onChange={(e) => {
                          handelInput(e);
                        }}
                      />
                      <Label for="note">Catatan</Label>
                    </FormGroup>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-secondary me-2">Subtotal</p>
                    <p className="fs-5 fw-bold">Rp. {cartForm.totalPrice}</p>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="w-100 mb-2 orange-button"
                      onClick={() => addToCart()}
                    >
                      <FontAwesomeIcon icon={faCartPlus} /> Tambah Keranjang
                    </Button>
                    <Button className="w-100 mb-2 orange-button outline">
                      Beli Langsung
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default ProductDetail;
