import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vulnerabilities = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVulnerabilities = async () => {
      try {
        const response = await axios.get('http://localhost:8000');
        setVulnerabilities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vulnerabilities:', error);
        setLoading(false);
      }
    };

    fetchVulnerabilities();
  }, []);

  const renderVulnerabilitiesByType = (type) => {
    const vulnerabilitiesOfType = vulnerabilities.filter((v) => v.type === type);
    return vulnerabilitiesOfType.map((v) => (
      <div key={v.id}>
        <h3>{v.title}</h3>
        <p>{v.description}</p>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading vulnerabilities...</div>;
  }

  return (
    <div>
      <h1>Vulnerabilities</h1>
      <h2>High</h2>
      {renderVulnerabilitiesByType('high')}
      <h2>Medium</h2>
      {renderVulnerabilitiesByType('medium')}
      <h2>Low</h2>
      {renderVulnerabilitiesByType('low')}
    </div>
  );
};

export default Vulnerabilities;