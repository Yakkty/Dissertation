//Custom Modal component. Modals are elements which displays infront of page content
//This is a reusable custom component with defined attributes which also allows for further configuration with props
//This modal renders a Back drop component alongisde
//This backdrop disables background content and allows for closing of the modal by clicking in the background
//This functionality is achieved by receiving props from a parent component
//The backdrop will only display if a "show" prop is received.
//The backdrop will only close if a onCancel function prop is received

import { Fragment } from "react";

import BackDrop from "./BackDrop";

import "./Modal.css";

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <div className={`modal ${props.className}`}>
        <header className={`modal-header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div className={`modal-content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`modal-footer ${props.footerClass}`}>
            {props.footer}
          </footer>
        </form>
      </div>
    </Fragment>
  );
};

export default Modal;
