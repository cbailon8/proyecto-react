import React, {
  Component,
  useRef,
  useEffect,
  useState,
  useReducer,
} from "react";
import { eventReducer } from "./EventReducer";

export const ImageManager = ({ children, context }) => {
  return <div>{children}</div>;
};

export const DragAndDrop = ({ children, handleDrop }) => {
  const [events, dispatch] = useReducer(eventReducer, []);

  let state = {
    drag: false,
  };
  let dragCounter = 0;
  let dropRef = useRef();

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

  useEffect(() => {
    let div = dropRef.current;
  });

  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "20rem",
      }}
      ref={dropRef}
    >
      <label
        htmlFor="file"
        onDragEnter={dragInEvent}
        onDragLeave={dragOutEvent}
        onDragOver={dragEvent}
        onDrop={dropEvent}
        style={{
          display: "block",
          width: "100%",
          height: "20rem",
        }}
      >
        <input
          style={{
            display: "block",
            width: "100%",
            height: "20rem",
            textAlign: "center",
          }}
          id="file"
          type="file"
          accept="image/png, image/jpeg"
        ></input>
      </label>
      {children}
    </div>
  );
};

export const Grid = ({ files, setFiles, handleDrop }) => {
  let dragItem = useRef();
  let dragOverItem = useRef();
  let check = false;
  const [s3Domain, setS3Domain] = useState("");
    let filesCopy = [...files];
  const [events, dispatch] = useReducer(eventReducer, []);

  let state = {
    drag: false,
  };
  let dragCounter = 0;
  let dropRef = useRef();

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
  
  useEffect(() => {
    let div = dropRef.current;
  });


  //   const dragStart = (e, position) => {
  //     console.log("start");
  //     console.log(dragItem);
  //     console.log(e);
  //     dragItem.current = position;
  //   };

  //   const dragEnter = (e, position) => {
  //     console.log("enter");

  //     e.preventDefault();
  //     e.stopPropagation();
  //     dragOverItem.current = position;
  //   };

  //   //   const submit = (e) => {
  //   //     console.log("submit");
  //   //     e.preventDefault();
  //   //     handleFileSelect(e);
  //   //   };

  //   const drop = (e) => {
  //     console.log("drop");

  //     e.preventDefault();
  //     const itemsUpdate = [...files];
  //     const posDragged = dragItem.current;
  //     const posOver = dragOverItem.current;
  //     const itemOver = files.filter((i) => files.indexOf(i) == posOver)[0];
  //     const itemDragged = files.filter((i) => files.indexOf(i) == posDragged)[0];

  //     itemsUpdate.splice(dragItem.current, 1);
  //     itemsUpdate.splice(dragOverItem.current, 0, itemDragged);
  //     dragItem.current = null;
  //     dragOverItem.current = null;
  //     setFiles(itemsUpdate);
  //   };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "0 4px",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
        {(filesCopy.length>0) && files.map((file)=>{
        if (file != null){
        return (
            <Image
        dragOver={(e) => dragEvent(e)}
        dragEnter={(e) => dragInEvent(e)}
        drop={dropEvent}
        dragLeave={dragOutEvent}
        key={file.index}
        src={file.url}
      />
        )}})}
            <Image
            dragOver={(e) => dragEvent(e)}
            dragEnter={(e) => dragInEvent(e)}
            drop={dropEvent}
            dragLeave={dragOutEvent}
            key={""}
            src={""}
          />
    </div>
  );
};

const Image = ({ children, dragEnter, dragLeave, dragOver, drop, key, src }) => {
  return (
    <div
    style={{flex:"1"}}
      draggable
    >
      <label
        htmlFor="file"
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDragOver={dragOver}
        onDrop={drop}
        style={{
          display: "block",
          width: "30%",
          height: "20rem",
        }}
      >
        <input
          style={{
            display: "block",
            height: "20rem",
            textAlign: "center",
          }}
          id="file"
          type="file"
          accept="image/png, image/jpeg"
        ></input>
      </label>
      <img
        style={{ border: "2px", borderColor: "red" }}
        width="30%"
        src={src} draggable
      ></img>
      {children}
    </div>
  );
};
