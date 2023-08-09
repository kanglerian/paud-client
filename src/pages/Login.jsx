import { useState } from 'react';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const response = await axios.post(
      'http://localhost:5000/login',
      { username: 'kanglerian', password: 'lerian123' },
      { withCredentials: true }
    );
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/refresh',
        { refreshToken },
        { withCredentials: true }
      );
      setAccessToken(response.data.accessToken);
      setMessage('');
    } catch (error) {
      setMessage('Failed to refresh token');
    }
  };

  const setCookie = async () => {
    try {
      const serverEndpoint = 'http://localhost:5000/set-cookie';
      await axios.get(serverEndpoint, {
        withCredentials: true, // Izinkan mengirim cookie
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      setMessage('Failed to refresh token');
    }
  };

  const getCookie = async () => {
    try {
      const serverEndpoint = 'http://localhost:5000/get-cookie';
      await axios.get(serverEndpoint, {
        withCredentials: true, // Izinkan mengirim cookie
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    } catch (error) {
      setMessage('Failed to refresh token');
    }
  };

  const handleProtected = async () => {
    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Unauthorized');
    }
  };


  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleProtected}>Access Protected Route</button>
      <button onClick={handleRefresh}>Refresh Token</button>
      <button onClick={setCookie}>set</button>
      <button onClick={getCookie}>get</button>
      <p>Access Token: {accessToken}</p>
      <p>{message}</p>
    </div>
  );
}

export default App;