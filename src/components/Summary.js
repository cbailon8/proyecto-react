import {Grid} from 'react-visual-grid'

export const Summary = ({ data, files }) => {
  console.log(data);
  const { paymentInfo:payment, checkoutAddress:checkout, deliveryAddress:delivery } = data;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "0 4px" }}>
      <div style={{ flex: "50%", padding: "0 4px" }}>
        <h2>Datos de facturación</h2>
        <span>
          <h4>Titular: </h4>
          {payment.owner}
        </span>
        <span>
          <h4>Número de tarjeta: </h4>
          {payment.number}
        </span>
        <span>
          <h4>Fecha de expiración: </h4>
          {payment.expires}
        </span>
        <span>
          <h4>CVV: </h4>
          {payment.cvv}
        </span>
        <span>
          <h4>Nombres: </h4>
          {checkout.name}
        </span>
        <span>
          <h4>Apellidos: </h4>
          {checkout.lastName}
        </span>
        <span>
          <h4>Teléfono: </h4>
          {checkout.cellphone}
        </span>
        <span>
          <h4>Correo: </h4>
          {checkout.mail}
        </span>
        <span>
          <h4>Calle Principal: </h4>
          {checkout.mainStreet}
        </span>
        <span>
          <h4>Calle Secundaria: </h4>
          {checkout.secondStreet}
        </span>
        <span>
          <h4>Ciudad: </h4>
          {checkout.city}
        </span>
        <span>
          <h4>Estado/Provincia: </h4>
          {checkout.province}
        </span>
        <span>
          <h4>País: </h4>
          {checkout.country}
        </span>
        <span>
          <h4>Código Postal: </h4>
          {checkout.po}
        </span>
        <h2>Datos de entrega</h2>
        <span>
          <h4>Nombres: </h4>
          {delivery.name}
        </span>
        <span>
          <h4>Apellidos: </h4>
          {delivery.lastName}
        </span>
        <span>
          <h4>Teléfono: </h4>
          {delivery.cellphone}
        </span>
        <span>
          <h4>Correo: </h4>
          {delivery.mail}
        </span>
        <span>
          <h4>Calle Principal: </h4>
          {delivery.mainStreet}
        </span>
        <span>
          <h4>Calle Secundaria: </h4>
          {delivery.secondStreet}
        </span>
        <span>
          <h4>Ciudad: </h4>
          {delivery.city}
        </span>
        <span>
          <h4>Estado/Provincia: </h4>
          {delivery.province}
        </span>
        <span>
          <h4>País: </h4>
          {delivery.country}
        </span>
        <span>
          <h4>Código Postal: </h4>
          {delivery.po}
        </span>
      </div>
      <Album files={files}/>
    </div>
  );
};


const Album = ({files}) => {
  let images = files.map((file)=>{
    const src = file.url;
    const alt = `Image ${file.index}`;
     return {src,alt}
 })
  return (
    <Grid images={images} gridLayout="horizontal" width={"30rem"} height={"15rem"}/>
  )
}