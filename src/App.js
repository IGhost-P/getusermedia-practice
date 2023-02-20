import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const video = useRef(null);
  const canvas = useRef(null);
  const photo = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const onStartClick = () => {
    if (!width && !height) {
      return onClearVideo();
    }
    const context = canvas.current.getContext("2d");
    context.drawImage(video.current, 0, 0, width, height);
    const data = canvas.current.toDataURL("image/png");
    photo.current.setAttribute("src", data);
  };

  const onClearVideo = () => {
    const context = canvas.current.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    const data = canvas.current.toDataURL("image/png");
    photo.current.setAttribute("src", data);
  };

  const onVideoCanPlay = () => {
    if (!streaming) {
      setHeight(video.current.videoHeight / (video.current.videoWidth / width));

      if (isNaN(height)) {
        setHeight(width / (4 / 3));
      }
      Å;
      video.current.setAttribute("width", 400);
      video.current.setAttribute("height", 300);
      canvas.current.setAttribute("width", 400);
      canvas.current.setAttribute("height", 300);
      setStreaming(true);
    }
  };

  useEffect(() => {
    const constraints = {
      video: true,
    };

    const success = (stream) => {
      video.current.srcObject = stream;
      video.current.play();
    };

    const error = (err) => {
      console.log("The following error occurred: " + err.name);
    };

    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
  }, []);

  return (
    <>
      <div className="camera">
        <video
          id="video"
          width="400"
          height="300"
          autoPlay
          onCanPlay={onVideoCanPlay}
          ref={video}
        ></video>
        <button id="startButton" onClick={onStartClick}>
          Take photo
        </button>
      </div>
      <canvas id="canvas" width="400" height="300" ref={canvas}></canvas>
      <div className="output">
        <img
          id="photo"
          alt="The screen capture will appear in this box."
          ref={photo}
        />
      </div>
    </>
  );
}

export default App;
