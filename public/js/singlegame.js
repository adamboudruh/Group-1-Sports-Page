// Define an asynchronous function to handle the comment form submission
const commentFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("BUTTON CLICKED!");
  // Get the comment value from the comment form
  const comment = document.querySelector('#comment').value.trim();
  // Check if comment is provided
  if (comment) {
    // Extract the game ID from the URL
    const gameId = window.location.pathname.split('/').pop();
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

const deleteHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("BUTTON CLICKED!");
    const gameID = window.location.pathname.split('/').pop();
    const commentID = event.target.dataset.id;
    const userID = event.target.dataset.user;
      const response = await fetch(`/api/odds/delete/${gameID}/${userID}/${commentID}`, {
        method: 'DELETE', // Use the DELETE method
        headers: { 'Content-Type': 'application/json' }, // Set request headers
      }).then(response => response.json())
        .then(data => { alert(data.message) });
      ;
      // Check if the response is ok
      if (response.ok) {
        // If posting comment is successful, reload the page
        console.log("Your comment has been deleted");
        location.reload();
      } else {
        // If posting comment fails, display an alert message
        console.log('Failed to delete');
      }
};

// const editHandler = async (event) => {
//   event.preventDefault(); // Prevent the default form submission behavior
//   console.log("BUTTON CLICKED!");

//   const newText = prompt("Enter new comment");


//     const gameID = window.location.pathname.split('/').pop();
//     const commentID = event.target.dataset.id;
//     const userID = event.target.dataset.user;
//       const response = await fetch(`/api/odds/edit//${commentID}`, {
//         method: 'Put', // Use the DELETE method
//         body: JSON.stringify(newText);
//         headers: { 'Content-Type': 'application/json' }, // Set request headers
//       });
//       // Check if the response is ok
//       if (response.ok) {
//         // If posting comment is successful, reload the page
//         console.log("Your comment has been deleted");
//       } else {
//         // If posting comment fails, display an alert message
//         console.log('Failed to delete');
//       }
    
// };

// Add an event listener to the comment form submit event
document.querySelector('#post-comment').addEventListener('click', commentFormHandler);
document.querySelector('#delete-button').addEventListener('click', deleteHandler);
document.querySelector('#edit-button').addEventListener('click', editHandler);
//href='/api/odds/delete/{{this.game_id}}/comments/{{this.id}}'