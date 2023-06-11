import { useState, useEffect, useRef } from "react";
import AWS from "aws-sdk";

export const Album = () => {
  let dragItem = useRef();
  let dragOverItem = useRef();
  let inputRef = useRef(null);
  const [listFiles, setListFiles] = useState([]);
  const [s3Domain, setS3Domain] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setListFiles(file);
    console.log(file);
  };

  // const s3 = new AWS.S3();

  // const getFromS3 = (e) => {
  //     const params = {
  //         Bucket: 's3testreact2023'
  //     };
  //     s3.listObjectsV2(params, (err, data) => {
  //         if (err) {
  //         console.log(err, err.stack);
  //         } else {
  //             console.log(data);
  //             setS3Domain(data.Name);
  //             setListFiles(data.Contents);
  //         }
  //     });
  //   }

  // useEffect(() => {
  //     getFromS3();
  // }, [])

  // const formatUrl = (name) => {
  //     const url = "https://" + s3Domain + ".s3.amazonaws.com/" + name.replaceAll(" ","+");
  //     console.log(url);
  //     return url;
  // }

  const dragStart = (e, position) => {
    console.log("start");

    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    console.log("enter");

    e.preventDefault();
    e.stopPropagation();
    dragOverItem.current = position;
  };
  const submit = (e) => {
    console.log("submit");
    e.preventDefault();
    handleFileSelect(e);
  };

  const drop = (e) => {
    console.log("drop");

    e.preventDefault();
    const itemsUpdate = [...listFiles];
    const posDragged = dragItem.current;
    const posOver = dragOverItem.current;
    const itemOver = listFiles.filter(
      (i) => listFiles.indexOf(i) == posOver
    )[0];
    const itemDragged = listFiles.filter(
      (i) => listFiles.indexOf(i) == posDragged
    )[0];

    itemsUpdate.splice(dragItem.current, 1);
    itemsUpdate.splice(dragOverItem.current, 0, itemDragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setListFiles(itemsUpdate);
  };

  return (
    <div onDragEnd={submit}>
      <h1>Albúm</h1>
      <form
        style={{
          maxWidth: "100%",
          height: "30rem",
          textAlign: "center",
          position: "relative",
        }}
        onDragEnter={dragEnter}
        onDragEnd={submit}
      >
        <input
            ref={inputRef}
            multiple={true}
            id="imgEnter"
            //style={{ display: "none" }}
            type="file"
            onDragEnd={submit}
          />
        <label
          htmlFor="imgEnter"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: "2px",
            backgroundColor: "#000000",
          }}
          onDragEnd={submit}
        >
          <div style={{
          position: "absolute",
          width: "100",
          height: "100",
          borderRadius: "1rem",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }}
        onDrop={submit}>
            </div>
            <img src=""/>
          {/* {listFiles.length == 0 && <h3>No hay objetos que mostrar</h3>}
          {listFiles.length > 0 && (
            <div
              className="wrapper"
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              key={index}
              draggable
            >
              {listFiles.map((name, index) => (
                <div
                  style={{ width: "200px", height: "200px", display: "flex" }}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={index}
                  draggable
                >
                  <img key={index} src={formatUrl(name.Key)}></img>
                </div>
              ))}
            </div>
          )} */}
        </label>
      </form>
    </div>
  );
};
