console.log("main.js is loaded!");

// Fetch stone data from the back-end (only one copy is needed)
fetch('/api/stones')
  .then(response => response.json())
  .then(data => {
    console.log('Stones:', data);
    const stonesContainer = document.getElementById('stonesContainer');
    if (stonesContainer) {
      data.forEach(stone => {
        const p = document.createElement('p');
        p.textContent = `${stone.vendor} - ${stone.color} (${stone.thickness}cm) - $${stone.basePrice}/sqft, Slab: ${stone.slabSize} sqft`;
        stonesContainer.appendChild(p);
      });
    }
  })
  .catch(err => console.error('Error fetching stones:', err));


// Add interactive sign-up form functionality
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('signupUsername').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const result = await response.json();
        const signupResult = document.getElementById('signupResult');
        if (signupResult) {
          if (response.ok) {
            signupResult.textContent = "Signup successful!";
          } else {
            signupResult.textContent = "Error: " + (result.error || "Unknown error");
          }
        } else {
          console.error('Signup result element not found');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    });
  }
});
