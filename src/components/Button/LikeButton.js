import React from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import {
  isEmpty,
  useFirestore,
  useFirestoreConnect
} from "react-redux-firebase";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@material-ui/core";

const LikeButton = ({ postId }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const firestore = useFirestore();

  useFirestoreConnect({
    collection: "likes",
    where: ["liker", "==", auth.uid],
    storeAs: "userLikesData"
  });

  const likesData = useSelector(
    ({ firestore: { ordered } }) => ordered.userLikesData
  );

  const likedPost = likesData && likesData.find(like => like.postId === postId);
  const handlLike = () => {
    return firestore.add({ collection: "likes" }, { postId, liker: auth.uid });
  };

  const handleUnlike = () => {
    return firestore.delete({ collection: "likes", doc: likedPost.id });
  };

  let likeButtonMarkUp;
  if (isEmpty(profile)) {
    likeButtonMarkUp = (
      <Tooltip title="Like">
        <Link to="/login">
          <IconButton>
            <FaRegThumbsUp />
          </IconButton>
        </Link>
      </Tooltip>
    );
  } else if (!!likedPost) {
    likeButtonMarkUp = (
      <Tooltip title="Unlike">
        <IconButton onClick={handleUnlike}>
          <FaThumbsUp color="green" />
        </IconButton>
      </Tooltip>
    );
  } else {
    likeButtonMarkUp = (
      <Tooltip title="like">
        <IconButton onClick={handlLike}>
          <FaRegThumbsUp />
        </IconButton>
      </Tooltip>
    );
  }
  return likeButtonMarkUp;
};

export default LikeButton;
