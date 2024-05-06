import React from 'react';
import QRCode from 'qrcode.react';

const Qr = ({ jsonData }) => (
  <div>
    <div>
      <QRCode value={JSON.stringify(jsonData)} />
      <p>{JSON.stringify(jsonData)}</p>
    </div>
  </div>
);

export default Qr;
