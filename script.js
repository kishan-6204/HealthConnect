const doctors = [
    { name: 'Dr. Smith', specialty: 'Cardiologist', location: 'Hyderabad', rating: 5 },
    { name: 'Dr. Johnson', specialty: 'Dermatologist', location: 'Hyderabad', rating: 4 },
    { name: 'Dr. Patel', specialty: 'General Physician', location: 'Bangalore', rating: 3 },
    { name: 'Dr. Gupta', specialty: 'Pediatrician', location: 'Mumbai', rating: 5 },
    // Add more doctors as needed
];

function filterBySpecialty() {
    const specialty = document.getElementById('specialty').value.toLowerCase();
    const filteredDoctors = doctors.filter(doctor => doctor.specialty.toLowerCase().includes(specialty));
    displayResults(filteredDoctors);
}

function filterByProcedure() {
    // Implement procedure filter if data available, similar to specialty
    alert('Filtering by Procedure');
}

function filterByCondition() {
    // Implement condition filter if data available, similar to specialty
    alert('Filtering by Condition');
}

function findAllProviders() {
    displayResults(doctors);
}

function listYourPractice() {
    alert('Listing Your Practice');
}

function search() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const location = document.getElementById('location').value.toLowerCase();
    const specialty = document.getElementById('specialty').value.toLowerCase();
    const rating = document.getElementById('rating').value;
    const distance = document.getElementById('distance').value;

    let filteredDoctors = doctors;

    if (query) {
        filteredDoctors = filteredDoctors.filter(doctor =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query)
        );
    }

    if (location) {
        filteredDoctors = filteredDoctors.filter(doctor =>
            doctor.location.toLowerCase().includes(location)
        );
    }

    if (specialty) {
        filteredDoctors = filteredDoctors.filter(doctor =>
            doctor.specialty.toLowerCase().includes(specialty)
        );
    }

    if (rating) {
        filteredDoctors = filteredDoctors.filter(doctor =>
            doctor.rating == rating
        );
    }

    // Distance filtering logic can be implemented based on user's location and doctor's location

    displayResults(filteredDoctors);
}

function displayResults(doctors) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';

    if (doctors.length === 0) {
        resultsSection.innerHTML = '<p>No doctors found</p>';
        return;
    }

    doctors.forEach(doctor => {
        const doctorElement = document.createElement('div');
        doctorElement.classList.add('doctor');
        doctorElement.innerHTML = `
            <h3>${doctor.name}</h3>
            <p>Specialty: ${doctor.specialty}</p>
            <p>Location: ${doctor.location}</p>
            <p>Rating: ${doctor.rating} Stars</p>
        `;
        resultsSection.appendChild(doctorElement);
    });
}
