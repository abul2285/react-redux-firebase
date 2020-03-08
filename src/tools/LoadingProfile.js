import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Skeleton from "@material-ui/lab/Skeleton";
import { Box, CardActions } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    padding: "56.25%",
    objectFit: "cover"
  }
}));

export default function LodadingProfile() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />

      <CardContent>
        {
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        }
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
