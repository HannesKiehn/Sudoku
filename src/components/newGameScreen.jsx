import React, { Component } from "react";

class NewGameScreen extends Component {
  state = {};
  render() {
    return (
      <div
        className="container"
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
        <span style={{ fontWeight: "bold" }}>Select difficulty:</span>
        <br />
        <div
          className="btn-group mt-1"
          role="group"
          aria-label="Difficulty selection"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {["Easy", "Medium", "Hard"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => this.props.onDifficultyChange(difficulty)}
              className={
                "btn btn-outline-dark" +
                (difficulty === this.props.selectedDifficulty ? " active" : "")
              }
            >
              {<span style={{ fontWeight: "bold" }}>{difficulty}</span>}
            </button>
          ))}
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="btn btn-success mt-2" onClick={this.props.onStart}>
            Start Sudoku
          </button>
        </div>
      </div>
    );
  }
}

export default NewGameScreen;
