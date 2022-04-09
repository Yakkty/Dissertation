import React, { Fragment, useState } from "react";

import { Grid } from "@mui/material";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";

import "./PinboardItem.css";

const PinboardItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
      {showModal && (
        <Modal
          header={props.title}
          footer={
            <Fragment>
              <Button inverse onClick={closeModalHandler}>
                CANCEL
              </Button>
            </Fragment>
          }
          show={showModal}
          onCancel={closeModalHandler}
        >
          <p>{props.content}</p>
        </Modal>
      )}

      <Grid item md={4} key={props.id} zeroMinWidth>
        <Card className="pinboard-item__card">
          <div className="pinboard-item">
            <div className="pinboard-item__title">
              <h1>{props.title}</h1>
            </div>
            <div className="pinboard-item__content">
              <p>{props.preview}</p>
            </div>
            <div className="pinboard-item__actions">
              <button onClick={openModalHandler}>Learn more</button>
            </div>
          </div>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default PinboardItem;
