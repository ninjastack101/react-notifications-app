export const actions = [
  {
    type: "userJoined",
    className: "userJoined",
    message: "User has Joined",
    buttonText: "User has Joined",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/joined-user.svg"
    }
  },
  {
    type: "userLeft",
    className: "userLeft",
    message: "User has Left",
    buttonText: "User has Left",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/joined-left.svg"
    }
  },
  {
    type: "mywebcamIssue",
    className: "mywebcamIssue",
    message: "My Webcam Issue",
    buttonText: "My Webcam Issue",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/webcam-issue.svg"
    }
  },
  {
    type: "otherwebcamIssue",
    className: "otherwebcamIssue",
    message: "",
    buttonText: "Other's Webcam Issue",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/webcam-issue.svg"
    }
  },
  {
    type: "myConnection",
    className: "myConnection",
    message: "My Connection Issue",
    buttonText: "My Connection Issue",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/connection-issue.svg"
    }
  },
  {
    type: "otherConnection",
    className: "otherConnection",
    message: "",
    buttonText: "Other's Connection Issue",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/connection-issue.svg"
    }
  },
  {
    type: "broadcastStart",
    className: "broadcaststart",
    message: "Broadcast started",
    buttonText: "Broadcast started",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/broadcast-start.svg"
    }
  },
  {
    type: "broadcastStop",
    className: "broadcaststop",
    message: "Broadcast Stopped",
    buttonText: "Broadcast Stopped",
    img: {
      alt: "userPhoto error",
      className: "userPhoto",
      src: "/broadcast-stop.svg"
    }
  }
];
