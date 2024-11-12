const express = require('express');
const axios = require('axios');
const { Client } = require('pg');
const bodyParser = require('body-parser');

// Import OpenTelemetry setup
require('./opentelemetry-setup');
const { trace } = require('@opentelemetry/api');

// Create an Express app
const app = express();
const port = 3000;

app.use(bodyParser.json());

// PostgreSQL connection setup
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'pvmonitoring',
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Route to fetch data from PostgreSQL
app.get('/get-users', async (req, res) => {
  const tracer = trace.getTracer('project-a');
  const span = tracer.startSpan('fetch-users-from-postgresql');

  try {
    // Query the 'users' table to get the data
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;

    // Log the users data to verify
    console.log(users);

    // Send data to Node Project B (replace URL with Node Project B's API endpoint)
    const response = await axios.post('http://localhost:4000/receive-data', { users });

    // Send response back to the client
    res.json({ message: 'Data sent to Node Project B', response: response.data });
  } catch (err) {
    span.recordException(err);
    console.error('Error fetching data from PostgreSQL:', err);
    res.status(500).json({ error: 'Failed to fetch data from PostgreSQL', details: err.message });
  } finally {
    span.end();
  }
});

app.get('/get-users1', async (req, res) => {
  const tracer = trace.getTracer('project-a');
  const span = tracer.startSpan('fetch-users-from-postgresql');

  try {
    // Query the 'users' table to get the data
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;

    // Log the users data to verify
    console.log(users);

    // Send users data back to the client (web app)
    res.json({ users });
  } catch (err) {
    span.recordException(err);
    console.error('Error fetching data from PostgreSQL:', err);
    res.status(500).json({ error: 'Failed to fetch data from PostgreSQL', details: err.message });
  } finally {
    span.end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Node Project A running on http://localhost:${port}`);
});