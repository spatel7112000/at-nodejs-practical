import { Button } from "primereact/button";
import "./style.css";
import { Formik, Form } from "formik";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLoginRequest } from "../../redux/Slice/authSlice";
import { Password } from "primereact/password";
const Login = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValue] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .nullable()
      .required("Please enter email.")
      .email("Please enter valid email."),
    password: Yup.string().trim().nullable().required("Please enter password."),
  });
  return (
    <div className="mainLogin ">
      <div className="mainLoginDiv">
        <Formik
          initialValues={formValue}
          validationSchema={SignupSchema}
          enableReinitialize
          onSubmit={(values) => {
            dispatch(adminLoginRequest(values));
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className="">
                <div className="text-center font-semibold mb-4 text-2xl">
                  Login
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
                  <a href="/registration">Registration</a>
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
export default Login;
