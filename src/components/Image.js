import React, { useRef, useEffect, useState, useReducer } from "react";
import { eventReducer } from "./EventReducer";

export const ImageManager = ({ children, context }) => {
  return <div>{children}</div>;
};

export const ImgGrid = ({ files, setFiles, handleDrop, handleUpdate }) => {
  let dragItem = null;
  let dragOverItem = null;
  const [s3Domain, setS3Domain] = useState("");
  let filesCopy = [...files];
  const [events, dispatch] = useReducer(eventReducer, []);

  let state = {
    drag: false,
  };
  let dragCounter = 0;

  function dragEvent(e) {
    dispatch({
      event: e,
      type: "drag",
      dragState: state,
      dragCounter: dragCounter,
      handleDrop: handleDrop,
    });
  }

  function dragInEvent(e) {
    dispatch({
      event: e,
      type: "dragIn",
      dragState: state,
      dragCounter: dragCounter,
      handleDrop: handleDrop,
    });
  }

  function dragOutEvent(e) {
    dispatch({
      event: e,
      type: "dragOut",
      dragState: state,
      dragCounter: dragCounter,
      handleDrop: handleDrop,
    });
  }

  function dropEvent(e) {
    dispatch({
      event: e,
      type: "drop",
      dragState: state,
      dragCounter: dragCounter,
      handleDrop: handleDrop,
    });
  }

  const dragStartEvent = (e) => {
    dragItem = filesCopy.find((file) => file.url == e.target.children[1].src);
  };

  const dragEnterEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragOverItem = filesCopy.find(
      (file) => file.url == e.target.parentNode.nextElementSibling.src
    );
  };

  const dropDivEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let dragIndex = dragItem.index;
    let dragOverIndex = dragOverItem.index;
    let newDragged = { ...dragItem, index: dragOverIndex };
    let newDropped = { ...dragOverItem, index: dragIndex };
    filesCopy.splice(dragIndex - 1, 1, newDropped);
    filesCopy.splice(dragOverIndex - 1, 1, newDragged);
    handleUpdate(filesCopy);
  };

  return (
    <div
      style={{
        display:"flex",
        flex: "3 3 0",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "0 4px",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {filesCopy.length > 0 &&
        files.map((file) => {
          if (file != null) {
            return (
              <Image
                dropDiv={(e) => dropDivEvent(e)}
                dragStart={dragStartEvent}
                dragEnter={dragEnterEvent}
                src={file.url}
              >
                <ImageSubmit
                  dragLeave={dragOutEvent}
                  dragOver={dragEvent}
                ></ImageSubmit>
              </Image>
            );
          }
        })}
      <Image
        dragOver={(e) => dragEvent(e)}
        dragLeave={dragOutEvent}
        dragStart={dragStartEvent}
        src={""}
      >
        <ImageSubmit drop={dropEvent} dragIn={dragInEvent}></ImageSubmit>
      </Image>
    </div>
  );
};

export const Image = ({
  children,
  dragStart,
  dragEnter,
  src,
  dropDiv,
}) => {
  return (
    <div
      style={{
        flex: "1 1 0",
        display: "flex",
        borderStyle: "solid",
        borderColor: "#000000",
        backgroundColor: "#557D8A",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        justifyContent: "space-between",
        alignItems:"stretch"
      }}
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragEnd={dropDiv}
      draggable
    >
      {children}
      <img
        style={{ border: "2px", borderColor: "red", objectFit: "cover" }}
        src={src}
        width="100%"
      ></img>
    </div>
  );
};

const ImageSubmit = ({ dragIn, dragLeave, dragOver, drop }) => {
  return (
    <label
      htmlFor="file"
      onDragEnter={dragIn}
      onDragLeave={dragLeave}
      onDragOver={dragOver}
      onDrop={drop}
      style={{
        textAlign: "center",
        position: "absolute",
        display: "block",
        width: "30%",
        height: "20rem",
      }}
    >
      <input
        style={{
          display: "inline",
          height: "20rem",
          textAlign: "center",
          opacity: "0",
        }}
        id="file"
        type="file"
        accept="image/png, image/jpeg"
      ></input>
    </label>
  );
};
