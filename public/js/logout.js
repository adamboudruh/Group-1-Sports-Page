// Define an asynchronous function to handle the logout process
const logout = async () => {
  // Send a POST request to the '/api/users/logout' endpoint to log the user out
  const response = await fetch('/api/users/logout', {
    method: 'POST', // Use the POST method
    headers: { 'Content-Type': 'application/json' }, // Set request headers
  });

  // Check if the response is ok (status code 200-299)
  if (response.ok) {
    // If logout is successful, redirect the user to the login page
    document.location.replace('/login');
  } else {
    // If logout fails, display an alert message
    alert('Failed to log out');
  }
};

// Add an event listener to the logout button click event
// document.querySelector('#logout').addEventListener('click', logout);

// Add an event listener to the logout link in the navbar
document.querySelector('#logout-link').addEventListener('click', logout);