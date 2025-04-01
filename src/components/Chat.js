// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/api'; // Assuming your api service file is here

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null); // Ref for auto-scrolling

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputMessage.trim()) return;

        const newUserMessage = { text: inputMessage, sender: 'user' };
        // Add user message immediately
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        const currentInput = inputMessage; // Store input before clearing
        setInputMessage(''); // Clear input field
        setIsLoading(true); // Set loading state

        try {
            // Send message to backend
            const backendResponse = await sendMessage(currentInput); // Use stored input

            // Create new bot message object
            const newBotMessage = {
                text: backendResponse.response, // Main response text from backend
                sender: 'bot',
                explanation: backendResponse.explanation_detail || null // Conversational explanation or null
            };
            // Add bot message to state
            setMessages(prevMessages => [...prevMessages, newBotMessage]);

        } catch (error) {
            console.error("Error sending/receiving message:", error);
            // Add an error message to the chat
            setMessages(prevMessages => [...prevMessages, { text: "Sorry, something went wrong. Please try again.", sender: 'bot' }]);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Auto-scroll to the bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    {/* Display main message text */}
                    <p>{message.text}</p>
                    {/* Display conversational explanation if present */}
                    {message.sender === 'bot' && message.explanation && (
                      <p className="explanation-detail"><em>{message.explanation}</em></p>
                    )}
                  </div>
                ))}
                 {/* Loading indicator */}
                 {isLoading && <div className='message bot typing-indicator'><span>.</span><span>.</span><span>.</span></div>}
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Ask about a brand's sustainability..."
                    disabled={isLoading} // Disable input while loading
                />
                <button type="submit" disabled={isLoading}>Send</button>
            </form>
        </div>
    );
}

export default Chat;