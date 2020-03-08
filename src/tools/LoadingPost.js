import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    marginBottom: "20px"
  },
  media: {
    padding: "56.25%",
    objectFit: "cover"
  }
}));

export default function LoadingPost() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton
            animation="wave"
            height={10}
            width="60%"
            style={{ marginBottom: 6 }}
          />
        }
      />

      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardContent>
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
      <CardActions>
        <Box flexGrow={1}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </Box>
        <Box flexGrow={1}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </Box>
      </CardActions>
    </Card>
  );
}
