const form = document.getElementById("patientForm");

const dateInput = document.getElementById("date");
const patientFirstNameInput = document.getElementById("patientFirstName");
const patientLastNameInput = document.getElementById("patientLastName");
const dobInput = document.getElementById("dob");
const pidInput = document.getElementById("patientId");
const refphysicianFirstNameInput = document.getElementById("refPhysicianFirstName");
const refphysicianLastNameInput = document.getElementById("refPhysicianLastName");
const phoneInput = document.getElementById("phoneNumber");


const dateError = document.getElementById("dateError");
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const dobError = document.getElementById("dobError");
const pidError = document.getElementById("pidError");
const refphysicianFirstNameError = document.getElementById("refPhysicianFirstNameError");
const refphysicianLastNameError = document.getElementById("refPhysicianLastNameError");
const phoneError = document.getElementById("phoneError");


////////////////  DATE VALIDATION       /////////////////////

 function validateDate() {
  const dateValue = dateInput.value;

   if (dateValue === "") {
    dateError.textContent = "Date is required";
    return false;
  }


  if (new Date(dateValue) > new Date()) {
    dateError.textContent = "Date cannot be in the future";
    return false;
  }

  dateError.textContent = "";
  return true;
}

//////////    NAME VALIDATION   ////////////////////
 function validateNameLive(input, errorElement) {
  const value = input.value.trim();
  const regex = /^[A-Za-z\s]+$/;


  if (value === "") {
    errorElement.textContent = "Name is required";
    return false;
  }


  if (!regex.test(value)) {
    errorElement.textContent = "Name should contain only letters";
    return false;
  }

  
  if (value.length < 3) {
    errorElement.textContent = "Name must be at least 3 characters";
    return false;
  }

  errorElement.textContent = "";
  return true;
}

///////////     DOB VALIDATION   ////////////////
    function validateDOB() {
  const dobValue = dobInput.value;

   if (dobValue === "") {
    dobError.textContent = "Date of Birth is required";
    return false;
  }

  if (new Date(dobValue) > new Date()) {
    dobError.textContent = "DOB cannot be in the future";
    return false;
  }

  dobError.textContent = "";
  return true;
}

//////////////// PHONE NUMBER VALIDATION    ////////////////
 function validatePhone(){
  const Phonevalue = phoneInput.value;

  if (Phonevalue === "") {
    phoneError.textContent = "Phone Number is required";
    return false;
  }

 if(Phonevalue.length<10){
  phoneError.textContent = "require 10 digits";
  return false;
 }
 phoneError.textContent = "";
  return true;
 }

  dateInput.addEventListener("change", validateDate);
  dobInput.addEventListener("change", validateDOB);
  phoneInput.addEventListener("change",validatePhone);

  patientFirstNameInput.addEventListener("input", () =>
  validateNameLive(patientFirstNameInput, firstNameError)
);

patientLastNameInput.addEventListener("input", () =>
  validateNameLive(patientLastNameInput, lastNameError)
);

refphysicianFirstNameInput.addEventListener("input", () =>
  validateNameLive(refphysicianFirstNameInput, refphysicianFirstNameError)
);

refphysicianLastNameInput.addEventListener("input", () =>
  validateNameLive(refphysicianLastNameInput, refphysicianLastNameError)
);

  

  form.addEventListener("submit", (e) => {
    e.preventDefault();

  const isValid =
      validateDate()&&
      validateDOB()
      validateNameLive(patientFirstNameInput, firstNameError) &&
    validateNameLive(patientLastNameInput, lastNameError) &&
    validateNameLive(refphysicianFirstNameInput, refphysicianFirstNameError) &&
    validateNameLive(refphysicianLastNameInput, refphysicianLastNameError)&&
    validatePhone(); 
      
      if (isValid) {
      alert("Patient registered successfully!");
      form.reset();
    }
    
  });