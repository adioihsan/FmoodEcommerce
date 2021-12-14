import { faTimesCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";
function FormMedia(props) {
  const [mediaData, setMediaData] = useState({
    imgMain: null,
    imgFront: null,
    imgTop: null,
    imgSide: null,
    imgOther: null,
    video: null,
  });
  //Image input functions
  function inputImages(e, i) {
    let label = document.querySelector("#show-img-" + i);
    let imgTitle = label.querySelector(".input-image-title");
    //get images form files input
    const file = e.target.files[0];
    let imageUrl = URL.createObjectURL(file);
    //create image object
    const image = new Image();
    image.src = imageUrl;
    image.onload = function () {
      //check image size, max file size 2621440 bytes equal to 2.5MB
      if (file.size <= 2621440) {
        //check image resolution, min resolution 350px*350px
        if (image.width >= 350 && image.height >= 350) {
          setMediaData({ ...mediaData, [e.target.name]: file });
          label.style.backgroundImage = `url(${image.src})`;
          //load file name
          if (file.name.length > 20) {
            imgTitle.innerText =
              file.name.slice(0, 15) +
              "..." +
              file.name.slice(file.name.length - 5);
          } else {
            imgTitle.innerText = file.name;
          }
        } else {
          alert("Resoulusi foro kurang dari batas minimal(512px * 512px)");
        }
      } else {
        alert("Ukuran foto melebihi 2.5MB");
      }
    };
  }
  const ShowImageHeader = function (e) {
    const header = e.target.querySelector(".input-image-header");
    if (header != null && e.target.style.backgroundImage !== "") {
      header.style.display = "flex";
    }
  };
  const CloseImageHeader = function (e) {
    const header = e.target.querySelector(".input-image-header");
    if (header != null) {
      header.style.display = "none";
    }
  };
  const removeImage = function (e, i) {
    e.preventDefault();
    const label = document.querySelector("#show-img-" + i);
    const inputName = label.querySelector("input").name;
    const header = label.querySelector(".input-image-header");
    header.style.display = "none";
    label.style.backgroundImage = "";
    console.log(inputName);
    setMediaData({ ...mediaData, [inputName]: null });
  };
  // End of image input function

  // Video input functions

  function inputVideo(e) {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    const viewVideo = e.target.parentElement.querySelector("#view-video");
    let videoWrapper = document.querySelector("#input-video-wrapper");
    const videoTitle = videoWrapper.querySelector(".input-video-title");
    const inputError = document.querySelector(".input-error");
    //max file size 10MB
    if (file.size <= 10485760) {
      viewVideo.src = fileUrl;
      videoWrapper.style.display = "block";
      inputError.style.display = "none";
      setMediaData({ ...mediaData, video: file });
      if (file.name.length > 60) {
        videoTitle.innerText =
          file.name.slice(0, 55) +
          "..." +
          file.name.slice(file.name.length - 5);
      } else {
        videoTitle.innerText = file.name;
      }
    } else {
      inputError.innerText = "Ukuran video melebihi batas maksimal(10MB)";
      inputError.style.display = "block";
      videoWrapper.style.display = "none";
    }
  }
  function removeVideo(e) {
    e.preventDefault();
    const viewVideo = document.querySelector("#view-video");
    const inputError = document.querySelector(".input-error");
    let videoWrapper = document.querySelector("#input-video-wrapper");
    videoWrapper.style.display = "none";
    inputError.style.display = "none";
    viewVideo.src = "";
    setMediaData({ ...mediaData, video: null });
  }
  return (
    <>
      <FormGroup className="bordered">
        <Label>Tambahkan Foto</Label>
        <br />
        <small id="img-main-invalid" className="text-danger d-none">
          Foto utama belum di tambahkan
        </small>
        <div id="input-image-group">
          <label
            id="show-img-0"
            className="input-image"
            onMouseEnter={(e) => ShowImageHeader(e)}
            onMouseLeave={(e) => CloseImageHeader(e)}
          >
            <input
              type="file"
              name="imgMain"
              accept=".jpg,jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                inputImages(e, 0);
              }}
            />
            <div className="input-image-header">
              <span className="input-image-title">Image name</span>
              <button
                onClick={(e) => {
                  removeImage(e, 0);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </label>
          <label
            id="show-img-1"
            className="input-image"
            onMouseEnter={(e) => ShowImageHeader(e)}
            onMouseLeave={(e) => CloseImageHeader(e)}
          >
            <input
              type="file"
              name="imgSide"
              accept=".jpg,jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                inputImages(e, 1);
              }}
            />
            <div className="input-image-header">
              <span className="input-image-title">Image name</span>
              <button
                onClick={(e) => {
                  removeImage(e, 1);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </label>
          <label
            id="show-img-2"
            className="input-image"
            onMouseEnter={(e) => ShowImageHeader(e)}
            onMouseLeave={(e) => CloseImageHeader(e)}
          >
            <input
              type="file"
              name="imgFront"
              accept=".jpg,jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                inputImages(e, 2);
              }}
            />
            <div className="input-image-header">
              <span className="input-image-title">Image name</span>
              <button
                onClick={(e) => {
                  removeImage(e, 2);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </label>
          <label
            id="show-img-3"
            className="input-image"
            onMouseEnter={(e) => ShowImageHeader(e)}
            onMouseLeave={(e) => CloseImageHeader(e)}
          >
            <input
              type="file"
              name="imgTop"
              accept=".jpg,jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                inputImages(e, 3);
              }}
            />
            <div className="input-image-header">
              <span className="input-image-title">Image name</span>
              <button
                onClick={(e) => {
                  removeImage(e, 3);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </label>
          <label
            id="show-img-4"
            className="input-image"
            onMouseEnter={(e) => ShowImageHeader(e)}
            onMouseLeave={(e) => CloseImageHeader(e)}
          >
            <input
              type="file"
              name="imgOther"
              accept=".jpg,jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                inputImages(e, 4);
              }}
            />
            <div className="input-image-header">
              <span className="input-image-title">Image name</span>
              <button
                onClick={(e) => {
                  removeImage(e, 4);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </label>
        </div>
      </FormGroup>

      {/* Input Video Form */}
      <FormGroup className="bordered">
        <Label>Tambahkan Video</Label>
        <br />
        <label htmlFor="video" className="me-5 m-3">
          <Button color="primary" size="sm" style={{ pointerEvents: "none" }}>
            <FontAwesomeIcon icon={faVideo} className="me-3" />
            Pilih Video
          </Button>
          <span className="input-error"></span>
        </label>
        <input
          id="video"
          className="video"
          style={{ visibility: "hidden" }}
          type="file"
          accept=".mp4"
          placeholder="pilih video"
          onChange={(e) => {
            inputVideo(e);
          }}
        />
        <div id="input-video-wrapper">
          <div className="input-video-header">
            <span className="input-video-title">Judul video</span>
            <button>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={(e) => {
                  removeVideo(e);
                }}
                onMouseOver={(e) => {
                  console.log("close xx");
                }}
              />
            </button>
          </div>
          <video id="view-video" width="360" controls></video>
        </div>
      </FormGroup>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            props.toggle("1");
          }}
        >
          {"<< "}Kembali
        </Button>
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            if (mediaData.imgMain !== null) {
              document
                .querySelector("#img-main-invalid")
                .classList.add("d-none");
              props.toggle("3");
              props.dataCourier(mediaData);
            } else {
              document
                .querySelector("#img-main-invalid")
                .classList.remove("d-none");
            }
          }}
        >
          Selanjutnya {" >>"}
        </Button>
      </div>
    </>
  );
}
export default FormMedia;
