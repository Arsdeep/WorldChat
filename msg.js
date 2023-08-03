// Function to read the CSV file
function readCSVFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

// Function to parse the CSV content and display messages in the chat container
async function displayChatMessages() {
    try {
        // Replace 'messages.csv' with the path to your actual CSV file
        const fileContent = await fetch("messages.txt").then((response) =>
            response.text()
        );
        const lines = fileContent.trim().split("\n").slice(1); // Skip the header row

        const chatContainer = document.getElementById("chatContainer");

        lines.forEach((line) => {
            const [content, time] = line.split(",");
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            messageDiv.innerHTML = `
          <div class="message-text">${content}</div>
          <div class="message-time">${time}</div>
        `;
            chatContainer.appendChild(messageDiv);
        });
    } catch (error) {
        console.error("Error reading or displaying the CSV file:", error);
    }
}

// Function to handle sending new messages (you can implement this as per your requirements)
// ... Previous code ...

// Function to handle sending new messages and append to messages.txt
async function sendMessage() {
    try {
        const inputBox = document.querySelector('input[type="text"]');
        const messageContent = inputBox.value.trim();
        if (!messageContent) {
            return; // Ignore empty messages
        }

        const time = new Date().toLocaleTimeString();
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "right");
        messageDiv.innerHTML = `
        <div class="message-text">${messageContent}</div>
        <div class="message-time">${time}</div>
        `;

        const chatContainer = document.getElementById("chatContainer");
        chatContainer.appendChild(messageDiv);

        // Append the message content and time to messages.txt
        const messageEntry = `"${messageContent}",${time}\n`;
        const blob = new Blob([messageEntry], { type: "text/plain" });

        const downloadLink = document.getElementById("downloadLink");
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "messages.txt";
        downloadLink.style.display = "none";

        // Simulate a click on the download link to initiate the download
        downloadLink.click();
    } catch (error) {
        console.error("Error sending message:", error);
    }
    inputBox.value = ""; // Clear the input box after sending
}

function getTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
}

// Call the function to display chat messages when the page loads
window.addEventListener("load", displayChatMessages);
