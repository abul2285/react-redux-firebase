import React from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile";
import PostForm from "../components/Post/PostForm";
import { Link } from "react-router-dom";
import {
  isLoaded,
  isEmpty,
  useFirebaseConnect,
  useFirestoreConnect,
  firestoreConnect,
  populate,
  withFirestore
} from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { compose } from "redux";
// import Post from "../components/Post/Post";

const useStyle = makeStyles(theme => ({
  banner: {
    height: "calc(100vh - 56px)",
    display: "grid",
    placeItems: "center",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 64px)"
    }
  }
}));

const populates = [{ child: "owner", root: "users", keyProp: "key" }];

const collection = "posts";
const withPopulatedPosts = compose(
  firestoreConnect(props => [
    {
      collection,
      populates
    }
  ]),
  connect((state, props) => ({
    posts: populate(state.firestore, collection, populates)
  }))
);
const Home = props => {
  const classes = useStyle();
  const profile = useSelector(({ firebase: { profile } }) => profile);
  useFirestoreConnect([`posts`]);
  const posts = useSelector(state => state.firestore.ordered.posts);
  console.log(props.posts);

  return (
    <>
      <Box className={classes.banner}>
        <Box width="500px">hi</Box>
      </Box>
      <Post />
      <Grid container justify="center" spacing={3}>
        <Grid item sm={5} md={5}>
          {isLoaded(profile) ? (
            <Profile profile={profile} />
          ) : (
            <h1>loading.....</h1>
          )}
        </Grid>
        <Grid item sm={5} md={5}>
          {!isLoaded(posts)
            ? "loading.."
            : isEmpty(posts)
            ? "Post is empty"
            : posts.map(post => {
                return <Post post={post} key={post.createdAt} />;
              })}
        </Grid>
      </Grid>
    </>
  );
};

export default withPopulatedPosts(Home);
