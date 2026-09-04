const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {

  const { username, email, password } = req.body;

  console.log('Signup request received:', { username, email });

  res.status(201).json({
    success: true,
    message: 'Account created (dummy response).',
    user: {
      id: 'dummy-id-123',
      username,
      email,
    },
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email });

  res.status(200).json({
    success: true,
    message: 'Logged in (dummy response).',
    user: {
      id: 'dummy-id-123',
      username: 'oceanlover22',
      email,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});