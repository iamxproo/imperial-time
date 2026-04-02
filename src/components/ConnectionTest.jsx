import React, { useState, useEffect } from 'react';
import { checkBackendConnection, adminAPI, dashboardAPI } from '../services/api';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  const [loginStatus, setLoginStatus] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic connection
      const isConnected = await checkBackendConnection();
      setConnectionStatus(isConnected ? 'Connected' : 'Failed');
      
      if (isConnected) {
        // Test admin login
        try {
          const loginData = await adminAPI.login('samarthkarale21@gmail.com', 'Sam@2003');
          setLoginStatus('Login successful');
          localStorage.setItem('adminToken', loginData.token);
          
          // Test dashboard data
          const dashboard = await dashboardAPI.getOverview();
          setDashboardData(dashboard);
        } catch (error) {
          setLoginStatus('Login failed: ' + error.message);
        }
      }
    } catch (error) {
      setConnectionStatus('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Backend Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Connection Status:</strong> 
        <span style={{ color: connectionStatus === 'Connected' ? 'green' : 'red' }}>
          {connectionStatus}
        </span>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Login Status:</strong> 
        <span style={{ color: loginStatus.includes('successful') ? 'green' : 'red' }}>
          {loginStatus}
        </span>
      </div>
      
      {dashboardData && (
        <div style={{ marginBottom: '20px' }}>
          <strong>Dashboard Data:</strong>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(dashboardData, null, 2)}
          </pre>
        </div>
      )}
      
      <button onClick={testConnection} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Test Again
      </button>
    </div>
  );
};

export default ConnectionTest;
