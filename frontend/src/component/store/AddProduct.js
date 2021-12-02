import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";

function AddProduct() {
  return (
    <>
      <Container>
        <Row>
          <Col sm="12" md="8" className="mx-auto align-self-center">
            <Card>
              <CardHeader>Tambah Produk</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup className="mb-3" controlId="formNama">
                    <Input
                      type="text"
                      placeholder="Nama Produk"
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="mb-3" controlId="formPrice">
                    <Input
                      type="text"
                      placeholder="Harga"
                      // onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="mb-3" controlId="formStock">
                    <Input
                      type="text"
                      placeholder="Jumlah Stok"
                      // onChange={(e) => setStock(e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="bordered">
                    <Label>Tambahkan Foto </Label>
                    <br />
                    <label id="show-img-0" className="input-image">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        // onChange={(e) => {
                        //   inputImages(e, 0);
                        // }}
                      />
                    </label>
                    <label id="show-img-1" className="input-image">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        // onChange={(e) => {
                        //   inputImages(e, 1);
                        // }}
                      />
                    </label>
                    <label id="show-img-2" className="input-image">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        // onChange={(e) => {
                        //   inputImages(e, 2);
                        // }}
                      />
                    </label>
                  </FormGroup>
                  <FormGroup id="catMain" className="bordered">
                    <Label>Pilih Kategori</Label>
                    <br />
                    <Button variant="outline-secondary" className="btnMakanan">
                      Makanan
                    </Button>
                    <span style={{ marginRight: "1rem" }} />
                    <Button variant="outline-secondary" className="btnMinuman">
                      Minuman
                    </Button>
                  </FormGroup>
                  <FormGroup id="catSub" className="bordered">
                    <Label>Pilih Sub Kategori</Label>
                    <br />
                    {/* <Makanan />
                    <Minuman /> */}
                  </FormGroup>
                  <FormGroup controlId="formDescription" className="mb-3">
                    <Input
                      as="textarea"
                      placeholder="Deskripsi Produk"
                      rows={5}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormGroup>
                  {/* <FormGroup controlId="formDescription" className="mb-3">
                    <CKEditor initData={<p>Hello From another word</p>} />
                  </FormGroup> */}
                  <FormGroup className="bordered">
                    <FormGroup controlId="formExpired" className="mb-3">
                      <Label>Kadaluarsa</Label>
                      <Input
                        type="date"
                        // onChange={(e) => setExpired(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup controlId="formEndurance" className="mb-3">
                      <Label>Ketahanan Produk</Label>
                      <Input
                        type="number"
                        placeholder="contoh : 3 hari"
                        // onChange={(e) => setEndurance(e.target.value)}
                      />
                    </FormGroup>
                  </FormGroup>
                  <Button
                    variant="primary"
                    className="mr-auto w-100 mt-3"
                    // onClick={addProduct}
                  >
                    Tambah Produk
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AddProduct;
