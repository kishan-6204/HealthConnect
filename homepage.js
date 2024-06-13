import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAKYY2XuJjQ4AhJKobIl_RnvuSmpr2IXAo",
    authDomain: "login-form-76fa2.firebaseapp.com",
    projectId: "login-form-76fa2",
    storageBucket: "login-form-76fa2.appspot.com",
    messagingSenderId: "906743815132",
    appId: "Y1:906743815132:web:650241e4133c28043c4d19"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })

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
    if (!query && !location && !specialty && !rating && !distance) {
        alert("Please enter at least one search criterion.");
        return;
    }

    // Simulating a search result
    const resultsDiv = document.getElementById('results');
    const doctors = [
        { name: 'Dr. Prakash', specialty: 'Cardiologist', distance: 5, rating: 4.5 },
        { name: 'Dr. Surbhi Chouhan', specialty: 'Dermatologist', distance: 10, rating: 4 },
        { name: 'Dr. junaid', specialty: 'Pediatrician', distance: 8, rating: 3.2 },
        { name: 'Dr. Kiran', specialty: 'Neurologist', distance: 3, rating: 4.8 }
        // Add more doctors as needed
    ];
    
    // Function to generate HTML content based on the doctors array
    function displayDoctors(doctors) {
        let content = '';
        doctors.forEach(doctor => {
            if (doctor.rating >= 4) { // Condition to filter doctors, modify as needed
                content += `
                    <div class="result-item">
                        ${doctor.name} - ${doctor.specialty} - ${doctor.distance} kms away - ${doctor.rating} stars
                    </div>
                `;
            } else {
                content += `
                    <div class="result-item">
                        ${doctor.name} - ${doctor.specialty} - ${doctor.distance} kms away - No rating available
                    </div>
                `;
            }
        });
        resultsDiv.innerHTML = content;
    }
    
    // Call the function to display doctors
    displayDoctors(doctors);
}
