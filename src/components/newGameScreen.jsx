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
          width: "30vmin",
          height: "20vmin",
          marginLeft: "10vmin",
          marginTop: "15vmin",
          marginRight: "10vmin",
          marginBottom: "15vmin",
          opacity: 0.95,
        }}
      >
        <div className="row h-25">
          <div className="col md-12">
            <span style={{ fontWeight: "bold", fontSize: "1.5vmin" }}>
              Select difficulty:
            </span>
          </div>
        </div>

        {this.renderButtonGroup()}
        <div className="row h-25">{this.renderStartButton()}</div>
      </div>
    );
  }

  renderButtonGroup() {
    return (
      <div className="row h-25">
        {["Easy", "Medium", "Hard"].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => this.props.onDifficultyChange(difficulty)}
            className={
              "btn btn-outline-dark col-4 btn-sm" +
              (difficulty === this.props.selectedDifficulty ? " active" : "")
            }
          >
            {
              <span style={{ fontWeight: "bold", fontSize: "1.5vmin" }}>
                {difficulty}
              </span>
            }
          </button>
        ))}
      </div>
    );
  }
  renderStartButton() {
    return (
      <button
        className="btn btn-success mt-2"
        onClick={this.props.onStart}
        style={{ fontSize: "1.5vmin" }}
      >
        Start Sudoku
      </button>
    );
  }
}

export default NewGameScreen;
