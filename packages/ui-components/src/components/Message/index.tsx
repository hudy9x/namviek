import { createRoot } from "react-dom/client";
import MessageBox from "./MessageBox";
import { CreateMessageFunc, MessageFunc } from "./type";
import "./style.css";

const createContainer = () => {
  let wrapper = document.querySelector("#message-wrapper");

  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "message-wrapper";
    document.body.appendChild(wrapper);
  }

  const container = document.createElement("div");
  container.className = "message-container";

  wrapper.appendChild(container);

  return container;
};

const createMessage: CreateMessageFunc = (type, message) => {
  const container = createContainer();
  const root = createRoot(container);

  root.render(<MessageBox {...{ type, message }} />);

  setTimeout(() => {
    root.unmount();
    container.remove();
  }, 2000);
};

export const messageInfo: MessageFunc = (message) => {
  createMessage("info", message);
};

export const messageSuccess: MessageFunc = (message) => {
  console.log("success called");
  createMessage("success", message);
};
export const messageWarning: MessageFunc = (message) => {
  console.log("warning cinfoinfoalled");
  createMessage("warning", message);
};
export const messageError: MessageFunc = (message) => {
  console.log("alert called");
  createMessage("error", message);
};
