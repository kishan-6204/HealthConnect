function searchDoctors() {
    // Placeholder for search function
    const query = document.getElementById('search-query').value;
    const location = document.getElementById('location').value;
    const specialty = document.getElementById('specialty').value;
    const rating = document.getElementById('rating').value;
    const distance = document.getElementById('distance').value;

    console.log("Search Query:", query);
    console.log("Location:", location);
    console.log("Specialty:", specialty);
    console.log("Rating:", rating);
    console.log("Distance:", distance);

    // Simulating a search result
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="result-item">Dr. Prakash - Cardiologist - 5 km away - 4.5 stars</div>
        <div class="result-item">Dr. Surbhi chouhan - Dermatologist - 10 km away - 4 stars</div>
        <!-- Add more simulated results as needed -->
    `;
    function showLoginForm() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    }
    
    function showRegisterForm() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    }
    
    function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
    
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Login successful');
              } else {
                  alert('Login failed');
              }
          });
    }
    
    function register() {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
    
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Registration successful');
              } else {
                  alert('Registration failed');
              }
          });
    }
    
}
