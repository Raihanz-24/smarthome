import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // State untuk status relay (default semua relay OFF)
  const [relayStatus, setRelayStatus] = useState(Array(8).fill(false));

  // Fungsi untuk mengirim pesan ke bot Telegram
  const sendMessageToTelegram = (message) => {
    const botToken = process.env.REACT_APP_BOT_TOKEN;  // Mendapatkan token bot dari file .env
    const chatId = process.env.REACT_APP_CHAT_ID;      // Mendapatkan chat ID dari file .env
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;  // URL API Telegram

    // Mengirim permintaan POST ke Telegram API
    axios.post(url, {
      chat_id: chatId,
      text: message,  // Pesan yang dikirim ke bot Telegram
    })
    .then(response => {
      console.log('Pesan berhasil dikirim:', response);
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat mengirim pesan:', error);
    });
  };

  // Fungsi untuk toggle status relay dan mengirim pesan ke Telegram
  const toggleRelay = (relayIndex) => {
    // Menyalin status relay dan mengubah status relay yang dipilih
    const newStatus = [...relayStatus];
    newStatus[relayIndex] = !newStatus[relayIndex];  // Toggle status (ON/OFF)
    setRelayStatus(newStatus);  // Update state status relay

    // Tentukan status relay (ON/OFF)
    const relayState = newStatus[relayIndex] ? 'ON' : 'OFF';

    // Kirim pesan ke Telegram tentang status relay
    sendMessageToTelegram(`Relay ${relayIndex + 1} sekarang ${relayState}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Smart Home Controller</h1>
      <div>
        {/* Render semua button relay */}
        {relayStatus.map((status, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <button
              onClick={() => toggleRelay(index)}  // Fungsi untuk toggle relay
              style={{
                padding: '15px 30px',
                backgroundColor: status ? 'green' : 'red',  // Hijau jika ON, Merah jika OFF
                color: 'white',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',  // Efek transisi saat status berubah
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
