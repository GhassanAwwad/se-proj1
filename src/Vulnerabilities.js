import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vulnerabilities = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVulnerabilities = async () => {
      try {
        //const response = await axios.get('http://localhost:8000');
        const vulnerabilities = [
          {
            "vuln_id": 1,
            "type": "SAST",
            "file_location": "/path/to/file1.py",
            "line_of_code": "123",
            "severity": "High",
            "cve_id": "CVE-2023-1234",
            "description": "SAST: SQL Injection - A vulnerability that allows an attacker to execute arbitrary SQL commands.",
            "suggested_fix": "Use parameterized queries and sanitize user input to prevent SQL injection attacks."
          },
          {
            "vuln_id": 2,
            "type": "SCA",
            "file_location": "/path/to/file2.js",
            "line_of_code": "456",
            "severity": "Medium",
            "cve_id": "CVE-2023-5678",
            "description": "SCA: Cross-Site Scripting (XSS) - A vulnerability that allows an attacker to inject malicious scripts into a web page viewed by other users.",
            "suggested_fix": "Encode user input before displaying it on a web page to prevent XSS attacks."
          },
          {
            "vuln_id": 3,
            "type": "Docker Security Issue",
            "file_location": "/path/to/file3.c",
            "line_of_code": "789",
            "severity": "Critical",
            "cve_id": "CVE-2023-9012",
            "description": "Docker Security Issue: A vulnerability that allows an attacker to gain unauthorized access to a container or the host system.",
            "suggested_fix": "Apply security updates and best practices for securing Docker containers."
          },
          {
            "vuln_id": 4,
            "type": "Hardwritten Credentials",
            "file_location": "/path/to/file4.py",
            "line_of_code": "1011",
            "severity": "High",
            "cve_id": "CVE-2023-1314",
            "description": "Hardwritten Credentials: A vulnerability that exposes hardcoded usernames and passwords in source code.",
            "suggested_fix": "Remove hardcoded credentials and use secure credential storage mechanisms such as environment variables or configuration files."
          },
          {
            "vuln_id": 5,
            "type": "SCA",
            "file_location": "/path/to/file5.js",
            "line_of_code": "1213",
            "severity": "Low",
            "cve_id": "CVE-2023-1516",
            "description": "SCA: Cross-Site Request Forgery (CSRF) - A vulnerability that allows an attacker to perform actions on behalf of a logged-in user without their consent.",
            "suggested_fix": "Use anti-CSRF tokens and other best practices to prevent CSRF attacks."
          },
          {
            "vuln_id": 6,
            "type": "SAST",
            "file_location": "/path/to/file6.py",
            "line_of_code": "1415",
            "severity": "Medium",
            "cve_id": "CVE-2023-1718",
            "description": "SAST: Insecure Cryptographic Storage - A vulnerability that allows an attacker to decrypt sensitive data stored on the system.",
            "suggested_fix": "Use strong encryption algorithms and proper key management to secure sensitive data."
          },
          {
            "vuln_id": 7,
            "type": "SCA",
            "file_location": "/path/to/file7.js",
            "line_of_code": "1617",
            "severity": "High",
            "cve_id": "CVE-2023-1920",
            "description": "SCA: Component with known vulnerabilities - A vulnerability that allows an attacker to exploit security flaws in third-party software components used by the application.",
            "suggested_fix": "Keep software components up-to-date and use vulnerability scanners to identify and remediate known vulnerabilities."
          },
          {
            "vuln_id": 8,
            "type": "Docker Security Issue",
            "file_location": "/path/to/file8.c",
            "line_of_code": "2122",
            "severity": "Critical",
            "cve_id": "CVE-2023-2224",
            "description": "Docker Security Issue: A vulnerability that allows an attacker to escalate privileges and gain root access to the host system.",
            "suggested_fix": "Limit container privileges, use secure configurations, and apply security updates to prevent Docker security issues."
          },
          {
            "vuln_id": 9,
            "type": "Hardwritten Credentials",
            "file_location": "/path/to/file9.py",
            "line_of_code": "2324",
            "severity": "High",
            "cve_id": "CVE-2023-2526",
            "description": "Hardwritten Credentials: A vulnerability that exposes hardcoded API keys or other secrets in source code.",
            "suggested_fix": "Use secure credential storage mechanisms and avoid committing secrets to version control systems."
          },
          {
            "vuln_id": 10,
            "type": "SAST",
            "file_location": "/path/to/file10.py",
            "line_of_code": "2526",
            "severity": "Low",
            "cve_id": "CVE-2023-2728",
            "description": "SAST: Information Disclosure - A vulnerability that allows an attacker to access sensitive information, such as credentials or user data.",
            "suggested_fix": "Properly protect sensitive data and avoid logging sensitive information to prevent information disclosure vulnerabilities."
          }
        ];
        setVulnerabilities(vulnerabilities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vulnerabilities:', error);
        setLoading(false);
      }
    };

    fetchVulnerabilities();
  }, []);

  function renderVulnerabilitiesByType(vulnerabilities) {
    // Group the vulnerabilities by type
    const vulnerabilitiesByType = vulnerabilities.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.type]) {
        accumulator[currentValue.type] = [];
      }
      accumulator[currentValue.type].push(currentValue);
      return accumulator;
    }, {});
  
    // Render the vulnerabilities by type
    const types = Object.keys(vulnerabilitiesByType);
    return types.map((type) => {
      return (
        <div key={type}>
          <h2>{type} vulnerabilities:</h2>
          <ul>
            {vulnerabilitiesByType[type].map((vulnerability) => {
              return (
                <li key={vulnerability.vuln_id}>
                  <h3>{vulnerability.description}</h3>
                  <p>File location: {vulnerability.file_location}</p>
                  <p>Line of code: {vulnerability.line_of_code}</p>
                  <p>Severity: {vulnerability.severity}</p>
                  <p>CVE ID: {vulnerability.cve_id}</p>
                  <p>Suggested fix: {vulnerability.suggested_fix}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  }

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