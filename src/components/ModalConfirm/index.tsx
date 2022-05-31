import React from "react";

import { Button, Grid, Modal } from "@material-ui/core";
import { modalTitle, cssModalConfirmWrapper } from "./style";

const ModalConfirm = ({ open, title, handleClose, handleConfirm }) => {
  const Confirm = () => {
    handleConfirm();
    handleClose();
  };

  return (
    <>
      <Modal open={open}>
        <div className={cssModalConfirmWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={modalTitle}>
              <h4>{title}</h4>
            </Grid>
            <Grid item xs={6} className={modalTitle}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={6} className={modalTitle}>
              <Button variant="contained" color="primary" onClick={Confirm}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default ModalConfirm;
