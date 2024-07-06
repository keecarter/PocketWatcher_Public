import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import WeeklyExpenses from './Components/WeeklyExpenses';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Pocket Watcher</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Danfo&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="d-flex justify-content-center align-items-center vh-100"> {/* Centering container */}
        <div className="container-fluid" style={{width: '100vw'}}> {/* Ensure the container spans the full width */}

      <div>
        <header className="app-header">
          <h1 className="title">Pocket Watcher</h1>
        </header>
        <div className="emoji-container">
          <div className="emoji emoji-left">👀</div>
          <div className="emoji emoji-left">💰</div>
          <div className="emoji emoji-left">👀</div>
          <div className="emoji emoji-left">💰</div>
          <div className="emoji emoji-left">👀</div>
          <div className="emoji emoji-left">💰</div>
          <div className="emoji emoji-left">👀</div>
          <div className="emoji emoji-left">💰</div>
          <div className="emoji emoji-left">👀</div>
          <div className="emoji emoji-left">💰</div>
          <div className="emoji emoji-right">👀</div>
          <div className="emoji emoji-right">💰</div>
          <div className="emoji emoji-right">👀</div>
          <div className="emoji emoji-right">💰</div>
          <div className="emoji emoji-right">👀</div>
          <div className="emoji emoji-right">💰</div>
          <div className="emoji emoji-right">👀</div>
          <div className="emoji emoji-right">💰</div>
          <div className="emoji emoji-right">👀</div>
          <div className="emoji emoji-right">💰</div>
        </div>
        <WeeklyExpenses /> {/* Add WeeklyExpenses component here */}
      </div>
      </div>
      </div>
    </>
  );
}

export default App;
