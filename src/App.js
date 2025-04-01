// src/App.js
import React from 'react';
import Chat from './components/Chat';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fashion Sustainability Chatbot</h1>
        <p>These are the only available brands to search: (Carnage, Crocodile, Dilly & Carlo, Emerald, FOA, GFlock, Jezza, Kelly Felder, Mimosa and Pepper Street)</p>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;