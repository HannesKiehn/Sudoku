import React, { Component } from "react";
import "../box.css";
class Box extends Component {
  state = {};
  render() {
    return <React.Fragment>{this.renderBox()}</React.Fragment>;
  }
  renderBox = () => {
    let name = "box";
    if (
      +this.props.box.number !== +this.props.box.solution &&
      this.props.settings.showMistakes
    ) {
      name += " incorrect";
    }
    if (this.props.box.selected) {
      name += " boxSelected";
    }
    if (this.props.box.changeable) {
      name += " boxUser";
    } else {
      name += " boxGiven";
    }
    return (
      <div
        onClick={() => this.props.onBoxClick(this.props.box)}
        className={name}
      >
        {this.props.box.number !== 0 && this.props.box.number}
      </div>
    );
  };
}

export default Box;
