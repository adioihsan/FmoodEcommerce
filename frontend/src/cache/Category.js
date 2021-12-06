import { Button } from "react-bootstrap";
const CategoryObj = {
  makanan: [
    "Kue",
    "Kue Kering",
    "Kue Basah",
    "Roti",
    "Makanan Ringan",
    "Makanan Instant",
    "Makanan Beku",
    "Lauk",
    "Lainnya",
  ],
  minuman: ["Susu", "Coklat", "Kopi", "Teh", "Herbal", "Lainnya"],
};
export function SubMakanan() {
  return (
    <>
      <div id="subMakanan" style={{ display: "none" }}>
        {CategoryObj.makanan.map((cat) => (
          <Button
            key={cat.replace(/\s/g, "")}
            variant="outline-secondary"
            size="sm"
            className="btnSubMakanan"
            style={{ margin: "0.5rem" }}
            onClick={(e) => e.target.classList.toggle("clicked")}
          >
            {cat}
          </Button>
        ))}
      </div>
    </>
  );
}
export function SubMinuman() {
  return (
    <>
      <div id="subMinuman" style={{ display: "none" }}>
        {CategoryObj.minuman.map((cat) => (
          <Button
            key={cat.replace(/\s/g, "")}
            variant="outline-secondary"
            size="sm"
            className="btnSubMinuman"
            style={{ margin: "0.5rem" }}
            onClick={(e) => e.target.classList.toggle("clicked")}
          >
            {cat}
          </Button>
        ))}
      </div>
    </>
  );
}
