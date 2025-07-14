/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import bg from "../../assets/images/bg.svg";
import avatar from "../../assets/images/avatar.svg";
import wave from "../../assets/images/wave.png";
import "./login.css";
import { useForm } from "react-hook-form";
import PageTitle from "../../utils/PageTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUser, setUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../features/users/serviceApi";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { displayName, email, isError, error } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleSignUp = async (data) => {
    try {
      dispatch(
        createUser({
          email: data.email,
          password: data.password,
          displayName: data?.name,
          phoneNumber: data?.phoneNumber,
        })
      );
      userRegistration(dispatch, { ...data, registration: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (email && !isError) {
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, isError]);

  // password visible hidden
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", addcl);
        input.removeEventListener("blur", remcl);
      });
    };
  }, []);

  return (
    <div className="pt-5 overflow-hidden">
      <PageTitle title="Register" />
      <img className="wave" src={wave} alt="Wave" />
      <div className="container1 gap-[7rem] lg:grid grid-cols-2">
        <div className="img">
          <img src={bg} alt="Background" />
        </div>
        <div className="login-content">
          <form className="register" onSubmit={handleSubmit(handleSignUp)}>
            <img src={avatar} alt="Avatar" className="avatar" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Name</h5>
                <input
                  {...register("name", {
                    required: "Name is Required",
                  })}
                  type="text"
                  className="input"
                />
              </div>
            </div>
            {errors?.userName && (
              <p role="alert" className="text-[#b83535] text-start my-[-10px]">
                {errors?.userName?.message}
              </p>
            )}
            <div className="input-div pass">
              <div className="i">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                  type="email"
                  className="input"
                />
              </div>
            </div>
            {errors?.userEmail && (
              <p role="alert" className="text-[#b83535] text-start">
                {errors?.userEmail?.message}
              </p>
            )}
            <div className="input-div pass">
              <div className="i">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="div">
                <h5>Phone No</h5>
                <input
                  {...register("phoneNumber", {
                    required: true,
                    pattern: /^01[3-9]\d{8}$/,
                  })}
                  className="input"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 w-full">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            {errors?.telephone && (
              <p role="alert" className="text-[#b83535] text-start">
                {errors?.telephone?.message}
              </p>
            )}
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div relative">
                <h5>Password</h5>
                <input
                  {...register("password", {})}
                  type={passwordInputType}
                  className="input"
                />
                <i
                  onClick={passwordVisibility}
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash cursor-pointer z-50 absolute right-[18px] top-5"
                      : "fa-solid fa-eye cursor-pointer z-50 absolute right-[18px] top-5"
                  }
                ></i>
              </div>
            </div>
            {errors?.password && (
              <p role="alert" className="text-[#b83535] text-start">
                {errors?.password?.message}
              </p>
            )}
            {/* <p>
              By creating an account, I consent to the processing of my personal
              data in accordance with the PRIVACY POLICY
            </p> */}
            <input
              type="submit"
              className="bg-[#38d39f] w-full py-2 rounded-3xl my-2 text-xl text-white  hover:bg-white duration-300 hover:text-[#38d39f] border-[#38d39f] border-[1px] uppercase cursor-pointer"
              value="Registration"
            />
            <div className="flex justify-center gap-1 mt-1 items-center text-md text-[#999] ">
              <p>Already Have an account?</p>
              <Link
                className="text-[0.9rem] text-[#999] hover:text-[#38d39f]"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
