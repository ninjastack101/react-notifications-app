import React from "react";
import Content from "./Components/Content";

var sectionStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: "url('remo.jpg')",
  backgroundRepeat: "no-repeat"
};

function App() {
  return (
    <div className="App">
      <section style={sectionStyle}>
        <Content />
      </section>
    </div>
  );
}

export default App;
