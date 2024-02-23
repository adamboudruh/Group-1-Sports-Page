// Define an asynchronous function to handle the signup form submission
const signUpFormHandler = async (event) => {
  console.info("HELLOOO");
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the username, email, and password values from the signup form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.info(`Creating new account with username ${username}, email ${email}, and pword ${password}`);

  // Check if username, email, and password are provided
  if (username && email && password) {
    // Send a POST request to the '/api/users/signup' endpoint with the signup data
    const response = await fetch('/api/users/signup', {
      method: 'POST', // Use the POST method
      body: JSON.stringify({ username, email, password }), // Convert data to JSON format
      headers: { 'Content-Type': 'application/json' }, // Set request headers
    });

    // Check if the response is ok (status code 200-299)
    if (response.ok) {
      // If signup is successful, redirect the user to the homepage
      document.location.replace('/');
    } else {
      // If signup fails, display an alert message
      alert('Failed to sign up');
    }
  }
};

// Add an event listener to the signup form submit event
document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);
  