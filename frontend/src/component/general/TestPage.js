import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingPage from "./LoadingPage";

function TestPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    pages: [],
    totalItem: 0,
  });
  useEffect(() => {
    axios.get("/api/test?").then((res) => {
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
  }, []);
  let cards = "";
  if (loading) {
    return <LoadingPage />;
  } else {
    cards = products.map((product) => {
      return <ProductCard data={product} />;
    });
  }
  return <> {cards}</>;
}
export default TestPage;
