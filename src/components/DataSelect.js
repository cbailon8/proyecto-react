import { useState } from "react";

export const DataSelect = ({children, context}) => {
    const [sameAddress, setSameAddress] = useState(true);

    const handleChange = (event) => {
        setSameAddress(event.target.checked);
        context.setDiffData(sameAddress)
        
    };

    return (
        <label>
            Usar misma dirección de facturación y envío
            <input type="checkbox" checked={sameAddress} onChange={handleChange}/>
            {children}
        </label>
    )
}