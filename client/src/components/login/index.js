import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import firebase from "../../firebase";
import fbApp from "firebase/app";
import Fade from "react-reveal/Fade";

const Login = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Formato de email incorrecto")
      .required("Requerido"),
    password: yup.string().required("Requerido"),
  });

  return (
    <Row className="mt-4 pt-4">
      <Col md={{ span: 4, offset: 4 }}>
        <Fade>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              //////// login ////////
              firebase
                .auth()
                .setPersistence(fbApp.auth.Auth.Persistence.SESSION)
                .then(() => {
                  return firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.password)
                    .then((res) => {
                      alert("Bienvenido");
                      console.log(res);
                    });
                })
                .catch((error) => {
                  alert("Datos incorrectos");
                  console.log(error.code);
                  console.log(error.message);
                  setSubmitting(false);
                });
              //
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {/* email */}
                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    maxLength="15"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="email"
                    component="div"
                  />
                </Form.Group>
                {/* password */}
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    maxLength="15"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="password"
                    component="div"
                  />
                </Form.Group>
                {/* butto */}
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>
        </Fade>
      </Col>
    </Row>
  );
};

export default Login;
