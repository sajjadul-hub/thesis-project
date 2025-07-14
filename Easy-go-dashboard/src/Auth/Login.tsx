import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div className="h-80 w-full md:w-1/2 mx-auto flex justify-center items-center shadow-2xl my-10">
      <div>
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-700" role="alert">
                {errors?.email?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-red-700" role="alert">
                {errors?.password?.message}
              </p>
            )}

            <label>
              <Link to="" className="text-xs hover:underline">
                Forgot Password?
              </Link>
            </label>
          </div>

          <div className="form-control w-full my-3">
            <input className="btn btn-accent" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
