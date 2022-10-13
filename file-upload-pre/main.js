const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('./public')); // 静态资源目录
app.use(express.json()); // 解析请求体 json字符串
app.use(express.urlencoded({ extended: false })); // 解析 url编码数据

app.use(cors());

app.use('/api/v1/common', require('./routes/api/v1/common'));

app.listen(3003, () => console.log('server is running on 3003'));
