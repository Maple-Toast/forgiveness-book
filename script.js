const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCvRDR4yV5YuuTJDCag_Z4hNi4jRIc9Udc",
  authDomain: "forgivenessbook-emails.firebaseapp.com",
  databaseURL: "https://forgivenessbook-emails-default-rtdb.firebaseio.com",
  projectId: "forgivenessbook-emails",
  storageBucket: "forgivenessbook-emails.firebasestorage.app",
  messagingSenderId: "32943094811",
  appId: "1:32943094811:web:9fb97c017390480db5ccbe",
  measurementId: "G-8FTRNQCCPF"
})

const db = firebaseApp.firestore()

const preorderBtn = document.getElementById('preorderBtn')
const formHolder = document.getElementById('formHolder')

const preorderForm = `
<form class="mt-3 ms-2 preorder-form" id="preOrderForm">
  <div class="mb-3">
  <div class="mb-3">
    <label for="nameInput" class="form-label">First Name/Last Name</label>
    <input type="text" class="form-control" id="nameInput" placeholder="John Doe" required>
  </div>
    <label for="formEmail" class="form-label">Email address</label>
    <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="example@example.com" required>
    <div id="emailHelp" class="form-text"><strong>Data Disclosure</strong>:
By joining the waitlist, you consent to Yisroel Bernath, Chabad NDG, and its affiliates collecting and storing your name and email for the purpose of contacting you about this book and related updates or events. Your information is transmitted securely via SSL and will not be shared with third parties. All data is the property of Yisroel Bernath, Chabad NDG, and its affiliates, and will be used solely for their communications.</div>
  </div>
  
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="consentCheck" required>
    <label class="form-check-label" for="consentCheck"><strong>I consent to the Data Disclosure</strong></label>
  </div>
  <div class="d-flex justify-content-center justify-content-xl-start"><button type="submit" class="btn preorder-btn upperbold">Submit</button></div>
</form>
`

preorderBtn.addEventListener('click', () => {
  formHolder.innerHTML = preorderForm
  preorderBtn.disabled = true

  // attach submit handler to the newly injected form
  const form = document.getElementById('preOrderForm')
  if (form) {
    form.addEventListener('submit', register)
  }
})

const register = (e) => {
  e.preventDefault()
  const name = document.getElementById('nameInput').value
  const email = document.getElementById('emailInput').value
  console.log(`Name: ${name}, Email: ${email}`)


  if (name.length > 0 && email.length > 0) {
    db.collection("preorders").add({
      email: email,
      name: name
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    formHolder.innerHTML = `<div class="mt-3 ms-2"><h5>Thank you for joining the waitlist! We'll be in touch soon.</h5></div>`
  } else if (document.getElementById('consentCheck').checked === false) {
    alert('You must consent to the Data Disclosure to proceed.')
  }
  
  else {
    alert('Please fill in all fields.')
  }

}

