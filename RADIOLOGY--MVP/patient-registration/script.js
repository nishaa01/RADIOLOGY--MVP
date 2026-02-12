console.log("Script loaded!"); // 

// Get all inputs
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

const submitBtn = document.getElementById("submitBtn");

// Validation functions
function validateDateField(input, errorElement, label) {
  if (!input || input.value === "") {
    if (errorElement) errorElement.textContent = `${label} is required`;
    return false;
  }
  if (new Date(input.value) > new Date()) {
    if (errorElement) errorElement.textContent = `${label} cannot be in the future`;
    return false;
  }
  if (errorElement) errorElement.textContent = "";
  return true;
}

function validateName(input, errorElement) {
  if (!input) return false;
  const value = input.value.trim();
  const regex = /^[A-Za-z\s]+$/;

  if (value === "") {
    if (errorElement) errorElement.textContent = "Name is required";
    return false;
  }
  if (!regex.test(value)) {
    if (errorElement) errorElement.textContent = "Name should contain only letters";
    return false;
  }
  if (value.length < 3) {
    if (errorElement) errorElement.textContent = "Name must be at least 3 characters";
    return false;
  }
  if (errorElement) errorElement.textContent = "";
  return true;
}

function validatePhone() {
  if (!inputs.phone) return false;
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

function validatePID() {
  if (!inputs.pid || inputs.pid.value === "") {
    if (errors.pid) errors.pid.textContent = "PID is required";
    return false;
  }
  if (errors.pid) errors.pid.textContent = "";
  return true;
}

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

  if (submitBtn) submitBtn.disabled = !isValid;
}

// Add event listeners
if (inputs.date) inputs.date.addEventListener("change", checkFormValidity);
if (inputs.dob) inputs.dob.addEventListener("change", checkFormValidity);
if (inputs.phone) inputs.phone.addEventListener("input", checkFormValidity);
if (inputs.pid) inputs.pid.addEventListener("input", checkFormValidity);
if (inputs.firstName) inputs.firstName.addEventListener("input", checkFormValidity);
if (inputs.lastName) inputs.lastName.addEventListener("input", checkFormValidity);
if (inputs.refFirstName) inputs.refFirstName.addEventListener("input", checkFormValidity);
if (inputs.refLastName) inputs.refLastName.addEventListener("input", checkFormValidity);

// FORM SUBMIT - using querySelector instead of getElementById
const form = document.querySelector('form');
console.log("Form element:", form); // ✅ Check if form is found

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("🚀 FORM SUBMITTED!"); // ✅ You MUST see this

    // Create payload
    const payload = {
      registration_date: inputs.date.value,
      first_name: inputs.firstName.value.trim(),
      last_name: inputs.lastName.value.trim(),
      gender: document.getElementById("gender").value,
      phone_number: inputs.phone.value,
      date_of_birth: inputs.dob.value,
      patient_id: inputs.pid.value,
      referring_physician_first_name: inputs.refFirstName.value.trim(),
      referring_physician_last_name: inputs.refLastName.value.trim()
    };

    console.log("📤 Sending:", payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      console.log("📥 Response status:", response.status);

      const data = await response.json();
      console.log("📥 Response data:", data);

      alert(data.message || "Patient registered! ✅");
      form.reset();
      if (submitBtn) submitBtn.disabled = true;

    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error: " + err.message);
    }
  });
} else {
  console.error("❌ FORM NOT FOUND!");
}
// TEST FUNCTION - bypasses validation
function testSubmit() {
  console.log("🧪 Test submit clicked!");
  
  const payload = {
    registration_date: inputs.date.value || "2025-01-15",
    first_name: inputs.firstName.value || "Test",
    last_name: inputs.lastName.value || "User",
    gender: document.getElementById("gender").value || "Male",
    phone_number: inputs.phone.value || "1234567890",
    date_of_birth: inputs.dob.value || "1990-01-01",
    patient_id: inputs.pid.value || "TEST123",
    referring_physician_first_name: inputs.refFirstName.value || "Dr",
    referring_physician_last_name: inputs.refLastName.value || "Smith"
  };

  console.log("📤 Sending:", payload);

  fetch("http://127.0.0.1:8000/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    console.log("✅ Success:", data);
    alert(data.message);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    alert("Error: " + err.message);
  });
}