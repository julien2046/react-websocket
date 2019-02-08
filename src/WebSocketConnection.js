import CONSTANTS from "./constants";

export class WebSocketConnection {
  constructor(messageCallback) {
    let pathToServer = CONSTANTS.WEBSOCKET_URI;
    const existingId = getId();

    if (existingId) {
      pathToServer += `?id=${existingId}`;
    }

    this.connection = new Websocket(pathToServer);
    this.connection.onMessage = this.onMessage.bind(this);
    this.messageCallback = messageCallback;
  }

  // What to do when we receive a message from the server
  onMessage(event) {
    // Convert the JSON string into an object
    // Set the new ID from the state passed
    // Pass to React if any other message
  }

  // Send a message to the server
  send(action, payload) {
    this.connection.send(
      JSON.stringify({
        action,
        payload
      })
    );
  }
}

// Get the ID from session storage
function getId() {
  return sessionStorage.getItem("id");
}

// Store the ID in session storage
function setId(id) {
  sessionStorage.setItem("id", id);
}

export default WebSocketConnection;
