// Function to handle game button click
const handleGameButtonClick = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Extract the game ID from the data attribute of the clicked button
    const gameId = event.target.dataset.id;
  
    // Redirect the user to the single game odds page
    window.location.href = /games/${gameId};
  };
  
  // Add event listeners to game buttons
  const gameButtons = document.querySelectorAll('.game-button');
  gameButtons.forEach(button => {
    button.addEventListener('click', handleGameButtonClick);
  });