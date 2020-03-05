import React from "react";
import {
  Backdrop,
  Paper,
  TextField,
  Typography,
  Button
} from "@material-ui/core";
import { Form, Field, Formik } from "formik";
import { object, string } from "yup";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const SignUp = () => {
  const firebase = useFirebase();
  return (
    <Backdrop open>
      <Paper variant="elevation" elevation={6} style={{ padding: "10px 20px" }}>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: ""
          }}
          validationSchema={object({
            userName: string().required("User Name is require"),
            email: string()
              .email("Email not valid")
              .required("Email is require"),
            password: string()
              .min(8, "Password must be 8 character or longer")
              .required("Password is require")
          })}
          onSubmit={(values, { resetForm, setErrors, setSubmitting }) => {
            console.log(values);
            firebase.createUser(
              { email: values.email, password: values.password },
              { username: values.userName, email: values.email }
            );
            resetForm();
            window.history.push("/");
          }}
        >
          {({ errors, touched, isSubmiitting }) => (
            <Form action="" style={{ width: "500px" }}>
              <Typography variant="h4" color="textSecondary" align="center">
                SignUp
              </Typography>
              <Field
                type="text"
                as={TextField}
                helperText={
                  touched.userName && errors.userName && errors.userName
                }
                error={touched.userName && errors.userName ? true : false}
                name="userName"
                variant="outlined"
                margin="normal"
                fullWidth
                label="User Name"
              />
              <Field
                type="email"
                as={TextField}
                name="email"
                variant="outlined"
                margin="normal"
                helperText={touched.email && errors.email && errors.email}
                error={touched.email && errors.email ? true : false}
                fullWidth
                label="Email"
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
                label="Password"
              />

              <Button
                variant="contained"
                fullWidth
                label="User Name"
                disabled={isSubmiitting}
                type="submit"
                size="large"
                color="primary"
                style={{ margin: "5px 0" }}
              >
                SignUp
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" color="textPrimary">
          Already have an accoutn ? <Link to="/login">login</Link>
        </Typography>
      </Paper>
    </Backdrop>
  );
};

export default SignUp;
