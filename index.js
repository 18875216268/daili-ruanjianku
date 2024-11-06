const express = require('express');
const axios = require('axios');

const app = express();

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url; // 获取请求中的目标 URL

  if (!targetUrl) {
    return res.status(400).send('URL parameter is missing');
  }

  try {
    // 使用 axios 请求外部资源
    const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
    res.set(response.headers); // 设置目标资源的响应头
    res.send(response.data); // 将目标资源的内容返回给前端
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching the target URL');
  }
});

module.exports = app;
