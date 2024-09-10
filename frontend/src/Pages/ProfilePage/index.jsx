import { Button } from "primereact/button";
import "./style.css";
import { Formik, Form } from "formik";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import { Password } from "primereact/password";
import {
  changePasswordRequest,
  getProfileData,
  profileUpdateRequest,
} from "../../redux/Slice/profileSlice";
import { handleLogout } from "../../redux/Slice/authSlice";

const Profile = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { profileData, isCreated } = useSelector((store) => store.profile);
  //   const { isCreated } = useSelector((store) => store.registration);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    last_name: "",
    email: "",
  });
  const [formPassword] = useState({
    curPwd: "",
    newPwd: "",
    conPwd: "",
  });
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
  });
  const SignupSchema2 = Yup.object().shape({
    curPwd: Yup.string()
      .nullable()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "Password must be atleast 8 letters.Include with 1 uppercase character,1 special character,1 number"
      )
      .required("Current Password is required"),
    newPwd: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "Password must be atleast 8 letters.Include with 1 uppercase character,1 special character,1 number"
      )
      .required("New Password is required"),
    conPwd: Yup.string()
      .oneOf([Yup.ref("newPwd"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (isCreated) {
      dispatch(getProfileData());
    }
  }, [isCreated]);
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);
  useEffect(() => {
    // if (userData && userData?._id) {
    //   let setData = {
    //     id: userData?._id,
    //     first_name: userData?.first_name,
    //     last_name: userData?.last_name,
    //     email: userData?.email,
    //   };
    //   setFormValue(setData);
    // }
    if (profileData && profileData?._id) {
      let setData = {
        id: profileData?._id,
        name: profileData?.name,
        last_name: profileData?.last_name,
        email: profileData?.email,
      };
      setFormValue(setData);
    }
  }, [profileData]);

  return (
    <>
      <div className="flex justify-content-end">
        <Button
          label="logout"
          type="button"
          // icon="pi pi-check"
          className="p-button-outlined p-button-success mr-2 mb-2 w-7rem"
          onClick={() => {
            dispatch(handleLogout());
          }}
        />
      </div>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index);
        }}
      >
        <TabPanel header="Profile" leftIcon="pi pi-user mr-2" className="mx-2">
          <Formik
            initialValues={formValue}
            validationSchema={SignupSchema}
            enableReinitialize
            onSubmit={(values) => {
              dispatch(profileUpdateRequest(values));
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div className="grid p-fluid mt-1">
                  <div className="field col-12 md:col-4 mb-1">
                    <label htmlFor="name" className="required">
                      First Name
                    </label>
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
                  <div className="field col-12 md:col-4 mb-1">
                    <label htmlFor="last_name" className="required">
                      Last Name
                    </label>
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
                  <div className="field col-12 md:col-4 mb-1">
                    <label htmlFor="email" className="required">
                      Email
                    </label>
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
                </div>
                <div className="field mb-0 mt-5 flex justify-content-end">
                  <Button
                    label="Save"
                    type="submit"
                    icon="pi pi-check"
                    className="p-button-outlined p-button-success mr-2 mb-2 w-7rem"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </TabPanel>
        <TabPanel header="Security" leftIcon="pi pi-lock mr-2">
          <Formik
            initialValues={formPassword}
            validationSchema={SignupSchema2}
            onSubmit={(values) => {
              let sendData = {
                current_password: values.curPwd,
                new_password: values.newPwd,
              };
              dispatch(changePasswordRequest(sendData));
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div className="grid p-fluid mt-1">
                  <div className="field col-12 md:col-4 mb-1">
                    <label htmlFor="curPwd" className="required">
                      Current password
                    </label>
                    <Password
                      id="curPwd"
                      name="curPwd"
                      placeholder="Enter current password"
                      type="text"
                      value={values?.curPwd}
                      onChange={handleChange}
                      className={classNames({
                        "p-invalid": errors.curPwd && touched.curPwd,
                      })}
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
                      {errors.curPwd && touched.curPwd ? errors.curPwd : ""}
                    </div>
                  </div>
                  <div className="field col-12 md:col-4 mb-1">
                    <label htmlFor="newPwd" className="required">
                      New password
                    </label>
                    <Password
                      id="newPwd"
                      name="newPwd"
                      placeholder="Enter new password"
                      type="text"
                      value={values?.newPwd}
                      onChange={handleChange}
                      className={classNames({
                        "p-invalid": errors.newPwd && touched.newPwd,
                      })}
                      feedback={false}
                      toggleMask
                    />
                    {/* {errors.newPwd && touched.newPwd ? (
                      <small className="p-invalid error">{errors.newPwd}</small>
                    ) : null} */}
                    <div
                      className="p-invalid error text-xs"
                      style={{
                        minHeight: "1.1rem",
                        marginTop: "3px",
                        color: "red",
                      }}
                    >
                      {errors.newPwd && touched.newPwd ? errors.newPwd : ""}
                    </div>
                  </div>
                  <div className="field col-12 md:col-4 mb-1">
                    <label htmlFor="conPwd" className="required">
                      Confirm new password
                    </label>
                    <Password
                      id="conPwd"
                      name="conPwd"
                      placeholder="Enter confirm new password"
                      type="text"
                      value={values?.conPwd}
                      onChange={handleChange}
                      className={classNames({
                        "p-invalid": errors.conPwd && touched.conPwd,
                      })}
                      feedback={false}
                      toggleMask
                    />
                    {/* {errors.conPwd && touced.conPwd ? (
                      <small className="p-invalid error">{errors.conPwd}</small>
                    ) : null} */}
                    <div
                      className="p-invalid error text-xs"
                      style={{
                        minHeight: "1.1rem",
                        marginTop: "3px",
                        color: "red",
                      }}
                    >
                      {errors.conPwd && touched.conPwd ? errors.conPwd : ""}
                    </div>
                  </div>
                </div>
                <div className="grid p-fluid mt-1">
                  <div className="field col-12 md:col-12 mb-1 flex justify-content-end">
                    {/* <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2 w-7rem" onClick={() => setActiveIndex(0)} /> */}
                    <Button
                      // disabled={submitted}
                      label="Update"
                      type="submit"
                      icon="pi pi-check"
                      className="p-button-outlined p-button-success mr-2 mb-2 w-7rem"
                      // onClick={() => dataSave()}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </TabPanel>
      </TabView>
    </>
  );
};
export default Profile;
