import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";

export default function CommentForm({ postId }) {
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = useState("");
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const firestore = useFirestore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (auth.uid && body) {
      firestore.add(
        { collection: "comments" },
        {
          body,
          commenter: auth.uid,
          postId,
          createdAt: new Date().toISOString()
        }
      );
    }
    setOpen(false);
    setBody("");
  };

  return (
    <>
      <Tooltip title="Add Comment">
        <IconButton
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        value={body}
        onChange={e => setBody(e.target.value)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Add New comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Comment"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
