const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const decompress = require('decompress');
const gitClone = require('git-clone');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('app');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file received');
      res.status(400).json({ message: 'No file received' });
      return;
    }

    console.log('File received:', req.file);

    const extractedPath = path.join(__dirname, 'extracted', req.file.originalname.replace('.zip', ''));
    await decompress(req.file.path, extractedPath)
      .then(() => {
        console.log('File extracted to:', extractedPath);
        res.status(200).json({ message: 'File uploaded and extracted successfully' });
      })
      .catch((error) => {
        console.error('Error during extraction:', error);
        res.status(500).json({ message: 'Failed to extract the file' });
      });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Failed to process file' });
  }
});

app.post('/api/git-clone', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send('No GitHub URL provided.');
  }

  const repoName = url.split('/').pop().replace('.git', '');
  const repoPath = path.join('cloned', repoName);

  gitClone(url, repoPath, (error) => {
    if (error) {
      debug('Error while cloning the repository:', error);
      debug('Error message:', error.message);
      debug('Error stack:', error.stack);
      return res.status(500).send(`Error while cloning the repository: ${error.message}`);
    }
  
    res.status(200).send('Repository cloned successfully.');
  });
});

app.post('/api/scan-project', (req, res) => {
  const { projectPath } = req.body;

  // Perform the security scan here
  // ...

  if (scanSuccessful) {
    res.status(200).json({ message: 'Scan successful' });
  } else {
    console.error('Error while scanning the project');
    res.status(500).json({ message: 'Failed to scan the project. Please try again later.' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
  },
];

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = 'abc123'; // TODO: Generate a secure JWT token
  res.status(200).json({ token });
});
