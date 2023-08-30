//React/Next/ThirdPart/Custom
import { useEffect } from "react";

import { useFormik } from "formik";

import { useSignupMutation } from "../../store/services/authApi";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

//Assets/Imgs/Icons
import { BiRightArrowCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const SignUpPage = () => {
  const [SignUp, { data: signupData, error: signupError, isError: isSignupError, isSuccess: isSignupSuccess }] = useSignupMutation();

  const toast = useToast();
  const navigate = useNavigate();

  //handling forms using formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,

    onSubmit: (values, action) => {
      SignUp(values);
      action.resetForm();
    },
  });

  //displaying toast on successfull signup and redirecting to login page
  useEffect(() => {
    if (isSignupSuccess) {
      toast({
        title: "Success",
        status: "success",
        isClosable: true,
      });

      navigate("/");
    }
  }, [isSignupSuccess, signupError]);

  //displaying toast on error
  useEffect(() => {
    if (isSignupError) {
      console.log(signupError);
      toast({
        title: `Error Creating Account, Please Try Again`,
        status: "error",
        isClosable: true,
      });
    }
  }, [isSignupError, signupError]);

  return (
    <main className="w-screen h-screen flex p-10">
      <section className="flex-1 flex items-center justify-center text-black dark:text-white">
        <div className="w-3/5">
          <form onSubmit={handleSubmit} className="flex flex-col  text-black dark:text-white">
            <h1 className="font-bold text-3xl text-center">Register Here!</h1>
            <p className="font-medium text-md  mt-4">Enter Email</p>
            <div className="flex items-center w-full bg-slate-100 my-2 p-4 rounded-md focus:outline-cyan-500">
              <HiOutlineMail className="inline-block mr-2 " />
              <input
                className="bg-slate-100 w-full focus:outline-none text-slate-700"
                type="email"
                name="email"
                id="email"
                placeholder="abc@company.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && touched.email ? <p className="text-red-600">{errors.email}</p> : null}

            <p className="font-medium text-md  mt-4">Enter Password</p>
            <div className="flex items-center w-full bg-slate-100 my-2 p-4 rounded-md focus:outline-cyan-500">
              <RiLockPasswordLine className="inline-block mr-2 " />
              <input
                className="bg-slate-100 w-full focus:outline-none text-slate-700"
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.password && touched.password ? <p className="text-red-600">{errors.password}</p> : null}

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                S I G N U P
              </button>
            </div>
            <h3 className="font-normal text-lg  text-center mt-4">
              Already Registered?{" "}
              <span className="font-bold text-primary-700 cursor-pointer" onClick={() => navigate("/")}>
                Login here!
              </span>
            </h3>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
