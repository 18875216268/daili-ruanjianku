const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url; // 获取目标 URL
  
  if (!targetUrl) {
    return res.status(400).send('URL parameter is missing');
  }

  try {
    // 请求目标资源
    const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
    
    // 处理 HTML 内容，将相对路径替换为代理路径
    let content = response.data.toString('utf-8');
    content = content.replace(/(href|src)="(\/[^"]*)"/g, `$1="${req.protocol}://${req.get('host')}/proxy?url=${encodeURIComponent(new URL('$2', targetUrl).href)}"`);

    // 设置内容类型为 HTML，并发送处理后的内容
    res.set('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching the target URL');
  }
});

app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
