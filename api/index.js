const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const serverless = require('serverless-http');

// Path adjustment for Vercel structure
const db = require('./models'); // ensure models folder is outside `api/`
const Routes = require('./routes/route'); // same here

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger docs (load YAML properly in serverless)
const swaggerDocument = YAML.load(path.join(__dirname, 'docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sync DB
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

// Export handler
module.exports = serverless(app);
