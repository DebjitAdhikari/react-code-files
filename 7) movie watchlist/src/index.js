import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from './StarRating';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxStarCount={5} message={["Terrible", "Bad", "Good",
      "Very Good","Amazing"]}></StarRating>
    <StarRating maxStarCount={5} color='red'></StarRating>
    <StarRating maxStarCount={10} color='blue' size='12'></StarRating> */}
  </React.StrictMode>
);


