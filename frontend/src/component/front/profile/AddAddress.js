import { useEffect, useState } from "react";
import { Form, Col, Row, Button, FormGroup, Input, Label } from "reactstrap";
import provinces from "../../../cache/provinces";
import cities from "../../../cache/cities";
import Swal from "sweetalert2";
function AddAddress() {
  const [newAddress, setNewAddress] = useState({
    receiver: "",
    phoneNumber: "",
    lable: "",
    provinceId: 0,
    provinceName: "",
    cityId: 0,
    cityName: "",

    address: "",
  });
  const [load, setLoad] = useState(false);
  const [citiesInProvince, setCityInProvince] = useState("");
  const viewProvinces = provinces.map((province) => {
    return (
      <option
        value={province.province_id}
        onClick={() => setCities(province.province_id, province.province)}
        key={province.province_id}
      >
        {province.province}
      </option>
    );
  });
  function setCities(provinceId, provinceName) {
    newAddress.provinceId = provinceId;
    newAddress.provinceName = provinceName;
    newAddress.cityId = 0;
    let viewCities = cities
      .filter((city) => {
        return city.province_id === provinceId;
      })
      .map((city) => {
        if (newAddress.cityId === 0)
          setNewAddress({
            ...newAddress,
            cityId: city.city_id,
            cityName: city.city_name,
          });
        return (
          <option
            value={city.city_id}
            onClick={(e) => {
              setNewAddress({
                ...newAddress,
                cityName: city.city_name,
                cityId: city.city_id,
              });
            }}
            key={city.city_id}
          >
            {city.city_name}
          </option>
        );
      });
    setCityInProvince(viewCities);
  }
  function inputHandler(e) {
    e.persist();
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  }
  function saveAddress(e) {
    e.preventDefault();
    console.log(newAddress);
    Swal.fire("Coba tutup", "iya tutup", "success");
  }
  return (
    <div className="text-start p-3">
      <Form>
        <FormGroup>
          <Label for="receciver">Nama Penerima</Label>
          <Input
            id="receiver"
            name="receiver"
            type="text"
            value={newAddress.receiver}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Nomor HP</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            value={newAddress.phoneNumber}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lable">Label Alamat</Label>
          <Input
            id="lable"
            name="lable"
            type="text"
            placeholder="rumah/kantor/apartment/kos"
            value={newAddress.lable}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="province">Provinsi</Label>
          <Input
            id="provinceId"
            name="provinceId"
            type="select"
            placeholder="pilih provinsi"
          >
            {viewProvinces}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="city">Kota</Label>
          <Input
            id="cityId"
            name="cityId"
            type="select"
            placeholder="pilih kota"
          >
            {citiesInProvince};
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="address">Alamat Lengkap</Label>
          <Input
            id="address"
            name="address"
            type="textarea"
            placeholder="Masukan Alamat seperti jalan,nama,nomer gedung dan lain-lain"
            value={newAddress.address}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup check>
          <Input
            id="active"
            name="active"
            type="checkbox"
            onChange={inputHandler}
            onClick={(e) => {
              e.target.value = e.target.checked ? 1 : 0;
            }}
          />
          <Label check>Jadikan alamat aktiv</Label>
        </FormGroup>
        <div className="d-flex justify-content-center w-100 mt-2">
          <Button color="primary" onClick={(e) => saveAddress(e)}>
            Simpan
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default AddAddress;
