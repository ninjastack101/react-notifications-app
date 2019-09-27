import React from "react";
import ButtonComponent from "../Button";
import Notification from "../Notification";
import { actions } from "../../Constants/action";

import "./content.scss";

export default class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      showpopup: ""
    };
  }

  toggleState = type => {
    let set;
    type === this.state.showpopup ? (set = "") : (set = type);
    this.setState({ showpopup: set });
  };

  render() {
    const notifications = [];
    const buttons = [];
    actions.forEach(action => {
      notifications.push(
        this.state.showpopup === action.type && <Notification action={action} />
      );
      buttons.push(
        <li>
          <ButtonComponent action={action} toggleState={this.toggleState} />
        </li>
      );
    });
    return (
      <React.Fragment>
        {notifications}
        <div className="leftButton">
          <ul>{buttons}</ul>
        </div>
      </React.Fragment>
    );
  }
}
