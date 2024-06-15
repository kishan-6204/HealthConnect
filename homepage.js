document.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const location = document.getElementById('location').value.trim().toLowerCase();
            const query = document.getElementById('search-query').value.trim().toLowerCase();
            if(location) {
                console.log(`Location: ${location}, Query: ${query}`);
                fetchDoctors(location, query);
            } else {
                alert('Please enter a location.');
            }
        });
    } else {
        console.error('Search button not found!');
    }
});

function fetchDoctors(location, query) {
    fetch('doctors.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
            const filteredDoctors = data.filter(doctor => 
                doctor.location.toLowerCase().includes(location) && 
                (!query || doctor.specialty.toLowerCase().includes(query) || doctor.name.toLowerCase().includes(query))
            );
            console.log('Filtered Doctors:', filteredDoctors);
            displayResults(filteredDoctors);
        })
        .catch(error => console.error('Error fetching doctors:', error));
}

function displayResults(doctors) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (doctors.length === 0) {
        resultsContainer.innerHTML = '<p>No doctors found for the given location.</p>';
        return;
    }
    doctors.forEach(doctor => {
        const doctorDiv = document.createElement('div');
        doctorDiv.classList.add('doctor');
        doctorDiv.innerHTML = `
            <h3>${doctor.name}</h3>
            <p>Specialty: ${doctor.specialty}</p>
            <p>Experience: ${doctor.experience}</p>
            <p>Location: ${doctor.location}</p>
            <p>Clinic: ${doctor.clinic}</p>
            <p>Fee: ₹${doctor.fee} Consultation fee at clinic</p>
            ${doctor.rating ? `<p>Rating: ${doctor.rating}</p>` : ''}
            ${doctor.patientStories ? `<p>${doctor.patientStories}</p>` : ''}
        `;
        resultsContainer.appendChild(doctorDiv);
    });
}
