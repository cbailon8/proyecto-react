import { useContext } from "react";
import { DataContext } from "./DataContext";

export const Button = ({children, handleClick}) =>{
    return (
        <div style={{display: "flex"}}>
            <button onClick={handleClick}>{children}</button>
        </div>
    )
}

export const PaymentForm = ({children, data, manageData}) => {
    function handleChange(event){
        const { name, value } = event.target;
        manageData((data) => ({ ...data}));
        manageData((data) => ({ ...data, [name]: value }));
    };
    
    return (
        <div>
            <form style={{display:"flex",flexDirection:"column",textAlign:"left"}}>
                {(children) && (
                <h3>{children}</h3> 
                )}
                <label htmlFor="titular">Nombre del titular:</label>
                <input id="titular" name="owner" type="text" onChange={handleChange} required/>
                <label htmlFor="numero">Número de tarjeta:</label>
                <input id="numero" name="number" type="text" onChange={handleChange} required maxLength={16}/>
                <label htmlFor="expira">Apellidos:</label>
                <input id="expira" name="expires" type="text" onChange={handleChange} required maxLength={5}/>
                <label htmlFor="cvv">CVV:</label>
                <input id="cvv" name="cvv" type="text" onChange={handleChange} required maxLength={3}/>
            </form>
        </div>
    )
}

export const AddressForm = ({children, data, manageData}) => {
    function handleChange(event){
        const { name, value } = event.target;
        manageData((data) => ({ ...data}));
        manageData((data) => ({ ...data, [name]: value }));
    };

    return (
        <div>
            <form style={{display:"flex",flexDirection:"column",textAlign:"left"}}>
                {(children) && (
                <h3>{children}</h3> 
                )}
                <label htmlFor="nombres">Nombres:</label>
                <input id="nombres" name="name" type="text" onChange={handleChange} required/>
                <label htmlFor="apellidos">Apellidos:</label>
                <input id="apellidos" name="lastName" type="text" onChange={handleChange} required/>
                <label htmlFor="telefono">Teléfono:</label>
                <input id="telefono" name="cellphone" type="text" onChange={handleChange} required minLength={8}/>
                <label htmlFor="correo">Correo:</label>
                <input id="correo" name="mail" type="text" onChange={handleChange} required/>
                <label htmlFor="calle1">Calle 1:</label>
                <input id="calle1" name="mainStreet" type="text" onChange={handleChange} required/>
                <label htmlFor="calle2">Calle 2:</label>
                <input id="calle2" name="secondStreet" type="text" onChange={handleChange} required/>
                <label htmlFor="ciudad">Ciudad:</label>
                <input id="ciudad" name="city" type="text" onChange={handleChange} required/>
                <label htmlFor="provincia">Estado/Provincia:</label>
                <input id="provincia" name="province" type="text" onChange={handleChange} required/>
                <label htmlFor="pais">País:</label>
                <input id="pais" name="country" type="text" onChange={handleChange} required/>
                <label htmlFor="postal">Código Postal:</label>
                <input id="postal" name="po" type="text" onChange={handleChange} required/>
            </form>
        </div>
    )
}

export const FormManager = ({children, title, optional}) => {
    const context = useContext(DataContext)
    
    switch(context.diffData){
        case true:
            return (
                <div>
                    {(title) && (<h1>{title}</h1>)}
                    {children}
                    {optional}
                </div>
            )
        case false:
            return (
                <div>
                    {(title) && (<h1>{title}</h1>)}
                    {children}
                </div>
            )
        default:
            throw Error('Unknown error');
    }   
}