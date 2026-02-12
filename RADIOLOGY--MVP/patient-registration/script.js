const form = document.getElementById("patientForm");

const inputs = {
  date: document.getElementById("date"),
  dob: document.getElementById("dob"),
  phone: document.getElementById("phoneNumber"),
  pid: document.getElementById("patientId"),

  firstName: document.getElementById("patientFirstName"),
  lastName: document.getElementById("patientLastName"),
  refFirstName: document.getElementById("refPhysicianFirstName"),
  refLastName: document.getElementById("refPhysicianLastName"),
};

const errors = {
  date: document.getElementById("dateError"),
  dob: document.getElementById("dobError"),
  phone: document.getElementById("phoneError"),
  pid: document.getElementById("pidError"),

  firstName: document.getElementById("firstNameError"),
  lastName: document.getElementById("lastNameError"),
  refFirstName: document.getElementById("refPhysicianFirstNameError"),
  refLastName: document.getElementById("refPhysicianLastNameError"),
};

////////////////  DATE VALIDATION       /////////////////////

 function validateDateField(input, errorElement, label) {
  if (input.value === "") {
    errorElement.textContent = `${label} is required`;
    return false;
  }

  if (new Date(input.value) > new Date()) {
    errorElement.textContent = `${label} cannot be in the future`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}


//////////    NAME VALIDATION   ////////////////////
 function validateName(input, errorElement) {
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
function validatePhone() {
  const value = inputs.phone.value;

  if (value === "") {
    errors.phone.textContent = "Phone Number is required";
    return false;
  }

  if (value.length !== 10) {
    errors.phone.textContent = "Phone number must be 10 digits";
    return false;
  }

  errors.phone.textContent = "";
  return true;
}


 //////////////////////      PID VALIDATION    /////////////////////////
function validatePID() {
  if (inputs.pid.value === "") {
    errors.pid.textContent = "PID is required";
    return false;
  }

  errors.pid.textContent = "";
  return true;
}

///////////////////////
const submitBtn = document.getElementById("submitBtn");

function checkFormValidity() {
  const isValid =
    validateDateField(inputs.date, errors.date, "Date") &&
    validateDateField(inputs.dob, errors.dob, "Date of Birth") &&
    validateName(inputs.firstName, errors.firstName) &&
    validateName(inputs.lastName, errors.lastName) &&
    validateName(inputs.refFirstName, errors.refFirstName) &&
    validateName(inputs.refLastName, errors.refLastName) &&
    validatePhone() &&
    validatePID();

  submitBtn.disabled = !isValid;
}



inputs.date.addEventListener("change", () =>{
  validateDateField(inputs.date, errors.date, "Date")
checkFormValidity();

});

inputs.dob.addEventListener("change", () =>{
  validateDateField(inputs.dob, errors.dob, "Date of Birth")
  checkFormValidity();
});

inputs.phone.addEventListener("input", () => {
  validatePhone();
  checkFormValidity();
});
inputs.pid.addEventListener("input", () => {
  validatePID();
  checkFormValidity();
});


inputs.firstName.addEventListener("input", () =>{
  validateName(inputs.firstName, errors.firstName)
   checkFormValidity();
});

inputs.lastName.addEventListener("input", () =>{
  validateName(inputs.lastName, errors.lastName)
   checkFormValidity();
});

inputs.refFirstName.addEventListener("input", () =>{
  validateName(inputs.refFirstName, errors.refFirstName)
   checkFormValidity();
});

inputs.refLastName.addEventListener("input", () =>{
  validateName(inputs.refLastName, errors.refLastName)
   checkFormValidity();
});

/////////             creating objects            //////////////
function createPatientObject() {
  return {
    date: inputs.date.value,
    pid: inputs.pid.value,

    patient: {
      firstName: inputs.firstName.value.trim(),
      lastName: inputs.lastName.value.trim(),
      dob: inputs.dob.value,
      phone: inputs.phone.value
    },

    physician: {
      firstName: inputs.refFirstName.value.trim(),
      lastName: inputs.refLastName.value.trim()
    }
  };
}

/////////////////////////////////////////////
function mapToBackendPayload(frontendData) {
  return {
    registration_date: frontendData.date,
    first_name: frontendData.patient.firstName,
    last_name: frontendData.patient.lastName,
    gender: document.getElementById("gender").value,
    phone_number: frontendData.patient.phone,
    date_of_birth: frontendData.patient.dob,
    patient_id: frontendData.pid,
    referring_physician_first_name: frontendData.physician.firstName,
    referring_physician_last_name: frontendData.physician.lastName
  };
}

  
////////////////////////////////////////////////

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid =
    validateDateField(inputs.date, errors.date, "Date") &&
    validateDateField(inputs.dob, errors.dob, "Date of Birth") &&
    validateName(inputs.firstName, errors.firstName) &&
    validateName(inputs.lastName, errors.lastName) &&
    validateName(inputs.refFirstName, errors.refFirstName) &&
    validateName(inputs.refLastName, errors.refLastName) &&
    validatePhone() &&
    validatePID();

  if (!isValid) return;

  const frontendData = createPatientObject();
  const backendPayload = mapToBackendPayload(frontendData);

  try {
    const response = await fetch("http://127.0.0.1:8000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload)
    });

    const data = await response.json();
    alert(data.message || "Patient registered successfully ✅");

    form.reset();
    submitBtn.disabled = true;
  } catch (err) {
    console.error(err);
    alert("Backend error ❌");
  }
});

  
