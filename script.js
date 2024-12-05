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

/**
 * Set text color for an HTML element.
 * @param {string} elementId - The ID of the element.
 * @param {string} color - The color to set.
 */
function setTextColor(elementId, color) {
    const ELEMENT = getElement(elementId);

    if (ELEMENT) {
        ELEMENT.style.color = color;
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
    const ERROR_MESSAGE_ELEMENT = getElement("errormessage");

    if (SIGNUP_FORM && SIGNUP_FORM.checkValidity()) {
        const FIRST_NAME = getInputValue("firstname");
        const LAST_NAME = getInputValue("lastname");
        signUpStudent(FIRST_NAME, LAST_NAME);
    } else {
        showErrorMessage(ERROR_MESSAGE_ELEMENT);
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
 * Show a general error message for invalid form inputs.
 */
function showErrorMessage() {
    const ERROR_MESSAGE = "Error: All fields are mandatory and must have a length between 3 and 30 characters.";
    setTextContent("errormessage", ERROR_MESSAGE);
    showElement("errormessage");
}


// FUNCTIONS FOR USER STORY ITE-2 AND USER STORY ITE-3 (Correct exam with 1 and 10 questions)

/**
 * Grade all questions by iterating through them and calculate the final score.
 */
function finishExam() {
    const CORRECT_ANSWERS = ["C", "A", "A", "B", "C", "C", "A", "C", "A", "A"];
    let examScore = 0; // Reset the score for each attempt

    // Iterate through each question
    for (let questionNumber = 1; questionNumber <= CORRECT_ANSWERS.length; questionNumber++) {
        const QUESTION_SCORE = gradeQuestion(questionNumber, CORRECT_ANSWERS[questionNumber - 1]);
        examScore += QUESTION_SCORE;
    }

    // Calculate and display the final score
    const FINAL_SCORE = calculateFinalScore(examScore);
    displayFinalScore(FINAL_SCORE);
}

/**
 * Grade a single question and update the score for that question.
 * @param {number} questionNumber - The number of the question to grade.
 * @param {string} correctAnswer - The correct answer for this question.
 * @returns {number} The score for the question.
 */
function gradeQuestion(questionNumber, correctAnswer) {
    const USER_ANSWER = getCheckedAnswer(`questionanswers${questionNumber}`);
    const QUESTION_SCORE = calculateQuestionScore(USER_ANSWER, correctAnswer);
    displayQuestionScore(questionNumber, QUESTION_SCORE);
    return QUESTION_SCORE;
}

/**
 * Get the selected answer from a group of radio buttons.
 * @param {string} questionName - The name attribute of the radio button group.
 * @returns {string|null} The value of the selected answer, or null if none selected.
 */
function getCheckedAnswer(questionName) {
    let selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    return selectedOption ? selectedOption.value : null;
}

/**
 * Calculate the score based on the user's answer.
 * @param {string|null} userAnswer - The user's selected answer.
 * @param {string} correctAnswer - The correct answer.
 * @returns {number} The calculated score.
 */
function calculateQuestionScore(userAnswer, correctAnswer) {
    let score;

    if (!userAnswer) {
        score = 0; // No answer
    } else if (userAnswer === correctAnswer) {
        score = 2; // Correct answer
    } else {
        score = -1; // Incorrect answer
    }
    return score;
}

/**
 * Display the score in the grade message element.
 * @param {number} score - The score to display.
 */
function displayQuestionScore(questionNumber, score) {
    setTextContent(`grademessage${questionNumber}`, `Score for question ${questionNumber}: ${score}`);
}

/**
 * Reset the selected answer for a specific question.
 * @param {number} questionNumber - The question number to reset.
 */
function resetGradeMessage(questionNumber) {
    // Clear the grade message for this question
    setTextContent(`grademessage${questionNumber}`, "");
}

// FUNCTIONS FOR USER STORY ITE-4 and ITE-5 (calculate and display the final score)

/**
 * Calculate the final exam score, ensuring no negative values.
 * @param {number} examScore - The raw exam score.
 * @returns {number} The final score.
 */
function calculateFinalScore(examScore) {
    let finalScore;

    if (examScore < 0) {
        finalScore = 0;
    } else {
        finalScore = examScore;
    } 
    return finalScore;
}


/**
 * Display the final exam score.
 * @param {number} finalScore - The final score to display.
 */
function displayFinalScore(finalScore) {
    const PASS_MARK = 12;

    let message = `Exam score: ${finalScore}. FAIL`;
    let color = "red";

    if (finalScore >= PASS_MARK) {
        message = `Exam score: ${finalScore}. PASS`;
        color = "green"; 
    } 

    setTextContent("gradeexammessage", message);
    setTextColor("gradeexammessage", color);
}