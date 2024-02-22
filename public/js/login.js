const loginFormHandler = async (event) => {

  event.preventDefault();

 
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

const buttons = document.querySelectorAll('.game-button');
buttons.forEach(button => {
  button.addEventListener('click', async () => {
    let id = this.getAttribute('data-id');
    const response = await fetch(`/api/game/:${id}`);
    if (response.ok) { console.log('Success! Taken to that game`s page') }
    else alert("ERROR! Idk what happened");
  })
})

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
