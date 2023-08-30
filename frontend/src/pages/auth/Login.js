//React/Next/ThirdPart/Custom
import { useEffect } from "react";

import { useFormik } from "formik";
import { useLoginMutation } from "../../store/services/authApi";

import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/features/authSlice";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

const initialValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [login, { data: loginData, error: loginError, isError: isLoginError, isSuccess: isLoginSuccess }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      login(values);
      action.resetForm();
    },
  });

  useEffect(() => {
    if (isLoginSuccess) {
      toast({
        title: "Success",
        status: "success",
        isClosable: true,
      });
      console.log("LOGIN DATA = ", loginData);
      localStorage.setItem(
        "reloadCount",
        JSON.stringify({
          reloadCount: 0,
        })
      );
      dispatch(setUser({ data: loginData }));

      navigate("/dashboard");
    }
  }, [isLoginSuccess, loginError]);

  useEffect(() => {
    if (isLoginError) {
      console.log(loginError);
      toast({
        // title: `${JSON.stringify(loginError?.message)}`,
        title: `Incorrect Password`,
        status: "error",
        isClosable: true,
      });
    }
  }, [isLoginError, loginError]);

  return (
    <main className="h-screen  flex p-10">
      <section className="flex-1 flex items-center justify-center text-black dark:text-white">
        <div className="w-3/5">
          <form onSubmit={handleSubmit} className="flex flex-col text-black dark:text-white">
            <h1 className="font-bold text-3xl text-center">Login!</h1>
            <h3 className="font-normal text-lg  text-center mt-4">{/* Yaha tagline likh sakte hai! Suggest karo. */}</h3>
            <p className="font-medium text-md ">Enter Email</p>
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

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                L O G I N
              </button>
            </div>
            <h3 className="font-normal text-lg  text-center mt-4">
              New User?{" "}
              <span className="font-bold text-primary-700 cursor-pointer" onClick={() => navigate("/SignUp")}>
                Register here!
              </span>
            </h3>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
