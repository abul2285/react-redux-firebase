import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "react-redux-firebase";
import { FaBell } from "react-icons/fa";
import {
  Badge,
  IconButton,
  MenuList,
  Typography,
  Menu
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  firestoreConnect([`notifications`]);
  const notifications = useSelector(
    ({ firestore: { notifications } }) => notifications
  );

  const handleBellMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleBellMenuClose = () => {
    seteAnchorEl(null);
  };

  const profile = useSelector(({ firebase: { profile } }) => profile);
  const unreadNotification = notifications.filter(item => !item);
  let notiBell;
  if (isEmpty(profile)) {
    notiBell = (
      <Tooltip title="Notification">
        <Link to="/login">
          <IconButton>
            <FaBell />
          </IconButton>
        </Link>
      </Tooltip>
    );
  } else if (unreadNotification.length) {
    notiBell = (
      <Tooltip title="Notification">
        <Badge badgeContent={unreadNotification.length}>
          <IconButton>
            <FaBell />
          </IconButton>
        </Badge>
      </Tooltip>
    );
  } else {
    notiBell = (
      <Tooltip title="Notification">
        <IconButton>
          <FaBell />
        </IconButton>
      </Tooltip>
    );
  }

  let notiList;
  if (unreadNotification.length) {
    unreadNotification.map(({ sender, type, time }) => {
      <MenuList onClick={handleBellMenuClose}>
        <Link to="/somewhere">
          <Typography variant="body1" color="textPrimary">
            {sender} {type} on your post at {time}
          </Typography>
        </Link>
      </MenuList>;
    });
  } else {
    notiList = (
      <Typography variant="body1" color="textPrimary">
        You have no notification yet
      </Typography>
    );
  }

  return (
    <>
      <div onClick={handleBellMenuOpen}>{notiBell}</div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleBellMenuClose}
      >
        {notiList}
      </Menu>
    </>
  );
};

export default Notification;
