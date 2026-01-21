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



inputs.date.addEventListener("change", () =>
  validateDateField(inputs.date, errors.date, "Date")
);

inputs.dob.addEventListener("change", () =>
  validateDateField(inputs.dob, errors.dob, "Date of Birth")
);

inputs.phone.addEventListener("input", validatePhone);
inputs.pid.addEventListener("input", validatePID);

inputs.firstName.addEventListener("input", () =>
  validateName(inputs.firstName, errors.firstName)
);

inputs.lastName.addEventListener("input", () =>
  validateName(inputs.lastName, errors.lastName)
);

inputs.refFirstName.addEventListener("input", () =>
  validateName(inputs.refFirstName, errors.refFirstName)
);

inputs.refLastName.addEventListener("input", () =>
  validateName(inputs.refLastName, errors.refLastName)
);

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
  
////////////////////////////////////////////////

  form.addEventListener("submit", (e) => {
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

  const patientData = createPatientObject();
  console.log(patientData); // 👈 SEE YOUR OBJECT

  alert("Patient registered successfully!");
  form.reset();
});
  
