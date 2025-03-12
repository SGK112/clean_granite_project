document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const subscriptionPlan = document.getElementById('subscriptionPlan').value;
        
        try {
          const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, subscriptionPlan })
          });
          const result = await response.json();
          const signupResult = document.getElementById('signupResult');
          if (response.ok) {
            signupResult.textContent = "Signup successful!";
            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          } else {
            signupResult.textContent = "Error: " + (result.error || "Unknown error");
          }
        } catch (error) {
          console.error('Error signing up:', error);
        }
      });
    }
  });
  