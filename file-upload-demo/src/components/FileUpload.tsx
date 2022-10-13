import axios from 'axios';
import React, { useRef, useState } from 'react';

function FileUpload() {
  const fileCtrl = useRef<any>(null);
  const [img, setImg] = useState('');
  const changeHandle = () => {
    // console.log(fileCtrl.current?.files[0]);
    const formData = new FormData();
    formData.append('file', fileCtrl.current?.files[0]);
    axios
      .post('http://localhost:3003/api/v1/common/file', formData)
      .then((res) => {
        // console.log(res.data);
        setImg('http://localhost:3003' + res.data.data);
      });
  };
  return (
    <div>
      <h1>文件上传-使用FormData方式</h1>
      <input type='file' ref={fileCtrl} onChange={changeHandle} />
      <img
        src={img}
        style={{ maxWidth: '200px', maxHeight: '280px' }}
        alt='暂无图片'
      />
    </div>
  );
}

export default FileUpload;
