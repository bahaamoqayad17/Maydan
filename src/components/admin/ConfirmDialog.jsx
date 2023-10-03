import { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { resources } from "@/lib/resources";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ model, id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(resources[model].remove(id));
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
        &nbsp; {t("Delete")}
      </Typography>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <center>
            <img src="/warning.png" width={200} alt="test" />
          </center>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {t("are_you_sure_you_want_to_delete_this")} */}
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            {t("No")}
          </Button>
          <Button onClick={handleSubmit} color="success" variant="contained">
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
