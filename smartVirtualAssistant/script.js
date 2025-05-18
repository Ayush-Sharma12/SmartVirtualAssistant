let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let isRecognizing = false; 

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB"; 
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener("load", () => {
    console.log("Page loaded. Wishing the user...");
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    console.error("SpeechRecognition API is not supported in this browser.");
    alert("SpeechRecognition API is not supported in this browser. Please use Google Chrome.");
} else {
    console.log("SpeechRecognition API is supported.");
}

let recognition = new speechRecognition();
recognition.lang = "en-US"; // Set language
recognition.continuous = true; // Keep listening for speech
recognition.interimResults = false; // Only provide final results

recognition.onstart = () => {
    console.log("Speech recognition started...");
    isRecognizing = true; // Update state
};

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.trim();
    console.log("Recognized Speech:", transcript);
    content.innerText = transcript; // Display recognized speech in the UI
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);

    if (event.error === "no-speech") {
        console.log("No speech detected. Restarting...");
        speak("I couldn't hear you. Please try speaking again.");
    } else if (event.error === "audio-capture") {
        console.error("Microphone not detected.");
        speak("No microphone detected. Please check your microphone.");
    } else {
        console.error("An unexpected error occurred:", event.error);
        speak("An unexpected error occurred. Please try again.");
    }

    // Stop and restart the recognition process
    recognition.abort();
    isRecognizing = false;
    setTimeout(() => {
        if (!isRecognizing) recognition.start();
    }, 1000);
};

recognition.onend = () => {
    console.log("Speech recognition ended. Restarting...");
    isRecognizing = false; // Update state
    setTimeout(() => {
        if (!isRecognizing) recognition.start();
    }, 500);
};

btn.addEventListener("click", () => {
    if (!isRecognizing) {
        recognition.start();
        console.log("Starting speech recognition...");
        voice.style.display = "block";
        btn.style.display = "none";
    }
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am zara your virtual assistant, created by Ayush Sharma.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if(message.include("wikipedia")) {
        speak("Opening wikipedia")
        window.open("https://www.wikipedia.org/", "_blank")
          
    }else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } 
    else if(message.includes("play music")) {
           speak("Playing music for you...");
        window.open("https://music.youtube.com/");
           
       }
       
       
        else {
            let query = message.replace("zara", "").trim(); 
            let finalText = "Searching for " + query;
            speak(finalText);
        
            if (query.length > 0) {
                   window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
              } 
                   
              else {
                speak("Please say something to search.");
            }
        }
        
    
}