import React, { Fragment, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import "./PostItem.css";

const PostItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowModal(false);
    console.log("Deleting");
  };

  return (
    <Fragment>
      {showModal && (
        <Modal
          header="Are you sure?"
          footer={
            <Fragment>
              <Button onClick={confirmDeleteHandler}>DELETE</Button>
              <Button inverse onClick={closeModalHandler}>CANCEL</Button>
            </Fragment>
          }
          show={showModal}
          onCancel={closeModalHandler}
        >
          <p>Do you wish to proceed?</p>
        </Modal>
      )}
      <li className="post-item">
        <Card className="post-item__content">
          <div className="post-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="post-item__data">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
          <div className="post-item__actions">
            <Button to={`/posts/${props.id}`}>EDIT</Button>
            <Button inverse onClick={openModalHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PostItem;
