// GLOBAL FUNCTIONS (utils)

/**
 * Hide an HTML element by ID.
 * @param {string} elementId - The ID of the element to hide.
 */
function hideElement(elementId) {
    const ELEMENT_TO_HIDE = document.getElementById(elementId);

    if (ELEMENT_TO_HIDE) {
        ELEMENT_TO_HIDE.style.display = "none";
    }
}

/**
 * Show an HTML element by ID.
 * @param {string} elementId - The ID of the element to show.
 */
function showElement(elementId) {
    const ELEMENT_TO_SHOW = document.getElementById(elementId);

    if (ELEMENT_TO_SHOW) {
        ELEMENT_TO_SHOW.style.display = "block";
    }
}

/**
 * Show a temporary message in an element, then hide it after a duration.
 * @param {string} elementId - The ID of the element to display the message.
 * @param {number} duration - The duration (in milliseconds) to show the message.
 * @param {function} callback - A callback function to execute after hiding the message.
 */
function showTemporaryMessage(elementId, duration, callback) {
    const ELEMENT = document.getElementById(elementId);

    if (ELEMENT) {
        ELEMENT.style.display = "block";

        // Hide the element after the specified duration (in milliseconds)
        setTimeout(function () {
            ELEMENT.style.display = "none";
            if (callback) {
                callback();
            }
        }, duration);
    }
}

/**
 * Get an HTML element by ID.
 * @param {string} elementId - The ID of the element to retrieve.
 * @returns {HTMLElement|null} The element if found, or null if not.
 */
function getElement(elementId) {
    return document.getElementById(elementId);
}

/**
 * Get the value of an input element by ID.
 * @param {string} inputId - The ID of the input element.
 * @returns {string} The value of the input element.
 */
function getInputValue(inputId) {
    const inputElement = getElement(inputId);
    return inputElement ? inputElement.value : "";
    /* Equivalent to:
    if (inputElement) {
        return inputElement.value;
    } else {
        return "";
    } */
}

/**
 * Set text content for an HTML element.
 * @param {string} elementId - The ID of the element.
 * @param {string} text - The text content to set.
 */
function setTextContent(elementId, text) {
    const ELEMENT = getElement(elementId);
    if (ELEMENT) {
        ELEMENT.textContent = text;
    }
}


// FUNCTIONS FOR USER STORY ITE-1 (Sign up student)
// Hide the exam section
hideElement("exam");

/**
 * Validate the sign-up form and proceed to the next step if valid.
 */
function signUpStudentValidation() {
    const SIGNUP_FORM = getElement("signupform");
    const FIRST_NAME = getInputValue("firstname");
    const LAST_NAME = getInputValue("lastname");
    const ERROR_MESSAGE_ELEMENT = getElement("errormessage");

    if (SIGNUP_FORM && SIGNUP_FORM.checkValidity()) {
        signUpStudent(FIRST_NAME, LAST_NAME);
    } else {
        showErrorMessage(FIRST_NAME, LAST_NAME, ERROR_MESSAGE_ELEMENT);
    }
}

/**
 * Handle successful sign-up logic, including showing a welcome message.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 */
function signUpStudent(firstName, lastName) {
    hideElement("signupform");

    const WELCOME_MESSAGE = `Welcome to the ISTQB Exam, ${firstName} ${lastName}`.toUpperCase();
    setTextContent("welcomemessage", WELCOME_MESSAGE);

    // Show the welcome message temporarily and then hide the signup section and show the exam section
    showTemporaryMessage("welcomemessage", 3000, function () {
        hideElement("signup");
        showElement("exam");
    });
}

/**
 * Show an appropriate error message based on user input.
 * @param {string} firstName - The first name input value.
 * @param {string} lastName - The last name input value.
 * @param {HTMLElement} errorMessageElement - The element to display the error message.
 */
function showErrorMessage(firstName, lastName) {
    let message = validateNameFields(firstName, lastName);
    setTextContent("errormessage", message);
    showElement("errormessage");
}

/**
 * Validate the first and last name fields and return an error message.
 * @param {string} firstName - The first name input value.
 * @param {string} lastName - The last name input value.
 * @returns {string} The error message, or an empty string if valid.
 */
function validateNameFields(firstName, lastName) {
    if (!firstName || !lastName) {
        return "Error: All fields are mandatory.";
    }
    if (firstName.length < 3 || lastName.length < 3 || firstName.length > 30 || lastName.length > 30) {
        return "Error: The number of characters must be between 3 and 30, inclusive.";
    }
    return "Error: Incorrect input.";
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