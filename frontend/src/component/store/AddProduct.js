import {
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  CardBody,
  Button,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  CardFooter,
} from "reactstrap";
import classnames from "classnames";
import { useState } from "react";
import "../../assets/general/css/custom-button.css";
import "../../assets/store/css/form-input.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputProductImage from "./sub/InputProductImage";
import InputProductVideo from "./sub/InputProductVideo";

function AddProduct() {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  //files
  return (
    <>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">Jual Produk</h1>
        <Row>
          <Col sm="12" className="mx-auto align-self-center">
            <Form>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Produk
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Media
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "3",
                    })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Kategori
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "4",
                    })}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Lainnya
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                  <Card className="mb-4">
                    {/* Data Utama Produk */}
                    <CardBody>
                      <FormGroup className="mb-3">
                        <Input
                          type="text"
                          placeholder="Nama Produk"
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Input
                          type="number"
                          placeholder="Harga"
                          // onChange={(e) => setPrice(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup>
                          <Input type="number" placeholder="Berat" />
                          <InputGroupText>gram</InputGroupText>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Input
                          type="number"
                          placeholder="Stok Tersedia"
                          // onChange={(e) => setStock(e.target.value)}
                        ></Input>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <CKEditor
                          editor={ClassicEditor}
                          name="description"
                          data="Tulis deskripsi"
                          config={{
                            removePlugins: [
                              "CKFinder",
                              "EasyImage",
                              "Image",
                              "ImageCaption",
                              "ImageStyle",
                              "ImageToolbar",
                              "ImageUpload",
                              "MediaEmbed",
                              "Link",
                              "CKFinderUploadAdapter",
                            ],
                          }}
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                "height",
                                "200px",
                                editor.editing.view.document.getRoot()
                              );
                            });
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                          }}
                          onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                          }}
                        />
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="d-flex flex-row-reverse">
                      <Button
                        variant="primary"
                        className="orange-button outline"
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Selanjutnya {" >>"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabPane>
                <TabPane tabId="2">
                  <Card className="mb-4">
                    <CardBody>
                      {/* Media */}
                      <FormGroup className="bordered">
                        <InputProductImage />
                      </FormGroup>
                      <FormGroup className="bordered">
                        <p>Tambahkan Video</p>
                        <InputProductVideo />
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="orange-button outline"
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        {"<< "}Kembali
                      </Button>
                      <Button
                        variant="primary"
                        className="orange-button outline"
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Selanjutnya {" >>"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabPane>
                <TabPane tabId="3">
                  <Card className="mb-4">
                    <CardBody>
                      {/* Category */}
                      <FormGroup id="catMain" className="bordered">
                        <Label>Pilih Kategori</Label>
                        <br />
                        <Button
                          variant="outline-secondary"
                          className="btnMakanan"
                        >
                          Makanan
                        </Button>
                        <span style={{ marginRight: "1rem" }} />
                        <Button
                          variant="outline-secondary"
                          className="btnMinuman"
                        >
                          Minuman
                        </Button>
                      </FormGroup>
                      <FormGroup id="catSub" className="bordered">
                        <Label>Pilih Sub Kategori</Label>
                        <br />
                        {/* <Makanan />
                    <Minuman /> */}
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="orange-button outline"
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        {"<< "}Kembali
                      </Button>
                      <Button
                        variant="primary"
                        className="orange-button outline"
                        onClick={() => {
                          toggle("4");
                        }}
                      >
                        Selanjutnya {" >>"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabPane>
                <TabPane tabId="4">
                  <Card className="mb-4">
                    {/* Lainnya */}
                    <CardBody>
                      <FormGroup className="bordered">
                        <FormGroup className="mb-3">
                          <Label>Kadaluarsa</Label>
                          <Input
                            type="date"
                            // onChange={(e) => setExpired(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <Label>Ketahanan Produk</Label>
                          <Input
                            type="number"
                            placeholder="contoh : 3 hari"
                            // onChange={(e) => setEndurance(e.target.value)}
                          />
                        </FormGroup>
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="orange-button outline"
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        {"<< "}Kembali
                      </Button>
                      <Button variant="primary" className="orange-button">
                        Simpan
                      </Button>
                    </CardFooter>
                  </Card>
                </TabPane>
              </TabContent>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default AddProduct;
