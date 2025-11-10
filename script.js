const preorderBtn = document.getElementById('preorderBtn')
const formHolder = document.getElementById('formHolder')

const preorderForm = `
<form class="mt-3 preorder-form" id="preOrderForm">
  <div class="mb-3">
  <div class="mb-3">
    <label for="nameInput" class="form-label">First Name/Last Name</label>
    <input type="text" class="form-control" id="nameInput" placeholder="John Doe">
  </div>
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@example.com">
    <div id="emailHelp" class="form-text"><strong>Data Disclosure</strong>:
By joining the waitlist, you consent to Yisroel Bernath, Chabad NDG, and its affiliates collecting and storing your name and email for the purpose of contacting you about this book and related updates or events. Your information is transmitted securely via SSL and will not be shared with third parties. All data is the property of Yisroel Bernath, Chabad NDG, and its affiliates, and will be used solely for their communications.</div>
  </div>
  
  <!--<div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>-->
  <div class="d-flex justify-content-center justify-content-xl-start"><button type="submit" class="btn preorder-btn upperbold">Submit</button></div>
</form>
`

preorderBtn.addEventListener('click', () => {
    formHolder.innerHTML = preorderForm
    preorderBtn.disabled = true
})

