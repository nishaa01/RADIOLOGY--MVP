const nameInput = document.getElementById("patientName");
const nameError = document.getElementById("nameError");

 function validateName() {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(nameInput.value.trim())) {
      nameError.textContent = "Name should contain only letters";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

    function validateDate(inputId, errorId, isDOB = false) {
    const value = document.getElementById(inputId).value;
    if (!value) {
      showError(errorId, "Date is required");
      return false;
    }

    if (isDOB && new Date(value) > new Date()) {
      showError(errorId, "DOB cannot be in the future");
      return false;
    }

    clearError(errorId);
    return true;
  }

  nameInput.addEventListener("input", validateName)&&
   validateDate("dob", "dobError", true);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

  const isValid =
      validateName();
      if (isValid) {
      alert("Patient registered successfully!");
      form.reset();
    }
    
  });