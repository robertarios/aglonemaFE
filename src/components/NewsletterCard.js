import React from 'react';
import logo from '../assets/logo.png';

const NewsletterCard = () => {
  return (
    <>
      <style>
        {`
          /* Media query for smaller screens */
          @media (max-width: 768px) {
            .newsletter-container {
              flex-direction: column; /* Stack items vertically */
              text-align: center;
            }
            .newsletter-text {
              text-align: center; /* Center-align text on smaller screens */
              padding-right: 0; /* Remove padding */
              margin-bottom: 20px; /* Add spacing between text and input */
            }
            .newsletter-input-container {
              justify-content: center; /* Center-align input and button */
            }
          }
        `}
      </style>
      
      <div
        className="newsletter-container"
        style={{
          backgroundColor: '#62AA99',
          padding: '30px',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '-60px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '80%',
          margin: '0 auto',
          transform: 'translateY(-30%)',
        }}
      >
        {}
        <div className="newsletter-text" style={{ flex: 1, textAlign: 'left', color: 'white', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '34px', margin: 0 }}>Dapatkan Berita Terbaru</h1>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Jadi yang pertama tahu info terbaru soal fitur, promosi, dan berbagai update lainnya dari AgloStok
          </p>
        </div>

        {}
        <div
          className="newsletter-input-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: '5px 10px',
          }}
        >
          <input
            type="email"
            placeholder="Masukkan email kamu"
            style={{
              color: 'black',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              borderRadius: '20px',
              width: '200px',
              marginRight: '10px',
            }}
          />
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: '#1b423b',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Berlangganan Sekarang
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsletterCard;
