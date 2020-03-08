import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, Divider } from "@material-ui/core";
import {
  firebaseConnect,
  useFirestoreConnect,
  firestoreConnect,
  populate,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentForm from "../Comment/CommentForm";
import Comment from "../Comment/Comment";
import { useSelector, connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import DeleteButton from "../Button/DeleteButton";
import LikeButton from "../Button/LikeButton";

dayjs.extend(relativeTime);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    width: "100%",
    margin: "10px auto"
  },
  media: {
    height: "100%"
    // paddingTop: "56.25%" // 16:9
  },

  commentSection: {
    color: "#8080e6f7",
    display: "flex",
    padding: "10px 15px",
    marginLeft: "5px",
    borderRadius: "20px",
    backgroundColor: "#7777772e"
  },
  commenterComment: {
    color: "#b1b1b1",
    marginLeft: "8px"
  },
  commenterName: {
    padding: 0,
    margin: 0
  }
}));

function CommentSection(name, comment) {
  const classes = useStyles();

  return (
    <div className={classes.commentSection}>
      <h4 className={classes.commenterName}>
        <Link to={`/${name}`}>{name}</Link>
        <span className={classes.commenterComment}>{comment}</span>
      </h4>
    </div>
  );
}

const populates = [{ child: "commenter", root: "users" }];

const collection = "comments";
const withPopulatedComments = compose(
  firestoreConnect(() => [
    {
      collection,
      orderBy: ["createdAt", "desc"],
      populates
    }
  ]),
  connect(state => ({
    comments: populate(state.firestore, collection, populates)
  }))
);

const Post = ({ post, id, comments }) => {
  const classes = useStyles();
  useFirestoreConnect([`comments`]);

  let items;
  if (comments) {
    items = Object.entries(comments);
  }

  // console.log(comments);
  let postMarkUp = post ? (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={post.owner.image}>
            R
          </Avatar>
        }
        action={<DeleteButton post={post} postId={id} />}
        title={post.owner.username}
        subheader={dayjs(post.createdAt).fromNow()}
      />
      {post.image ? (
        <CardMedia
          className={classes.media}
          image={post.image}
          title="Paella dish"
          component="img"
        />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          {/* <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton> */}
          <LikeButton postId={id} />
        </Box>
        <Box flexGrow={1}>
          <CommentForm postId={id} />
          <span>
            {items && items.filter(item => item[1].postId === id).length | 0}
          </span>
        </Box>
      </CardActions>
      <Divider />
      {!isLoaded(items) ? (
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          subheader={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
        />
      ) : isEmpty(items) ? (
        "comments is empty"
      ) : (
        items.map(item => {
          if (item[1].postId === id)
            return (
              <Comment
                CommentSection={CommentSection}
                key={item[0]}
                comment={item[1]}
              />
            );
        })
      )}
    </Card>
  ) : null;

  return postMarkUp;
};

export default memo(withPopulatedComments(Post));
