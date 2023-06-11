import React from 'react'
import AWS from 'aws-sdk';
import { useState, useEffect } from 'react';

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1',
    sessionToken: ''
});


export const DynamoViewer = () => {

    const dynamo = new AWS.DynamoDB();
    var params = {
        TableName: 'carros'
      };

      const [cars, setCars] = useState([]);
      
      const getDynamoElements = (e) => {
        dynamo.scan(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
            setCars(data.Items)
          data.Items.forEach(function(element, index, array) {
            console.log(element);
          });
        }
      });
    }

    useEffect(() => {
        getDynamoElements();
    }, [])
    

  return (
    <div className='dynamoContainer'>
        <div>DynamoViewer</div>
        {(cars.length==0) && (
            <h3>No hay objetos que mostrar</h3> 
            )
        }
        {(cars.length>0) && (
            <table>
                <tr>
                    <th>Marca</th>
                    <th>Tipo</th>
                    <th>Modelo</th>
                    <th>Valor</th>
                </tr>
                {
                cars.map((e, index) => (
                    <tr>
                        <td>
                            {e.marca.S}
                        </td>
                        <td>
                            {e.tipo.S}
                        </td>
                        <td>
                            {e.modelo.S}
                        </td>
                        <td>
                            {e.valor.N}
                        </td>
                    </tr>
                ))}
          </table>
            )
        }
    </div>
    
  )
}
