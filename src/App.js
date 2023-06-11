import "./App.css";
import {
  Button,
  PaymentForm,
  AddressForm,
  FormManager,
} from "./components/Form";
import { DataSelect } from "./components/DataSelect";
import { Toggle } from "./components/Toggle";
import { S3Uploader } from "./components/S3Uploader";
import { S3Viewer } from "./components/S3Viewer";
import React, { useState, useReducer, useEffect } from "react";
import { DataContext } from "./components/DataContext";
import { Summary } from "./components/Summary";
import { Album } from "./components/Album";
import { DragAndDrop, Grid, ImageManager } from "./components/Image";
import { eventReducer } from "./components/EventReducer";
import { ImageContext } from "./components/ImageContext";
import { Lightsail } from "aws-sdk";

const address = {
  name: "",
  lastName: "",
  cellphone: "",
  mail: "",
  mainStreet: "",
  secondStreet: "",
  city: "",
  province: "",
  country: "",
  po: "",
};

const card = {
  owner: "",
  number: "",
  expires: "",
  cvv: "",
};

const model = {
  paymentInfo: {},
  checkoutAddress: {},
  deliveryAddress: {},
};

const fileModel = {url:"", index:""}

let fileStart = 1;

function App() {
  const [file, setFile] = useState(fileModel);
  const [fileList, setFileList] = useState([
    {
      url: "https://downloader.disk.yandex.ru/preview/df1c051a1c132e4bcd2821f08a5fa87da94fcc662fd95e50822d54e1ef3693e1/648620fe/yMv37ItAtOed_Ru6xHM28-d5MAQtcjv1oS1YVWUPc8635hNsGpT8DwBFNspI-HtciZkAaZifGEUd1QHq-ECwvA%3D%3D?uid=0&filename=%EF%BC%95%E6%9C%88%20%E8%A7%92%E5%B7%BB%E3%82%8F%E3%81%9F%E3%82%81%20%E9%BB%92%E6%98%9F%E7%B4%85%E7%99%BD%E5%85%88%E7%94%9F.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1318x727",
      index: 1,
    },
  ]);
  const [diffData, setDiffData] = useState(false);
  const imageContext = {
    file,
    setFile,
    fileList,
    setFileList,
    fileStart,
    fileSubmit,
  };
  const context = { diffData, setDiffData };
  const [formData, setFormData] = useState(model);
  const [payment, setPayment] = useState(card);
  const [checkout, setCheckout] = useState(address);
  const [delivery, setDelivery] = useState(address);
  const [load, setLoad] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [events, dispatch] = useReducer(eventReducer, []);

  const optional = (
    <AddressForm data={checkout} manageData={setCheckout}>
      Datos de Facturación
    </AddressForm>
  );

  function fileSubmit(files) {
    console.log(files);
    fileStart++;
    setFile({ url: URL.createObjectURL(files[0]), index: fileStart });
    console.log("success");
    console.log(fileList);
  }

  function handleSubmit(event) {
    setFormData((data) => ({ ...data }));
    setToggle2(true);
    if (diffData) {
      return setFormData((data) => ({
        paymentInfo: payment,
        checkoutAddress: checkout,
        deliveryAddress: delivery,
      }));
    }
    return setFormData((data) => ({
      paymentInfo: payment,
      checkoutAddress: delivery,
      deliveryAddress: delivery,
    }));
  }

  function start(event) {
    setToggle1(false);
  }

  function toggleForm(event) {
    setToggle1(true);
    setToggle2(false);
  }

  function finish(event) {
    setToggle1(false);
    setToggle2(false);
    alert("Gracias por tu compra");
  }

  function loadApp(event) {
    setFile({url:"",index:""})
    setLoad(true)
}

  useEffect(()=>{
    if(file.url.length > 5){
      setFileList([...fileList, file])
    }
  },[file])

  //<DragAndDrop handleDrop={fileSubmit}></DragAndDrop>
  return (
    <div style={{ overflow: "hidden" }} className="App">
      <header className="App-header">
        <ImageContext.Provider>
          <Toggle onScreen={!load}>
            <Button handleClick={loadApp}>Empezar</Button>
          </Toggle>
          <Toggle onScreen={load}>
          <Toggle onScreen={!toggle1}>
            <ImageManager context={imageContext}>
              
              <Grid handleDrop={fileSubmit} files={fileList} setFiles={setFileList}></Grid>
            </ImageManager>

            <Button handleClick={toggleForm}>Continuar</Button>
          </Toggle>
          </Toggle>
          <Toggle onScreen={toggle1}>
            <Toggle onScreen={!toggle2}>
              <DataContext.Provider value={context}>
                <FormManager
                  title="Checkout"
                  optional={optional}
                  data={formData}
                  manageData={setFormData}
                >
                  <DataSelect context={context}>
                    <PaymentForm data={payment} manageData={setPayment}>
                      Información de Pago
                    </PaymentForm>
                    <AddressForm data={delivery} manageData={setDelivery}>
                      Dirección de Entrega
                    </AddressForm>
                  </DataSelect>
                </FormManager>
                <Button handleClick={start}>Regresar</Button>
                <Button handleClick={handleSubmit}>Resumen del pedido</Button>
              </DataContext.Provider>
            </Toggle>
          </Toggle>
          <Toggle onScreen={toggle2}>
            <Summary data={formData} files={fileList}></Summary>
            <Button handleClick={toggleForm}>Regresar</Button>
            <Button handleClick={finish}>Finalizar pedido</Button>
          </Toggle>
        </ImageContext.Provider>
      </header>
    </div>
  );
}

export default App;
