const nameInput = document.getElementById("patientName");
const nameError = document.getElementById("nameError");

nameInput.addEventListener("input", () => {
  const regex = /^[A-Za-z\s]+$/;

  if (!regex.test(nameInput.value)) {
    nameError.textContent = "Name should contain only letters";
    nameError.style.color = "red";
  } else {
    nameError.textContent = "";
  }
});
