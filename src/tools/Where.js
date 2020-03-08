import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
const myProjectsReduxName = "myProjects";

export const withWhere = compose(
  firestoreConnect(props => [
    { collection: "likes" },
    {
      collection: "projects",
      where: [["uid", "==", "123"]],
      storeAs: myProjectsReduxName
    }
  ]),
  connect((state, props) => ({
    projects: state.firestore.data.projects,
    myProjects: state.firestore.data[myProjectsReduxName] // use storeAs path to gather from redux
  }))
);
