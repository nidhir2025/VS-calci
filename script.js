// Speech Recognition for All Browsers
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Select Elements
const resultBox = document.getElementById("result");
const speakBtn = document.getElementById("speakBtn");
const output = document.getElementById("output");

// Start Voice Recognition
speakBtn.addEventListener("click", () => {
    recognition.start();
});

// Process Speech Input
recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript.toLowerCase().trim();
    console.log("Raw Speech Input:", transcript); // Debugging Line
    resultBox.value = transcript;

    // Fixing Operations
    let expression = transcript.replace(/multiplication/g, "*")
                               .replace(/times/g, "*")
                               .replace(/multiplied by/g, "*")
                               .replace(/divided by/g, "/")
                               .replace(/plus/g, "+")
                               .replace(/minus/g, "-")
                               .replace(/×/g, "*")  // Fix for "×" symbol
                               .replace(/÷/g, "/"); // Fix for "÷" symbol

    console.log("Converted Expression:", expression); // Debugging Line

    try {
        let result = eval(expression);
        if (!isNaN(result)) {
            output.innerText = `Result: ${result}`;
        } else {
            output.innerText = "Invalid Calculation!";
        }
    } catch (e) {
        output.innerText = "Invalid Calculation!";
        console.error("Calculation Error:", e); // Debugging Line
    }
};

// Error Handling
recognition.onerror = function(event) {
    output.innerText = "Error: " + event.error;
    console.error("Speech Recognition Error:", event.error); // Debugging Line
};
