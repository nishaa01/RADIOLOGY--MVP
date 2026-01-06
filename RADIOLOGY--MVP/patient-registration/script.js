const form = document.getElementById("patientForm");

const nameInput = document.getElementById("patientName");
const dobInput = document.getElementById("dob");

const nameError = document.getElementById("nameError");
const dobError = document.getElementById("dobError");

//////////    NAME VALIDATION   ////////////////////
 function validateName() {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(nameInput.value.trim())) {
      nameError.textContent = "Name should contain only letters";
      return false;
    }
    nameError.textContent = "";
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


  nameInput.addEventListener("input", validateName);
  dobInput.addEventListener("change", validateDOB);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

  const isValid =
      validateName()&&
      validateDOB();
      
      if (isValid) {
      alert("Patient registered successfully!");
      form.reset();
    }
    
  });