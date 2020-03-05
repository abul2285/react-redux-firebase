import React from "react";
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
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box } from "@material-ui/core";
import { firebaseConnect } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  avatar: {
    backgroundColor: red[500]
  }
}));

export default function Post({ post }) {
  const classes = useStyles();

  let postMarkUp = post ? (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={``} className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.body}
        subheader={post.createdAt}
      />
      <CardMedia className={classes.media} image="/" title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Box>
        <Box flexGrow={1}>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  ) : null;

  return postMarkUp;
}
