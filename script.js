// lazy script loader
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

let firebaseApp = null
let db = null

async function initFirebaseIfNeeded() {
  if (db) return db
  // load compat libs only when needed
  await loadScript('https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js')
  await loadScript('https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore-compat.js')

  if (!firebaseApp) {
    firebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyCvRDR4yV5YuuTJDCag_Z4hNi4jRIc9Udc",
      authDomain: "forgivenessbook-emails.firebaseapp.com",
      databaseURL: "https://forgivenessbook-emails-default-rtdb.firebaseio.com",
      projectId: "forgivenessbook-emails",
      storageBucket: "forgivenessbook-emails.firebasestorage.app",
      messagingSenderId: "32943094811",
      appId: "1:32943094811:web:9fb97c017390480db5ccbe",
      measurementId: "G-8FTRNQCCPF"
    })
  }
  db = firebaseApp.firestore()
  return db
}

document.addEventListener('DOMContentLoaded', () => {
  const preorderBtn = document.getElementById('preorderBtn')
  const formHolder = document.getElementById('formHolder')
  const formSubmitBtn = document.getElementById('formSubmit')

  // quick local check (no need to wait for window.onload)
  const preordered = localStorage.getItem('preordered')
  if (preordered && preorderBtn) preorderBtn.disabled = true

  // attach listener to existing or future form
  if (preorderBtn) {
    preorderBtn.addEventListener('click', () => {
      const form = document.getElementById('preOrderForm')
      if (form) form.addEventListener('submit', register)
    })
  }

  // if form already exists on load, attach handler
  const existingForm = document.getElementById('preOrderForm')
  if (existingForm) existingForm.addEventListener('submit', register)
})

// exported so inline handlers (if any) still work
async function register(e) {
  e.preventDefault()

  const name = document.getElementById('nameInput')?.value?.trim() || ''
  const email = document.getElementById('emailInput')?.value?.trim() || ''
  const consentChecked = document.getElementById('consentCheck')?.checked ?? true

  if (!name || !email) {
    alert('Please fill in all fields.')
    return
  }
  if (document.getElementById('consentCheck') && !consentChecked) {
    alert('You must consent to the Data Disclosure to proceed.')
    return
  }

  // initialize firebase only when we actually need to write
  try {
    await initFirebaseIfNeeded()
  } catch (err) {
    console.error('Firebase load/init failed', err)
    alert('Unable to submit right now. Please try again later.')
    return
  }

  const preorderBtn = document.getElementById('preorderBtn')
  const formSubmitBtn = document.getElementById('formSubmit')
  const formHolder = document.getElementById('formHolder')

  if (preorderBtn) preorderBtn.disabled = true
  if (formSubmitBtn) formSubmitBtn.disabled = true
  if (formHolder) formHolder.innerHTML = `<div class="mt-3 bg-success rounded p-1 ps-2 text-white"><h5>Thank you for joining the waitlist! We'll be in touch soon.</h5></div>`

  localStorage.setItem('preordered', 'true')

  db.collection("preorders").add({
    email: email,
    name: name
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error)
    })
}

// expose for inline usage if needed
window.register = register