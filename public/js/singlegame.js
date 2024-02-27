// Define an asynchronous function to handle the comment form submission
const commentFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the comment value from the comment form
  const comment = document.querySelector('#comment').value.trim();
  
  // Check if comment is provided
  if (comment) {
    // Extract the game ID from the URL
    const gameId = window.location.pathname.split('/').pop();

    try {
      const response = await fetch(`/api/odds/${gameId}/comments`, {
        method: 'POST', // Use the POST method
        body: JSON.stringify({ comment }), // Convert data to JSON format
        headers: { 'Content-Type': 'application/json' }, // Set request headers
      });

      // Check if the response is ok
      if (response.ok) {
        // If posting comment is successful, reload the page
        location.reload();
      } else {
        // If posting comment fails, display an alert message
        alert('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    }
  }
};

// Define an asynchronous function to handle the delete button click event
const deleteHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the comment ID and user ID from the delete button's data attributes
  const commentID = event.target.dataset.id;
  const userID = event.target.dataset.user;

  try {
    // Send a DELETE request to delete the comment
    const response = await fetch(`/api/odds/delete/${userID}/${commentID}`, {
      method: 'DELETE', // Use the DELETE method
      headers: { 'Content-Type': 'application/json' }, // Set request headers
    });

    // Parse the response as JSON
    const data = await response.json();

    // Display a message based on the response
    alert(data.message);

    // If deletion is successful, reload the page
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    alert('Failed to delete comment');
  }
};

const editHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the comment ID and user ID from the edit button's data attributes
  const commentID = event.target.dataset.id;
  const userID = event.target.dataset.user;
  const gameId = window.location.pathname.split('/').pop();

  try {
    // Send a GET request to fetch the content of the selected comment
    const response = await fetch(`/api/odds/${commentID}/comments/${userID}`);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to fetch comment content');
    }
    // Parse the response as JSON
    const data = await response.json();
    console.log(data);

    // Display a prompt dialog box with the current content of the comment, allowing the user to edit it
    const editedComment = prompt("Edit your comment:", data.content);

    // If the user cancels or leaves the text box empty, do nothing
    if (editedComment === null || editedComment.trim() === "") {
      return;
    }
    
    // Send a PUT request to update the selected comment with the edited content
    const putResponse = await fetch(`/api/odds/${commentID}/comments/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: editedComment, gameId })
    });

    // Check if the response is ok
    if (!putResponse.ok) {
      throw new Error('Failed to update comment');
    }

    // Parse the response as JSON
    const putData = await putResponse.json();

    // Display a message based on the response
    alert(putData.message);

    // If update is successful, reload the page
    window.location.reload();
  } catch (error) {
    console.error('Error editing comment:', error);
    alert('Failed to edit comment');
  }
};

// Add event listeners when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Add event listener to the edit buttons
  document.querySelectorAll("#edit-button").forEach(function(button) {
    button.addEventListener("click", editHandler);
  });

  // Add event listener to the comment form submit event
  document.querySelector('#post-comment').addEventListener('click', commentFormHandler);

  // Add event listener to the delete buttons
  document.querySelectorAll("#delete-button").forEach(function(button) {
    button.addEventListener("click", deleteHandler);
  });
});