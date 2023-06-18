import "./App.css";
import {
  Button,
  PaymentForm,
  AddressForm,
  FormManager,
} from "./components/Form";
import { DataSelect } from "./components/DataSelect";
import { Toggle, ToggleTheme } from "./components/Toggle";
import { S3Uploader } from "./components/S3Uploader";
import { S3Viewer } from "./components/S3Viewer";
import React, { useState, useReducer, useEffect } from "react";
import { DataContext } from "./components/DataContext";
import { Summary } from "./components/Summary";
import { ImgGrid, ImageManager } from "./components/Image";
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

const fileModel = { url: "", index: "", name: "" };

function App() {
  const [theme, setTheme] = useState("dark");
  const [fileStart, setStart] = useState(1);
  const [file, setFile] = useState(fileModel);
  const [fileList, setFileList] = useState([
    {
      url: "https://m.media-amazon.com/images/I/A1ntnF3PJOL._AC_CLa%7C2140%2C2000%7C717LuXqML%2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UY1100_.png",
      index: 1,
      name: "an attempt was made.png",
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
    let i = fileStart;
    setFile({
      url: URL.createObjectURL(files[0]),
      index: i + 1,
      name: files[0].name,
    });
  }

  function fileUpdate(files) {
    setFileList(files);
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
    setFile(fileModel);
    setLoad(true);
  }

  useEffect(() => {
    if (file.url.length > 5) {
      setFileList([...fileList, file]);
      setStart(fileStart + 1);
    }
  }, [file]);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>Photo Album<ToggleTheme toggle={toggleTheme} /></h1>
      </header>
      <div style={{overflow: "hidden", padding: "20px"}}>
        <ImageContext.Provider>
          <Toggle onScreen={!load}>
            <button onClick={loadApp}>Empezar</button>
          </Toggle>
          <Toggle onScreen={load}>
            <Toggle onScreen={!toggle1}>
              <ImageManager context={imageContext}>
                <ImgGrid
                  handleUpdate={fileUpdate}
                  handleDrop={fileSubmit}
                  files={fileList}
                  setFiles={setFileList}
                ></ImgGrid>
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
      </div>
    </div>
  );
}

export default App;
