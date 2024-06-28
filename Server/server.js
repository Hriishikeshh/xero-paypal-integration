const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;
const redirect_uri = 'http://localhost:5000/callback';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: '1234', 
  resave: false,
  saveUninitialized: true
}));

app.post('/auth', (req, res) => {
  const { clientId, clientsec, clientScope, state } = req.body;
  req.session.clientId = clientId; 
  req.session.clientsec = clientsec;

  const authorizeUrl = `https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(clientScope)}&state=${state}`;
  res.json({ authorizeUrl });
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const clientId = req.session.clientId;
  const clientSecret = req.session.clientsec;

  try {
    const tokenResponse = await axios.post(
      'https://identity.xero.com/connect/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );

    const tokens = tokenResponse.data;
    res.json(tokens);
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error.message);
    res.status(500).send('Error exchanging authorization code for tokens.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
