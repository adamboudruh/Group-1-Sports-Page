// require('dotenv').config();
// const axios = require('axios');

window.onload = function() {
  console.log("Page has loaded!");
};

// Define an asynchronous function to handle the comment form submission
const commentFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("BUTTON CLICKED!");
  // Get the comment value from the comment form
  const comment = document.querySelector('#comment').value.trim();
  // const baseURL = process.env.NODE_ENV === 'production' 
  //            ? 'http://localhost:3001' 
  //            : 'https://pacific-shelf-77218-ba08c8175600.herokuapp.com';
  // Check if comment is provided
  if (comment) {
    // Extract the game ID from the URL
    const gameId = window.location.pathname.split('/').pop();

    // Send a POST request to the endpoint with the comment data
    // console.log(`Posting comment ${comment} under game ${gameId}`);
    // const response = await axios.post(`/api/odds/${gameId}/comments`, {
    //   comment: comment
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    console.log(JSON.stringify({ comment }));

    const response = await fetch(`/api/odds/${gameId}/comments`, {
      method: 'POST', // Use the POST method
      body: JSON.stringify({comment}), // Convert data to JSON format
      headers: { 'Content-Type': 'application/json' }, // Set request headers
    });

    // Check if the response is ok
    if (response.ok) {
      // If posting comment is successful, reload the page
      console.log("Your comment has been posted");
    } else {
      // If posting comment fails, display an alert message
      alert('Failed to post comment');
    }

    // Check if the response is ok
    if (response.ok) {
      // If posting comment is successful, reload the page
      //document.location.reload();
    } else {
      // If posting comment fails, display an alert message
      alert('Failed to post comment');
    }
  }
};

// Add an event listener to the comment form submit event
document.querySelector('#post-comment').addEventListener('click', commentFormHandler);