import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScanResultsPage = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);

  useEffect(() => {
    const fetchVulnerabilities = async () => {
      try {
        const scanId = 123; // Replace with the actual scan ID
        const response = await axios.get(`http://localhost:8000/api/scans/${scanId}/`);
        setVulnerabilities(response.data.vulnerabilities);
      } catch (error) {
        console.error('Error fetching vulnerabilities:', error);
      }
    };

    fetchVulnerabilities();
  }, []);

  return (
    <div>
      <h1>Scan Results</h1>
      <ul>
        {vulnerabilities.map((vulnerability) => (
          <li key={vulnerability.id}>
            <h3>{vulnerability.title}</h3>
            <p>{vulnerability.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScanResultsPage;