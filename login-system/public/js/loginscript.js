document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.querySelector('.sign-in form');
  const signUpForm = document.querySelector('.sign-up form');
  const container = document.getElementById('container');
  const signInButton = document.getElementById('login');  // Button for sign in toggle
  const signUpButton = document.getElementById('register'); // Button for sign up toggle

  // Toggle to Sign Up form
  signUpButton.addEventListener('click', () => {
    container.classList.add('active');  // Adds 'active' class to show sign-up form
  });

  // Toggle to Sign In form
  signInButton.addEventListener('click', () => {
    container.classList.remove('active');  // Removes 'active' class to show sign-in form
  });

  // Sign up form submission
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = signUpForm.querySelector('input[placeholder="Name"]').value;
    const email = signUpForm.querySelector('input[placeholder="Email"]').value;
    const password = signUpForm.querySelector('input[placeholder="Password"]').value;

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.msg}`);
        return;
      }

      const data = await res.json();
      alert(data.msg);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });

  // Sign in form submission
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signInForm.querySelector('input[placeholder="Email"]').value;
    const password = signInForm.querySelector('input[placeholder="Password"]').value;

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.msg}`);
        return;
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        window.location.href = '/dashboard'; // Ensure this route exists
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
});
