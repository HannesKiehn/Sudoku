import React, { Component } from "react";
import BigBox from "./bigBox";
import "../box.css";
class Field extends Component {
  state = {};
  render() {
    return (
      <div className="field">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((bigBoxId) =>
          this.renderBigBoxArray(bigBoxId)
        )}
      </div>
    );
  }
  getBigBoxContent(bigBoxIndex) {
    let array = this.props.boxes;
    let bigBoxRow = Math.floor(bigBoxIndex / 3);
    bigBoxIndex = bigBoxIndex % 3;
    let content = [];
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 3; i++) {
        let index = bigBoxRow * 27 + row * 9 + bigBoxIndex * 3 + i;
        content.push(array[index]);
      }
    }
    return content;
  }
  renderBigBoxArray = (boxId) => {
    let content = this.getBigBoxContent(boxId);
    return (
      <React.Fragment key={boxId}>
        <BigBox
          onBoxClick={this.props.onBoxClick}
          bigBox={content}
          settings={this.props.settings}
        />
      </React.Fragment>
    );
  };
}

export default Field;
