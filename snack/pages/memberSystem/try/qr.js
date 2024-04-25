import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useQrcode } from '@/data/context/QrcodeContext';

import classNames from 'classnames';

export default function QrWithQRCodeGenerator() {
  const { QRcodeData, setQRcodeData,QRcodeDataCreate } = useQrcode(); 

 
  return (
    <div> 
      <QRCode value={QRcodeDataCreate} />
      <p>{QRcodeData}</p>
    </div>
  );
}
