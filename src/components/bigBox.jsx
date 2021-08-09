import React, { Component } from "react";
import Box from "./box.jsx";
import "../box.css";
class BigBox extends Component {
  state = {};
  render() {
    return (
      <div className="bigBox">
        {this.props.bigBox.map((box) => this.renderBoxArray(box.id, box))}
      </div>
    );
  }
  renderBoxArray(boxId, box) {
    if (true) {
      return (
        <React.Fragment key={box.id}>
          <Box
            onBoxClick={this.props.onBoxClick}
            box={box}
            settings={this.props.settings}
          />
        </React.Fragment>
      );
    }
  }
  mCon(id) {
    console.log("hello");
  }
}

export default BigBox;
