import MainNavbar from "../../layout/front/MainNavbar";
import { Container, Row, Col } from "reactstrap";
import Filter from "./find/Filter";
import { useEffect, useState } from "react";
import LoadingPage from "../front/LoadingPage";
import axios from "axios";
import ProductCard from "../front/product/ProductCard";
import { useLocation } from "react-router-dom";
import Footer from "../../layout/front/Footer";
function Find() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    pages: [],
    totalItem: 0,
  });
  let productsView = () => {
    "";
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchKeyword = url.search.substring(1);
    searchProductByName(searchKeyword);
  }, [location]);

  function searchProductByName(key) {
    setLoading(true);
    axios.get("/api/find-product-by-name?keyword=" + key).then((res) => {
      setProducts(res.data.products);
      let paginationObj = res.data.pagination;
      let arrPages = [];
      for (let i = 1; i <= paginationObj.last_page; i++) {
        arrPages.push(i);
      }
      setPagination({
        currentPage: paginationObj.current_page,
        pages: arrPages,
        lastPage: paginationObj.last_page,
        totalItem: paginationObj.total,
      });
      setLoading(false);
    });
  }

  if (loading) {
    productsView = () => {
      return <LoadingPage />;
    };
  } else if (products.length === 0) {
    productsView = () => {
      return (
        <div className="d-flex flex-wrap justify-content-center align-content-center mt-5">
          <h4>Makan tidak di temukan</h4>
        </div>
      );
    };
  } else {
    productsView = () => {
      return (
        <div className="d-flex flex-wrap">
          {products.map((product) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      );
    };
  }
  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-3">
          <Col sm="3">
            <h6>Filter</h6>
            <Filter />
          </Col>
          <Col sm="9">{productsView()}</Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
export default Find;
