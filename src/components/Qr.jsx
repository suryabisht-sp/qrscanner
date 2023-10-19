import React, { useState } from 'react';
import QRCode from "qrcode";

const QRCodeGenerate = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
    setData(null); // Reset data when input changes
  }

  const handleGenerate = () => {
    setLoading(true);
    const dataValue = `www.instagram.com/${url}`;
    QRCode.toDataURL(dataValue, { width: 300 }, (err, dataUrl) => {
      if (err) console.error(err);
      setData(dataUrl);
      setLoading(false); // Set loading to false when data is available
    });
  }

  const handleDownload = () => {
    if (data) {
      const link = document.createElement('a');
      link.href = data;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div className='qr-container'>
      <form className='form-box'>
        <span>Generate QR for any Insta Handle, make sure you type @handlename correctly.</span>
        <br />
        <input onChange={(e) => { handleChange(e) }} type="text" placeholder='Enter Instagram Account Name' />
      </form>
      <div className='image-div'>{loading ? "Generating QR code..." : data && <img src={data} alt='qr' />}</div>
      <button className='btn' onClick={() => { handleGenerate() }}>Generate</button>
      {data && <button className='btn' onClick={() => { handleDownload() }} disabled={!data}>Download</button>}
    </div>
  )
}

export default QRCodeGenerate;
