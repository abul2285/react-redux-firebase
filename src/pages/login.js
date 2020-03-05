import React from "react";
import {
  Backdrop,
  Paper,
  TextField,
  Typography,
  Button
} from "@material-ui/core";
import { withFormik, Form, Field, Formik } from "formik";
import { object, string } from "yup";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const Login = () => {
  const firebase = useFirebase();
  return (
    <Backdrop open>
      <Paper variant="elevation" elevation={6} style={{ padding: "10px 20px" }}>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={object({
            email: string()
              .email("Email not valid")
              .required("Email is require"),
            password: string()
              .min(8, "Password must be 8 character or longer")
              .required("Password is require")
          })}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            firebase.login({ email: values.email, password: values.password });
            resetForm();
            window.history.push("/");
          }}
        >
          {({ errors, touched, isSubmiitting }) => (
            <Form action="" style={{ width: "500px" }}>
              <Typography variant="h4" color="textSecondary" align="center">
                Login
              </Typography>
              <Field
                type="email"
                as={TextField}
                name="email"
                variant="outlined"
                margin="normal"
                helperText={touched.email && errors.email && errors.email}
                error={touched.email && errors.email ? true : false}
                fullWidth
              />
              <Field
                type="password"
                as={TextField}
                helperText={
                  touched.password && errors.password && errors.password
                }
                error={touched.password && errors.password ? true : false}
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button
                variant="contained"
                fullWidth
                disabled={isSubmiitting}
                type="submit"
                size="large"
                color="primary"
                style={{ margin: "5px 0" }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" color="textPrimary">
          don't have accoutn ? <Link to="/signup">sign up</Link>
        </Typography>
      </Paper>
    </Backdrop>
  );
};

export default Login;
