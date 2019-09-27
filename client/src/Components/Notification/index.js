import React from "react";
import "./notification.scss";

export default function Notification(props) {
  return (
    <div className={props.action.className}>
      <img
        alt={props.action.img.alt}
        className={props.action.img.className}
        src={props.action.img.src}
      />
      <p>{props.action.message}</p>
    </div>
  );
}
