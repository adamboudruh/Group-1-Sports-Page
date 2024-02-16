const signUpFormHandler = async (event) => {

    event.preventDefault();
  
    const Username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
    
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ Username, Email, Password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpFormHandler);
  