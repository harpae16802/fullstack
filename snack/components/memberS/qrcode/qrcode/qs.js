import React from 'react';
import QRCode from 'qrcode.react';
import { useQrcode } from '@/data/context/QrcodeContext';

export default function QrWithQRCodeGenerator({jsonData}) { 
 
    let { QRcodeData } = useQrcode();

    QRcodeData = JSON.stringify(jsonData, null, 2); 
    return (
      <div>
        <QRCode value={QRcodeData} />
       {/* <p>{QRcodeData}</p>*/}
      </div>
    );
 
 
}