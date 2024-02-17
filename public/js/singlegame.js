// Define an asynchronous function to handle the comment form submission
const commentFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the comment value from the comment form
  const comment = document.querySelector('#comment').value.trim();

  // Check if comment is provided
  if (comment) {
    // Extract the game ID from the URL
    const gameId = window.location.pathname.split('/').pop();

    // Send a POST request to the '/api/comments/:gameId/post' endpoint with the comment data
    const response = await fetch(`/api/comments/${gameId}/post`, {
      method: 'POST', // Use the POST method
      body: JSON.stringify({ comment }), // Convert data to JSON format
      headers: { 'Content-Type': 'application/json' }, // Set request headers
    });

    // Check if the response is ok
    if (response.ok) {
      // If posting comment is successful, reload the page
      document.location.reload();
    } else {
      // If posting comment fails, display an alert message
      alert('Failed to post comment');
    }
  }
};

// Add an event listener to the comment form submit event
document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);