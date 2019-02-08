// Import dependencies
const WebSocket = require("ws");
const url = require("url");
const uuid = require("uuid/v4");

// Import constants
const CONSTANTS = require("./constants");

// Store user IDs with usernames for quick recovery
const users = {};

// Store feedback
const feedback = [];

// Create an object to store feedback from saved data
const createFeedbackObject = (clientId, type = "happy", content = "") => {
  const trimmed = trim(content, CONSTANTS.MAX_LENGTH);

  // Don't allow empty messages
  if (trimmed.length === 0) {
    return false;
  }

  return {
    id: uuid(),
    clientId,
    type,
    content: trimmed,
    votes: []
  };
};

// Start the server
const server = new WebSocket.Server({ port:8080 });

// Make sure all clients are still around

// Define what happens when a client connects

// Define what happens when a message is sent from a client
function onClientMessage(message) {
  // Decode the string to an object
  const data = JSON.parse(message);

  // Act on the defined action
  switch (data.action) {
    default:
      // Do nothing
      break;
  }
}

function addClient(client, connectionId) {
  // Generate a unique ID, or use the one supplied
  // Listen for messages and pong responses
  // Provide the new client with the current feedback
}

// Tell all clients about something happening
function broadcast(action, payload) {
  server.clients.forEach(client => {
    // Check if the client is still active
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          action,
          payload
        })
      );
    }
  });
}

// Check the client is still around
function ping() {
  server.clients.forEach(client => {
    // If the client hasn't responded since the last ping...
    if (client.isAlive === false) {
      // ...kill the connection
      client.terminate();
    }

    // If the client is still alive...
    if (client.readyState === WebSocket.OPEN) {
      // Mark them as awaiting a response
      client.isAlive = false;
      // Send the ping
      client.ping();
    }
  });
}

// What to do when the client responds to the ping
function pong() {
  // Mark them as still alive before the next set of pings
  this.isAlive = true;
}

// Trim strings so they aren't too long
function trim(str, length) {
  return str.length > length ? `${str.substr(0, length)}...` : str;
}
