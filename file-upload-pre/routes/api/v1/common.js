const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// 二进制文件
router.post('/file', upload.single('file'), (req, res) => {
  res.json({
    code: 1,
    data: '/uploads/' + req.file.filename,
  });
});

router.post('/file_base64', (req, res) => {
  try {
    const imgData = req.body.file; // 从请求体中读取base64字符串数据
    const fileName =
      Date.now() + '.' + imgData.split(';')[0].split('/').slice(-1)[0]; // 生成文件名
    const savePath = './public/uploads/' + fileName;
    const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(savePath, base64Data, { encoding: 'base64' });
    res.json({
      code: 1,
      data: '/uploads/' + fileName,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({
      code: 0,
      error,
    });
  }
});

module.exports = router;
