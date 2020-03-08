import React from "react";
import {
  Box,
  makeStyles,
  Grid,
  CardActions,
  Tooltip,
  IconButton,
  Paper
} from "@material-ui/core";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile";

import {
  isLoaded,
  isEmpty,
  useFirebaseConnect,
  useFirestoreConnect,
  firestoreConnect,
  populate,
  withFirestore,
  firebaseConnect
} from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { compose } from "redux";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingProfile from "../tools/LoadingProfile";
import LoadingPost from "../tools/LoadingPost";

// import Post from "../components/Post/Post";

const useStyle = makeStyles(theme => ({}));

const populates = [{ child: "owner", root: "users" }];

const collection = "posts";
const withPopulatedPosts = compose(
  firestoreConnect(props => [
    {
      collection,
      orderBy: ["createdAt", "desc"],
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

  let items;
  if (props.posts) {
    items = Object.entries(props.posts);
  }
  return (
    <>
      <Grid
        container
        justify="center"
        spacing={3}
        style={{ margin: "20px auto" }}
      >
        <Grid item sm={5} md={5}>
          {!isLoaded(profile) ? (
            <LoadingProfile />
          ) : // "loading.."
          isEmpty(profile) ? (
            <Paper variant="outlined">
              <CardActions>
                <Box flexGrow={1}>
                  <Tooltip title="Login">
                    <Link to="/login">
                      <IconButton>
                        <FaSignInAlt />
                      </IconButton>
                      Login
                    </Link>
                  </Tooltip>
                </Box>
                <Box flexGrow={1}>
                  <Tooltip title="SingUp">
                    <Link to="/signup">
                      <IconButton>
                        <FaUserPlus />
                      </IconButton>
                      Singup
                    </Link>
                  </Tooltip>
                </Box>
              </CardActions>
            </Paper>
          ) : (
            <Profile profile={profile} />
          )}
        </Grid>
        <Grid item sm={5} md={5}>
          {!isLoaded(items)
            ? [1, 2, 3, 4, 5, 6].map(i => <LoadingPost key={i} />)
            : isEmpty(items)
            ? "No post is abailable"
            : items.map(item => {
                return <Post post={item[1]} key={item[0]} id={item[0]} />;
              })}
        </Grid>
      </Grid>
    </>
  );
};

export default withPopulatedPosts(Home);
