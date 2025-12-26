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
  nameInput.addEventListener("input", validateName);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

  const isValid =
      validateName();
      if (isValid) {
      alert("Patient registered successfully!");
      form.reset();
    }
  });