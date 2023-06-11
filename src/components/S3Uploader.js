import React from 'react'
import AWS from 'aws-sdk';
import { useState } from 'react';

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-1',
  sessionToken: ''
});

export const S3Uploader = () => {
    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
      }

      const uploadToS3 = async () => {
        if (!file) {
          return;
        }
        const params = { 
          Bucket: 's3testreact2023', 
          Key: `${Date.now()}.${file.name}`, 
          Body: file 
        };
        const { Location } = await s3.upload(params).promise();
        setImageUrl(Location);
        console.log('cargando a s3', Location);
      }
      return (
        <div style={{ marginTop: '150px' }}>
          <h1>Subida de archivo simple</h1>
          <input type="file" onChange={handleFileSelect} />
          {file && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={uploadToS3}>Upload</button>
            </div>
          )}
          {imageUrl && (
            <div style={{ marginTop: '10px' }}>
              <img src={imageUrl} alt="uploaded" />
            </div>
          )}
        </div>
      );
}
