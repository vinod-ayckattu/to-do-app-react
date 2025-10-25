import React from "react";

export default function Child({ text, sendData }) {
  return (<div>
    <h2>🏠 Home Page - {text}</h2>
    <button onClick={() => sendData("Hello from Child!")}>
      Send to Parent
    </button>
    </div>
  );
}
