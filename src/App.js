import React, { Component } from "react";
import Field from "./components/field";
import SudokuSolver from "./SudokuSolver";
import NewGameScreen from "./components/newGameScreen";
import WinScreen from "./components/winScreen";
class App extends Component {
  state = {
    totalBoxes: 81,
    maxNumber: 9,
    boxes: [],
    settings: { showMistakes: false },
    selectedDifficulty: "Easy",
    newGameVisible: true,
    winScreenVisible: false,
  };
  constructor() {
    super();
    this.state.boxes = this.initializeEmptyBoxes();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPressed.bind(this));
  }
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <div className="row mt-5">
            <div className="col">
              {this.state.newGameVisible && (
                <NewGameScreen
                  onDifficultyChange={this.handleDifficultyChange}
                  onStart={this.handleStart}
                  selectedDifficulty={this.state.selectedDifficulty}
                />
              )}
              {this.state.winScreenVisible && (
                <WinScreen handleReplay={this.handleReplay} />
              )}
              <Field
                onKeyDown={(e) => this.handleKeyPress(e)}
                onBoxClick={this.handleBoxSelect}
                boxes={this.state.boxes}
                settings={this.state.settings}
              />
              <div
                className="btn-group mt-3 w-75"
                role="group"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    type="button"
                    className="btn btn-secondary ms-1"
                    onClick={() => this.handleNumberInput(num)}
                    key={num}
                    style={{
                      fontSize: "2vmin",
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="col">
              Instructions:
              <br />
              Select a field and press a number on the bottom or on your
              keyboard. Every 3x3 Box, vertical column and horizontal column can
              contain each number from 1 to 9 only once.
              <div className="mt-5">Options:</div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="showMistakesCheck"
                  onClick={() =>
                    this.setState({
                      settings: {
                        showMistakes:
                          document.getElementById("showMistakesCheck").checked,
                      },
                    })
                  }
                ></input>
                <label className="form-check-label">Show mistakes</label>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }

  initializeBoxes = () => {
    let boxes = this.generateRandomSolution();
    let numbersToRemove = this.state.totalBoxes - this.getGivenNumbers();
    for (let i = 0; i < numbersToRemove; i++) {
      this.removeOneNumber(boxes);
    }
    return boxes;
  };

  removeOneNumber(boxes) {
    let index = 0;
    while (true) {
      index = Math.floor(Math.random() * this.state.totalBoxes);
      if (boxes[index].number !== 0) {
        break;
      }
    }
    boxes[index].number = 0;
    boxes[index].changeable = true;
  }

  generateRandomSolution = () => {
    let boxes = this.initializeEmptyBoxes();
    let numbers = boxes.map((box) => box.number);
    let solver = new SudokuSolver(numbers);
    let solution = solver.getSolution();
    boxes.map((box) => {
      box.number = solution[box.id];
      box.solution = solution[box.id];
      return box;
    });
    return boxes;
  };

  isSolveableSudoku(boxes) {
    let numbers = boxes.map((box) => box.number);
    let solver = new SudokuSolver(numbers);
    return solver.isSolveable();
  }

  isCorrectSolution() {
    const { boxes, totalBoxes } = this.state;
    return (
      boxes.filter((box) => +box.number === +box.solution).length === totalBoxes
    );
  }

  initializeEmptyBoxes = () => {
    let boxes = [];
    for (let i = 0; i < this.state.totalBoxes; i++) {
      boxes.push({
        id: i,
        number: 0,
        selected: false,
        solution: 0,
        changeable: false,
      });
    }
    return boxes;
  };

  getNumberOfEmptyBoxes() {
    const numbers = this.state.boxes.map((box) => box.number);
    return numbers.filter((i) => i === 0).length;
  }

  handleBoxSelect = (box) => {
    let id = this.state.boxes.indexOf(box);
    let boxes = [...this.state.boxes];
    boxes = boxes.map((box) => {
      box.selected = false;
      return box;
    });
    boxes[id].selected = true;
    this.setState({ boxes });
  };

  handleKeyPressed = (event) => {
    if (isFinite(event.key)) {
      this.handleNumberInput(event.key);
    }
  };

  handleNumberInput(number) {
    if (this.state.newGameVisible || this.state.winScreenVisible) {
      return;
    }
    let newBoxes = [...this.state.boxes];
    let activeBox = this.state.boxes.filter((box) => box.selected);
    let endFlag = false;
    if (activeBox.length !== 0 && activeBox[0].changeable) {
      newBoxes[this.state.boxes.indexOf(activeBox[0])].number = number;
      if (this.getNumberOfEmptyBoxes() < 1) {
        endFlag = true;
      }
    }
    this.setState({ boxes: newBoxes });
    if (endFlag) {
      this.handleEndGame();
    }
  }

  handleDifficultyChange = (difficulty) => {
    this.setState({ selectedDifficulty: difficulty });
  };

  handleStart = () => {
    this.setState({
      newGameVisible: false,
      boxes: this.initializeBoxes(),
    });
  };

  getGivenNumbers() {
    const { selectedDifficulty: dif } = this.state;
    let givenNumbers = 80;
    if (dif === "Medium") {
      givenNumbers = 40;
    }
    if (dif === "Hard") {
      givenNumbers = 30;
    }
    return givenNumbers;
  }

  handleEndGame() {
    if (this.isCorrectSolution()) {
      this.setState({ winScreenVisible: true });
    } else {
      this.setState({ settings: { showMistakes: true } });
      document.getElementById("showMistakesCheck").checked = true;
    }
  }

  handleReplay = () => {
    document.getElementById("showMistakesCheck").checked = false;
    this.setState({
      winScreenVisible: false,
      newGameVisible: true,
      settings: { showMistakes: false },
    });
  };
}

export default App;
