const express = require('express');
const axios = require('axios');

const app = express();

// 根路径路由，返回简单的说明
app.get('/', (req, res) => {
  res.send('Please use /proxy?url= to access the proxy server.');
});

// 代理路由
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).send('URL parameter is missing');
  }

  try {
    const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
    res.set(response.headers);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching the target URL');
  }
});

module.exports = app;
