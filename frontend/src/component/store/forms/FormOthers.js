import { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
function FormOthers(props) {
  const [othersData, setOthersData] = useState({
    expired: "",
    durability: "",
    preorder: 0,
    discount: 0,
    discountPrice: "",
    hide: 0,
    regCode: "",
  });
  function handleInput(e) {
    setOthersData({ ...othersData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <FormGroup className="mb-3">
        <Label>BPOM/PIRT</Label>
        <Input type="text" name="regCode" onChange={(e) => handleInput(e)} />
      </FormGroup>
      <FormGroup className="mb-3">
        <Label>Kadaluarsa</Label>
        <Input type="date" name="expired" onChange={(e) => handleInput(e)} />
      </FormGroup>
      <FormGroup className="mb-3">
        <InputGroup>
          <Input
            type="number"
            placeholder="Ketahanan Produk"
            name="durability"
            onChange={(e) => handleInput(e)}
          />
          <InputGroupText>Hari</InputGroupText>
        </InputGroup>
      </FormGroup>
      <FormGroup check inline>
        <Input
          type="checkbox"
          name="preorder"
          onChange={(e) => handleInput(e)}
          onClick={(e) => {
            e.target.value = e.target.checked ? 1 : 0;
          }}
        />
        <Label check>Preorder</Label>
      </FormGroup>{" "}
      <FormGroup check inline>
        <Input
          type="checkbox"
          name="hide"
          onChange={(e) => handleInput(e)}
          onClick={(e) => {
            e.target.value = e.target.checked ? 1 : 0;
          }}
        />
        <Label check>Sembunyikan Produk</Label>
      </FormGroup>{" "}
      <FormGroup check inline>
        <Input
          type="checkbox"
          name="discount"
          onChange={(e) => handleInput(e)}
          onClick={(e) => {
            e.target.value = e.target.checked ? 1 : 0;
            if (e.target.checked === true) {
              document.querySelector("#input-discount").style.display = "block";
            } else {
              document.querySelector("#input-discount").style.display = "none";
            }
          }}
        />
        <Label check>Diskon</Label>
      </FormGroup>
      <FormGroup
        className="mb-3 mt-3"
        style={{ display: "none" }}
        id="input-discount"
      >
        <InputGroup>
          <InputGroupText>Rp. </InputGroupText>
          <Input
            type="number"
            placeholder="Harga diskon"
            name="discountPrice"
            onChange={(e) => handleInput(e)}
          />
        </InputGroup>
      </FormGroup>
      <div className="d-flex justify-content-between mt-3">
        {" "}
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            props.toggle("3");
          }}
        >
          {"<< "}Kembali
        </Button>
        <Button
          variant="primary"
          className="orange-button "
          onMouseOver={() => {
            props.dataCourier(othersData);
          }}
          onClick={() => {
            props.addProduct();
          }}
        >
          Simpan
        </Button>
      </div>
    </>
  );
}
export default FormOthers;
