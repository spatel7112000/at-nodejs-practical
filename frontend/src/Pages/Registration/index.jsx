import { Button } from "primereact/button";
import "./style.css";
import { Formik, Form } from "formik";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminRegisterRequest } from "../../redux/Slice/registration";
import { Password } from "primereact/password";
const Registration = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { isCreated } = useSelector((store) => store.registration);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValue] = useState({
    id: "",
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (isCreated) {
      navigate("/login");
    }
  }, [isCreated]);
  const SignupSchema = Yup.object().shape({
    name: Yup.string().trim().nullable().required("Please enter First Name."),
    last_name: Yup.string()
      .trim()
      .nullable()
      .required("Please enter Last Name."),
    email: Yup.string()
      .trim()
      .nullable()
      .required("Please enter email.")
      .email("Please enter valid email."),
    password: Yup.string()
      .trim()
      .nullable()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "Password must be atleast 8 letters.Include with 1 uppercase character,1 special character,1 number"
      )
      .required("Please enter password."),
  });
  return (
    <div className="mainLogin">
      <div className="mainLoginDiv">
        <Formik
          initialValues={formValue}
          validationSchema={SignupSchema}
          enableReinitialize
          onSubmit={(values) => {
            dispatch(adminRegisterRequest(values));
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className="">
                <div className="text-center font-semibold mb-4 text-2xl">
                  Registration
                </div>
                <div className="field mb-0">
                  <InputText
                    id="name"
                    name="name"
                    placeholder="Enter First Name"
                    type="text"
                    value={values?.name}
                    onChange={handleChange}
                    className={classNames(
                      {
                        "p-invalid": errors.name && touched.name,
                      },
                      "w-full"
                    )}
                  />
                  <div
                    className="p-invalid error text-xs"
                    style={{
                      minHeight: "1.1rem",
                      marginTop: "3px",
                      color: "red",
                    }}
                  >
                    {errors.name && touched.name ? errors.name : ""}
                  </div>
                </div>
                <div className="field mb-0">
                  <InputText
                    id="last_name"
                    name="last_name"
                    placeholder="Enter Last Name"
                    type="text"
                    value={values?.last_name}
                    onChange={handleChange}
                    className={classNames(
                      {
                        "p-invalid": errors.last_name && touched.last_name,
                      },
                      "w-full"
                    )}
                  />
                  <div
                    className="p-invalid error text-xs"
                    style={{
                      minHeight: "1.1rem",
                      marginTop: "3px",
                      color: "red",
                    }}
                  >
                    {errors.last_name && touched.last_name
                      ? errors.last_name
                      : ""}
                  </div>
                </div>
                <div className="field mb-0">
                  <InputText
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    type="text"
                    value={values?.email}
                    onChange={handleChange}
                    className={classNames(
                      {
                        "p-invalid": errors.email && touched.email,
                      },
                      "w-full"
                    )}
                  />
                  <div
                    className="p-invalid error text-xs"
                    style={{
                      minHeight: "1.1rem",
                      marginTop: "3px",
                      color: "red",
                    }}
                  >
                    {errors.email && touched.email ? errors.email : ""}
                  </div>
                </div>
                <div className="field mb-0">
                  <Password
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    type="Password"
                    value={values?.password}
                    onChange={handleChange}
                    className={classNames(
                      // {
                      //   "p-invalid": errors.password && touched.password,
                      // },
                      "password-class"
                    )}
                    invalid={errors.password && touched.password}
                    feedback={false}
                    toggleMask
                    style={{}}
                  />
                  <div
                    className="p-invalid error text-xs"
                    style={{
                      minHeight: "1.1rem",
                      marginTop: "3px",
                      color: "red",
                    }}
                  >
                    {errors.password && touched.password ? errors.password : ""}
                  </div>
                </div>
                <div className="text-right">
                  <a href="/login">Login</a>
                </div>
                <div className="field mb-0 mt-5">
                  <Button
                    label="Submit"
                    type="submit"
                    icon="pi pi-check"
                    className="p-button-outlined p-button-success mr-2 mb-2 w-full"
                    // onClick={() => dataSave()}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Registration;
