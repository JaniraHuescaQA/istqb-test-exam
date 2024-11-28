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

    showElement("exam");
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


// FUNCTIONS FOR USER STORY ITE-3 (Correct exam with 10 questions)

/**
 * Grade all questions by iterating through them.
 */
function finishExam() {
    const CORRECT_ANSWERS = ["C", "A", "A", "B", "C", "C", "A", "C", "A", "A"];
    for (let i = 1; i <= CORRECT_ANSWERS.length; i++) {
        gradeQuestion(i, CORRECT_ANSWERS[i - 1]);
    }
}

/**
 * Grade a single question and update the score for that question.
 * @param {number} questionNumber - The number of the question to grade.
 * @param {string} correctAnswer - The correct answer for this question.
 */
function gradeQuestion(questionNumber, correctAnswer) {
    const userAnswer = getCheckedAnswer(`questionanswers${questionNumber}`);
    const score = calculateScore(userAnswer, correctAnswer);
    displayScore(questionNumber, score);
}

// FUNCTIONS FOR USER STORY ITE-2 AND USER STORY ite-3 (Correct exam with 1 or 10 question)
/**
 * Get the selected answer from a group of radio buttons.
 * @param {string} questionName - The name attribute of the radio button group.
 * @returns {string|null} The value of the selected answer, or null if none selected.
 */
function getCheckedAnswer(questionName) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    return selectedOption ? selectedOption.value : null;
}

/**
 * Calculate the score based on the user's answer.
 * @param {string|null} userAnswer - The user's selected answer.
 * @param {string} correctAnswer - The correct answer.
 * @returns {number} The calculated score.
 */
function calculateScore(userAnswer, correctAnswer) {
    if (!userAnswer) {
        return 0; // No answer
    }
    if (userAnswer === correctAnswer) {
        return 2; // Correct answer
    }
    return -1; // Incorrect answer
}

/**
 * Display the score in the grade message element.
 * @param {number} score - The score to display.
 */
function displayScore(questionNumber, score) {
    setTextContent(`grademessage${questionNumber}`, `Score for question ${questionNumber}: ${score}`);
}

/**
 * Reset the selected answer for a specific question.
 * @param {number} questionNumber - The question number to reset.
 */
function resetAnswer(questionNumber) {
    // Get all radio buttons for the specific question
    const radios = document.querySelectorAll(`input[name="questionanswers${questionNumber}"]`);

    // Uncheck all radio buttons
    radios.forEach(radio => (radio.checked = false));

    // Clear the grade message for this question
    setTextContent(`grademessage${questionNumber}`, "");
}

/*
 * Reset the exam form by clearing selected answers and resetting grade messages.
function resetExam() {
    const RADIOS = document.querySelectorAll('input[type="radio"]');
    RADIOS.forEach(function (radio) {
        radio.checked = false;
    });

    for (let i = 1; i <= 10; i++) {
        setTextContent(`grademessage${i}`, "");
    }
}
 */