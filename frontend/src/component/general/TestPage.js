import "../../assets/store/css/form-input.css";
import { faTimesCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
function TestPage() {
  function inputVideo(e) {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    const viewVideo = e.target.parentElement.querySelector("#view-video");
    let videoWrapper = document.querySelector("#input-video-wrapper");
    const videoTitle = videoWrapper.querySelector(".input-video-title");
    const inputError = document.querySelector(".input-error");
    videoTitle.innerText = file.name;
    //max file size 10MB
    if (file.size <= 10485760) {
      console.log(file);
      viewVideo.src = fileUrl;
      videoWrapper.style.display = "block";
      inputError.style.display = "none";
    } else {
      inputError.innerText = "Ukuran video melebihi batas maksimal(10MB)";
      inputError.style.display = "block";
    }
  }
  function removeVideo(e) {
    const viewVideo = document.querySelector("#view-video");
    const inputError = document.querySelector(".input-error");
    let videoWrapper = document.querySelector("#input-video-wrapper");
    videoWrapper.style.display = "none";
    inputError.style.display = "none";
    viewVideo.src = "";
  }
  return (
    <div className="m-3">
      <label htmlFor="video" className="me-5 mb-3">
        <Button color="primary" size="sm" style={{ pointerEvents: "none" }}>
          <FontAwesomeIcon icon={faVideo} className="me-3" />
          Pilih Video
        </Button>
        <span className="input-error">Hello</span>
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
    </div>
  );
}
export default TestPage;
