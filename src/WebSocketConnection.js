import CONSTANTS from "./constants";

export class WebSocketConnection {
  constructor(messageCallback) {
    let pathToServer = CONSTANTS.WEBSOCKET_URI;
    const existingId = getId();

    if (existingId) {
      pathToServer += `?id=${existingId}`;
    }

    this.connection = new WebSocket(pathToServer);
    this.connection.onMessage = this.onMessage.bind(this);
    this.messageCallback = messageCallback;
  }

  onMessage(event) {
    const data = JSON.parse(event.data);

    if (data.action === CONSTANTS.INITIAL_STATE) {
      setId(data.payload.id);
    }

    if (this.messageCallback) {
      this.messageCallback(data);
    }
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
