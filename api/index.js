const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const serverless = require('serverless-http');
const db = require('../models');
const Routes = require('../routes/route');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger docs
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sync database (optional for prod)
db.sequelize.sync().then(() => {
  console.log('✅ MySQL connected and synced.');
}).catch(err => {
  console.error('❌ DB connection failed:', err);
});

// Routes
app.use('/', Routes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export handler for Vercel
module.exports.handler = serverless(app);
