const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
    if (comment) {
      const gameId = window.location.pathname.split('/').pop();
      const response = await fetch(/api/comments/${gameId}/post, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment');
      }
    }
  };
  
  document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);