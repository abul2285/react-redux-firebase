import React from "react";
import { CardActions, CardHeader, Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  commentWrapper: {
    display: "flex",
    padding: "2px",
    alignItems: "center"
  },
  commentImgeWrapper: {
    widht: "60px"
  },
  commentTexWrapper: {
    backgroundColor: "transparent",
    flexGrow: "1"
  }
}));

const Comment = ({ CommentSection, comment }) => {
  const classes = useStyles();
  return (
    // <CardActions className={classes.commentWrapper}>
    //   <CardHeader
    //     avatar={
    //       <Avatar aria-label="recipe" src={comment.commenter.image}>
    //         R
    //       </Avatar>
    //     }
    //     subheader={CommentSection(comment.commenter.username, comment.body)}
    //   />
    // </CardActions>
    <div className={classes.commentWrapper}>
      <div className={classes.commentImgeWrapper}>
        <Avatar aria-label="recipe" src={comment.commenter.image}>
          R
        </Avatar>
      </div>
      <div className={classes.commentTexWrapper}>
        {CommentSection(comment.commenter.username, comment.body)}
      </div>
    </div>
  );
};

export default Comment;
