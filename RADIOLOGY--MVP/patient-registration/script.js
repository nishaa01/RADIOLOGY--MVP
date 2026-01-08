const form = document.getElementById("patientForm");

const dateInput = document.getElementById("date");
const patientFirstNameInput = document.getElementById("patientFirstName");
const patientLastNameInput = document.getElementById("patientLastName");
const dobInput = document.getElementById("dob");
const pidInput = document.getElementById("patientId");

const dateError = document.getElementById("dateError");
const patientFirstNameError = document.getElementById("firstnameError");
const patientLastNameError = document.getElementById("lastnameError");
const dobError = document.getElementById("dobError");
const pidError = document.getElementById("pidError");

////////////////  DATE VALIDATION       /////////////////////

 function validateDate() {
  const dateValue = dateInput.value;

  if (!dateValue) {
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
 function validateFirstName() {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(patientFirstNameInput.value.trim())) {
      patientFirstNameError.textContent = "Name should contain only letters";
      return false;
    }
    patientFirstNameError.textContent = "";
    return true;
  }

   function validateLastName() {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(patientLastNameInput.value.trim())) {
      patientLastNameError.textContent = "Name should contain only letters";
      return false;
    }
    patientLastNameError.textContent = "";
    return true;
  }
///////////     DOB VALIDATION   ////////////////
    function validateDOB() {
  const dobValue = dobInput.value;

  if (!dobValue) {
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

/////////////////     PID VALIDATION      ///////////////////
function validatePID() {
  const pidValue = pidInput.value.trim();
  const pidRegex = /^PID\d{4}$/;

  if (!pidValue) {
    pidError.textContent = "Patient ID is required";
    return false;
  }

  if (!pidRegex.test(pidValue)) {
    pidError.textContent = "PID must be in format PID1234";
    return false;
  }

  pidError.textContent = "";
  return true;
}
  dateInput.addEventListener("change", validateDate);
  patientFirstNameInput.addEventListener("input", validateFirstName);
  patientLastNameInput.addEventListener("input", validateLastName);
  dobInput.addEventListener("change", validateDOB);
  pidInput.addEventListener("input", validatePID);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

  const isValid =
      validateDate()&&
      validateFirstName()&&
      validateLastName()&&
      validateDOB()&&
      validatePID();
      
      if (isValid) {
      alert("Patient registered successfully!");
      form.reset();
    }
    
  });