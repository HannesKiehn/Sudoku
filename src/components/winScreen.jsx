import React, { Component } from "react";

class WinScreen extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "grey",
          width: "30vh",
          height: "20vh",
          marginLeft: "10vh",
          marginTop: "15vh",
          opacity: 0.95,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5vh",
            fontWeight: "bold",
          }}
        >
          Victory
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="btn btn-success" onClick={this.props.handleReplay}>
            Play again
          </button>
        </div>
      </div>
    );
  }
}

export default WinScreen;
