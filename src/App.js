import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Signin from './SignIn';
import Vulnerabilities from './Vulnerabilities';
import UserInfoPage from './UserInfo.js';
import TeamInfoPage from './TeamInfo.js';
import ScanResultsPage from './ScanResultsPage';

axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projectUploaded, setProjectUploaded] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [scanId, setScanId] = useState(null);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProjectId(response.data.id);
      alert(response.data.message);
      setProjectUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file. Please try again.');
    }
  };

  const handleGitClone = async () => {
    try {
      const response = await axios.post('/api/git-clone', { url: githubUrl });
      setProjectId(response.data.id);
      alert(response.data.message);
      setProjectUploaded(true);
    } catch (error) {
      console.error('Error cloning repository:', error);
  
      if (error.response && error.response.status === 400) {
        alert('Invalid repository URL. Please check the URL and try again.');
      } else if (error.response && error.response.status === 404) {
        alert('Repository not found. Please check the URL and try again.');
      } else {
        alert('Failed to clone the repository. Please try again later.');
      }
    }
  };

  const handleScanProject = async () => {
    try {
      const response = await axios.post(`/api/projects/${projectId}/trigger-scan`);
      setScanId(response.data.id);
      alert(response.data.message);
    } catch (error) {
      console.error('Error scanning project:', error);
      alert('Failed to scan the project. Please try again.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <Signin onSignIn={handleSignIn} />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <nav>
                    <ul class="my-list">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/user">User Info</Link>
                      </li>
                      <li>
                        <Link to="/team">Team Info</Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="content">
                    <h1 className="title">Project Security Scanning Tool</h1>
                    <div className="button-container">
                      <input
                        type="file"
                        id="file-input"
                        accept=".zip"
                        onChange={handleUpload}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="file-input" className="upload-button">
                        Upload ZIP Project
                      </label>
                      <div className="git-clone-container">
                        <input
                          type="text"
                          className="git-url-input"
                          placeholder="GitHub Repository URL"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                        />
                        <button className="git-clone-button" onClick={handleGitClone}>
                          Clone Project from Git
                        </button>
                      </div>
                      <button className="scan-button stylish-button" onClick={handleScanProject} disabled={!projectUploaded}>
                      Scan Project
                      </button>
                    </div>
                    <Routes>
                      <Route path="/user" element={<UserInfoPage />} />
                      <Route path="/team" element={<TeamInfoPage />} />
                      <Route path="/scans/:id" element={<ScanResultsPage />} />
                      <Route path="/vulnerabilities" element={<Vulnerabilities projectId={projectId} handleScanProject={handleScanProject} />} />
                    </Routes>
                  </div>
                </>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;