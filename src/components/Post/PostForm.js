import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFirestore, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function Postform() {
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const firestore = useFirestore();
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(auth);
    if (auth.uid && body) {
      firestore.add(
        { collection: "posts" },
        { body, owner: auth.uid, createdAt: new Date().toISOString() }
      );
    }

    setBody("");
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            required
            value={body}
            onChange={e => setBody(e.target.value)}
            label="Post body"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
