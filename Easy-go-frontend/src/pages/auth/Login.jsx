/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import bg from "../../assets/images/bg.svg";
import avatar from "../../assets/images/avatar.svg";
import wave from "../../assets/images/wave.png";
import "./login.css";
import { useForm } from "react-hook-form";
import PageTitle from "../../utils/PageTitle";
import {
  Link,
  Route,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, loginUser } from "../../features/auth/authSlice";
import { userRegistration } from "../../features/users/serviceApi";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const cartItems = location.state?.cartItems || [];
  const autoAddToCart = location.state?.autoAddToCart;
  cartItems &&
    localStorage.setItem(
      "temp_product",
      JSON.stringify({ cartItems, autoAddToCart })
    );

  const data = localStorage.getItem("temp_product");

  const { cartItems: product, autoAddToCart: condition } =
    JSON.parse(data) || {};

  const { email, isLoading, isError, error, displayName, photoURL } =
    useSelector((state) => state.auth);
  console.log(
    "isError",
    isError,
    "erromessage",
    error,
    "loadingState",
    isLoading
  );
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // password visible hidden
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";
  const handleLogin = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    );
  };
  const handlerGoogleSingIn = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (email) {
      userRegistration(dispatch, { email, name: displayName, photoURL });
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // useEffect(() => {
  //   if (isError) {
  //     alert(error);
  //   }
  // }, [isError, error]);

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
    <div className="lg:ms-0 ms-0 pt-16 overflow-hidden">
      <PageTitle title="Log in" />
      <img className="wave" src={wave} alt="Wave" />
      <div className="container1 gap-[7rem] lg:grid grid-cols-2">
        <div className="img">
          <img src={bg} alt="Background" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit(handleLogin)} className="login-form">
            <img src={avatar} alt="Avatar" className="avatar" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  {...register("email", {
                    required: true,
                  })}
                  type="text"
                  className="input"
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div relative">
                <h5>Password</h5>
                <input
                  {...register("password", {
                    required: true,
                  })}
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
            <a href="#">Forgot Password?</a>
            {isError && error ? (
              <p className="text-start my-2 font-bold text-red-500">
                Password or Email not matched
              </p>
            ) : (
              ""
            )}
            <input
              type="submit"
              className="bg-[#38d39f] w-full py-2 rounded-3xl my-2 text-xl text-white  hover:bg-white duration-300 hover:text-[#38d39f] border-[#38d39f] border-[1px] uppercase cursor-pointer"
              value={`${isLoading ? "Loading..." : "Login"}`}
            />
            <div
              onClick={handlerGoogleSingIn}
              className="flex text-white rounded-3xl justify-center items-center py-2 gap-2 px-2 bg-[#38d39f] cursor-pointer h-[50px] hover:bg-white duration-300 hover:text-[#38d39f] border-[#38d39f] border-[1px]"
            >
              <p className="font-semibold ">CONTINUE WITH GOOGLE</p>
              <i className="fa-brands fa-google-plus-g lg:text-2xl"></i>
            </div>
            <div className="flex justify-center gap-1 mt-3 items-center text-[0.9rem] text-[#999] ">
              <p>No Account? </p>
              <Link
                className="text-[0.9rem] text-[#999] hover:text-[#38d39f]"
                to="/registration"
              >
                Register Now
              </Link>
            </div>
            {/* a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: #38d39f;
} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
