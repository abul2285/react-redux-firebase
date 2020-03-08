import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { FaTrash, FaHandPointDown } from "react-icons/fa";
import { useFirestore, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

const DeleteButton = ({ post, postId }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const firestore = useFirestore();

  const handleDelete = () => {
    return firestore.delete({ collection: "posts", doc: postId });
  };

  let deleteButtonMarkUp;
  if (isEmpty(profile)) {
    deleteButtonMarkUp = null;
  } else if (post.owner === auth.uid) {
    deleteButtonMarkUp = (
      <Tooltip title="Delete" placement="top">
        <IconButton onClick={handleDelete}>
          <FaTrash />
        </IconButton>
      </Tooltip>
    );
  } else {
    deleteButtonMarkUp = (
      <Tooltip title="Delete" placement="top">
        <IconButton>
          <FaHandPointDown />
        </IconButton>
      </Tooltip>
    );
  }

  return deleteButtonMarkUp;
};

export default DeleteButton;
