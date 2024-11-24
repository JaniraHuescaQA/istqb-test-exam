// GLOBAL FUNCTIONS (utils)

function hideElement(elementId) {
    // Save the element
    const ELEMENT_TO_HIDE = document.getElementById(elementId);

    // Hide the element if it exists
    if (ELEMENT_TO_HIDE) {
        ELEMENT_TO_HIDE.style.display = "none";
    }
}

function showElement(elementId) {
    // Save the element
    const ELEMENT_TO_SHOW = document.getElementById(elementId);

    // Show the element if it exists
    if (ELEMENT_TO_SHOW) {
        ELEMENT_TO_SHOW.style.display = "block";
    }
}

function showTemporaryMessage(elementId, duration, callback) {
    // Save the element
    const element = document.getElementById(elementId);

    // Show the element
    if (element) {
        element.style.display = "block";

        // Hide the element after the specified duration (in milliseconds)
        setTimeout(function () {
            element.style.display = "none";
            if (callback) {
                callback();
            }
        }, duration);
    }
}


// FUNCTIONS FOR USER STORY ITE-1 (Sign up student)

// Hide the exam section
hideElement("exam");

function signUpStudentValidation() {
    // Save the sign up form
    const SIGN_UP_FORM = document.getElementById("signupform");

    // Save the student data (first name and last name)
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;

    // Save the error message
    let errorMessage = document.getElementById("errormessage");

    // Form validation
    if (SIGN_UP_FORM.checkValidity()) {
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

    // Hide the sign up form
    hideElement("signupform");

    // Define the welcome message
    let welcomeMessage = "Welcome to the ISTQB Exam, " + firstName + " " + lastName;
    document.getElementById("welcomemessage").textContent = welcomeMessage.toUpperCase();

    // Show the welcome message temporarily and then hide the sign up section
    showTemporaryMessage("welcomemessage", 3000, function () {
        hideElement("signup");
    });

    // Show the exam section
    showElement("exam");
}


// FUNCTIONS FOR USER STORY ITE-2 (Correct exam with 1 question)

function gradeQuestion() {
    // Save the correct answer
    const CORRECT_ANSWER = "C";

    // Save the chosen answer
    let userAnswer = document.querySelector('input[name="question1answers"]:checked');

    // Save the grade message
    let gradeMessage = document.getElementById("grademessage");

    // Calculate the score
    let score;
    if (userAnswer === null) {
        score = 0;
        gradeMessage.textContent = "0";
    } else if (userAnswer.value === CORRECT_ANSWER) {
        score = 2;
        gradeMessage.textContent = "2";
    } else if (userAnswer.value === "DEFAULT") {
        score = 0;
        gradeMessage.textContent = "0";
    } else if (userAnswer.value != CORRECT_ANSWER) {
        score = -1
        gradeMessage.textContent = "-1";
    }

    // Hide the exam form
    hideElement("examform");

    // Show the score obtained
    gradeMessage.textContent = "Score: " + score;
}