import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // State untuk status relay
  const [relayStatus, setRelayStatus] = useState(Array(8).fill(false));

  // Fungsi untuk mengirim pesan ke bot Telegram
  const sendMessageToTelegram = (message) => {
    const botToken = process.env.REACT_APP_BOT_TOKEN;
    const chatId = process.env.REACT_APP_CHAT_ID;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    axios.post(url, {
      chat_id: chatId,
      text: message,
    })
    .then(response => {
      console.log('Message sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  // Fungsi untuk mengubah status relay dan mengirim pesan ke Telegram
  const toggleRelay = (relayIndex) => {
    const newStatus = [...relayStatus];
    newStatus[relayIndex] = !newStatus[relayIndex];
    setRelayStatus(newStatus);

    // Kirim pesan ke Telegram saat relay diubah
    const relayState = newStatus[relayIndex] ? 'ON' : 'OFF';
    sendMessageToTelegram(`Relay ${relayIndex + 1} is now ${relayState}`);
  };

  return (
    <div>
      <h1>Smart Home Controller</h1>
      <div>
        {relayStatus.map((status, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <button
              onClick={() => toggleRelay(index)}
              style={{
                padding: '10px',
                backgroundColor: status ? 'green' : 'red',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Relay {index + 1}: {status ? 'ON' : 'OFF'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
