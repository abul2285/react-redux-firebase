import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDropzone } from "react-dropzone";
import { useFirebase } from "react-redux-firebase";
import { RootRef, Tooltip, IconButton, Box } from "@material-ui/core";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    // height: "100%",
    padding: "56.25%",
    objectFit: "cover"
  }
});

export default function Profile() {
  const firebase = useFirebase();
  const onDrop = useCallback(acceptedFiles => {
    firebase
      .uploadFile("uploadedFiles", acceptedFiles[0], "uploadedFiles")
      .then(data => {
        firebase.updateProfile({ image: `${data.downloadURL}?alt=media` });
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();
  const classes = useStyles();
  const profile = useSelector(({ firebase: { profile } }) => profile);

  const handleLogout = () => {
    firebase.logout();
  };

  return (
    <RootRef rootRef={ref}>
      <Card className={classes.root}>
        <CardMedia
          {...rootProps}
          className={classes.media}
          image={profile.image}
          // component="img"
          title="Update Profile picture"
        >
          <input {...getInputProps()} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            joined date
          </Typography>
        </CardContent>
        <CardActions>
          <Box flexGrow={1}>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <FaSignOutAlt />
              </IconButton>
            </Tooltip>
          </Box>
          <Box flexGrow={1}>
            <Tooltip title="Edit Profile">
              <IconButton>
                <FaEdit />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    </RootRef>
  );
}
