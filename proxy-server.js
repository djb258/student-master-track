import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083'],
  credentials: true
}));

// Proxy all requests to your Render API
app.use('/api', createProxyMiddleware({
  target: 'https://render-student-profile.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔄 Proxying: ${req.method} ${req.path} -> ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`✅ Response: ${proxyRes.statusCode} for ${req.path}`);
  },
  onError: (err, req, res) => {
    console.error(`❌ Proxy error:`, err.message);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 CORS Proxy Server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to: https://render-student-profile.onrender.com`);
  console.log(`🔗 Use http://localhost:${PORT}/api/health to test your API`);
}); 