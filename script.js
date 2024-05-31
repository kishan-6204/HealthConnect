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
        <div class="result-item">Dr. John Doe - Cardiologist - 5 miles away - 4.5 stars</div>
        <div class="result-item">Dr. Jane Smith - Dermatologist - 10 miles away - 4 stars</div>
        <!-- Add more simulated results as needed -->
    `;
}
