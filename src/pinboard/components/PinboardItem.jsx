//This child component represents a particular item in the pinboard item list

//Imports
import React, { Fragment, useState } from "react";

import { Grid } from "@mui/material";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";

import "./PinboardItem.css";

//This component displays a pinboard item, along with a modal to display further information on button click
const PinboardItem = (props) => {
  //useState call for the modals display state
  const [showModal, setShowModal] = useState(false);

  //Handler functions to open/close the modal
  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  //Displays the markup, consisting of a grid item containing data acquired via props
  //A modal is rendered conditionally alongside that shows on button click
  //This modal also receives its content via props
  return (
    <Fragment>
      {showModal && (
        <Modal
          style={{ background: props.emotionColour }}
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
          <div className="Pinboard-modal__content">
            <h2>How do you know you're experiencing {props.title}?</h2>
            <hr />
            <h3>Physical symptoms</h3>
            <p>{props.physSymptoms}</p>
            <h3>Mental symptoms</h3>
            <p>{props.mentSymptoms}</p>
          </div>
        </Modal>
      )}

      <Grid item md={4} key={props.id} zeroMinWidth>
        <Card className="pinboard-item__card">
          <div className="pinboard-item">
            <div className="pinboard-item__title">
              <h1>{props.title}</h1>
            </div>
            <div className="pinboard-item__content">
              <p>{props.description}</p>
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
