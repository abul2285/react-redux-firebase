import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFirestore, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { IconButton, Tooltip, InputAdornment } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";

export default function Postform() {
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const firebase = useFirebase();

  const auth = useSelector(({ firebase: { auth } }) => auth);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleImageUpload = () => {
    let imageRef = document.getElementById("imageRef");

    imageRef.click();
  };

  const handleImageChange = e => {
    // setImage(e.target.files[0]);
    setLoading(true);
    firebase
      .uploadFile(`${auth.uid}`, e.target.files[0])
      .then(data => {
        return data.uploadTaskSnapshot.task.snapshot.ref.getDownloadURL();
      })
      .then(url => {
        setImage(url);
        setLoading(false);
      });
  };

  console.log(image);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      if (auth.uid && body) {
        firestore.add(
          { collection: "posts" },
          { body, owner: auth.uid, createdAt: new Date().toISOString(), image }
        );
      }
    }, 1000);
    console.log({
      body,
      owner: auth.uid,
      createdAt: new Date().toISOString(),
      image
    });
    setImage("");

    setBody("");
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <IconButton color="inherit">
          <AddIcon />
        </IconButton>
        Create Post
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Add New Post</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={handleImageChange}
            hidden
            id="imageRef"
          />
          <TextField
            margin="normal"
            id="name"
            required
            value={body}
            onChange={e => setBody(e.target.value)}
            label="Post body"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleImageUpload}>
                  <Tooltip title="Add Picture">
                    <IconButton>
                      <AttachmentOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            variant="outlined"
            fullWidth
          />
          <DialogContentText>
            {loading && "Please wait until image upload"}
          </DialogContentText>
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
