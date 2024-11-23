hideExamSection();

function signUpStudentValidation() {
    // Save the sign up form
    const signupForm = document.getElementById("signupform");

    // Save the student data (first name and last name)
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;

    // Save the error message
    let errorMessage = document.getElementById("errormessage");

    // Form validation
    if (signupForm.checkValidity()) {
        signUpStudent();
    } else {
        if (firstName.length == 0 || lastName.length == 0) {
            errorMessage.textContent = "Error: All fields are mandatory.";
        } else if (firstName.length < 3 || lastName.length < 3 || firstName.length > 30 || lastName.length > 30) {
            errorMessage.textContent = "Error: The number of characters must be between 3 and 30, inclusive.";
        } else {
            errorMessage.textContent = "Error: incorrect input.";
        }
    }
}

function signUpStudent() {
    // Save the student data (first name and last name)
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;

    // Hide the sign up section
    const signupSection = document.getElementById("signup");
    signupSection.style.display = "none";

    // Show the welcome message
    let welcomeMessage = "Welcome to the ISTQB Exam, " + firstName + " " + lastName;
    document.getElementById("welcomemessage").textContent = welcomeMessage.toUpperCase();

    // Show the exam section
    showExamSection();
}

function hideExamSection() {
    // Save the exam section
    const examSection = document.getElementById("exam");

    // Hide the exam section
    examSection.style.display = "none";
}

function showExamSection() {
    // Save the exam section
    const examSection = document.getElementById("exam");

    // Show the exam section
    examSection.style.display = "block";
}
