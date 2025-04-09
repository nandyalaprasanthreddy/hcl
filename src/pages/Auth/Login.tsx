import { Formik, Form } from "formik";
import * as yup from "yup";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";
import { axiosInstance } from "../../utils/axiosInstance";


type Values = {
  email: string;
  password: string;
};
const Login = () => {
  
const handlelogin =async(values:Values)=>{
  const response = await axiosInstance.get("/login")
  console.log(response,values);
}
  const InitialValues = {
    email: "",
    password: "",
  };

  const ValidationSchema = yup.object({
    email: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    handlelogin(values)
    resetForm();
  };

  return (
    <PageLayout title="Login-Form:">
      <Formik
        initialValues={InitialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, errors }) => (
          <Form>
            <TextInput
              id="login-email-field"
              label="Email"
              name="email"
              type="email"
              onChange={(e) => setFieldValue("email", e.target.value)}
              error={errors.email}
            />
            <TextInput
              id="login-password-field"
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setFieldValue("password", e.target.value)}
              error={errors.password}
            />
            <div>
              <Button
                type="submit"
                label="Submit"
                className="p-2 bg-blue-500 text-white rounded "
              />
            </div>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};
export default Login;
