import React from "react";

export default function NoticeItem(props) {
  return (
    <div>
      <h4>{props.heading}</h4>
      <p>{props.body}</p>
    </div>
  );
}
