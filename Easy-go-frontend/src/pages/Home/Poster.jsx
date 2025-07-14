import postBg1 from "../../assets/PosterImg/postBg1.png";
import postBg2 from "../../assets/PosterImg/postBg2.png";
import rotateBG from "../../assets/PosterImg/rotateBG.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogs } from "../../features/blog/serviceApi";
const Poster = () => {
  const { blogs, isLoading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    const query = {
      limit: 3,
    };
    if (!blogs.length) {
      getBlogs(dispatch, query);
    }
  }, [blogs.length, dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="lg:mb-56 lg:mt-20">
          {blogs.map((blog, i) => (
            <div key={blog._id}>
              {i % 2 === 0 ? (
                <div>
                  {" "}
                  <div className="flex justify-between items-center">
                    <img
                      className="h-[300px] hidden lg:flex"
                      src={postBg1}
                      alt=""
                    />
                    <img
                      className="h-[500px] hidden lg:flex"
                      src={postBg2}
                      alt=""
                    />
                  </div>
                  <div className="lg:mt-[-398px] hero lg:relative lg:z-50 lg:ms-8">
                    <div className="flex gap-4 justify-center items-center lg:flex-row flex-col-reverse ">
                      <div className="hidden lg:flex">
                        <img
                          src={`${import.meta.env.VITE_APP_BASE_URL}/blogs/${
                            blog?.image
                          }`}
                          className=" "
                        />
                      </div>
                      <div className="lg:px-8 py-5 lg:py-5 flex flex-col justify-center lg:block">
                        <h1 className="lg:text-3xl text-xl font-bold lg:w-[70%] text-center lg:text-left">
                          {blog?.title}
                        </h1>
                        <div
                          className="lg:hidden my-7"
                          style={{
                            backgroundImage: `url(${postBg1})`,
                            backgroundRepeat: "no-repeat",
                            borderRadius: "0px 20px 20px 0px",
                            backgroundPosition: "left",
                            backgroundSize: "50%",
                            marginLeft: "-40px",
                          }}
                        />
                        <p className="lg:text-lg  text-sm text-[#777E90] lg:py-6 px-5 lg:px-0 lg:w-[70%] text-justify lg:text-left">
                          {blog?.description.length > 300
                            ? blog?.description?.slice(0, 297) + "..."
                            : blog?.description}
                        </p>
                        <Link
                          to={`/blog/${blog?._id}`}
                          className="hover:text-black uppercase pe-[22px] lg:absolute  font-semibold w-36 rounded-lg py-2 mt-4 mx-auto text-white bg-[#3CBD96] border-[1px] border-[#ABE1D1]"
                        >
                          Explore now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center  lg:mt-[140px]">
                    <img
                      className="h-[500px] hidden lg:flex rotate-180"
                      src={postBg2}
                      alt=""
                    />
                    <img
                      className="h-[300px] hidden lg:flex rotate-180"
                      src={postBg1}
                      alt=""
                    />
                  </div>
                  <div className="lg:mt-[-308px]  lg:relative lg:z-50 lg:ms-8 lg:mb-16">
                    <div className="flex justify-center items-center lg:flex-row flex-col-reverse ">
                      <div className=" py-5 lg:py-5 flex flex-col justify-center lg:block lg:ps-10 lg:mt-[-50px]">
                        <h1 className="lg:text-3xl text-xl font-bold lg:w-[70%] text-center lg:text-left">
                          {blog?.title}
                        </h1>
                        <div
                          className=" lg:hidden my-4 flex items-center h-[400px]"
                          style={{
                            backgroundImage: `url(${rotateBG})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right",
                            backgroundSize: "50%",
                            marginRight: "-40px",
                          }}
                        />
                        <p className="lg:text-lg px-5 lg:px-0 text-sm text-[#777E90] lg:py-6 lg:w-[70%] text-justify lg:text-left">
                          {blog?.description.length > 300
                            ? blog?.description?.slice(0, 297) + "..."
                            : blog?.description}
                        </p>
                        <Link
                          to={`/blog/${blog?._id}`}
                          className="hover:text-black uppercase pe-[22px] lg:absolute  font-semibold w-36 rounded-lg py-2 mt-4 mx-auto text-white bg-[#3CBD96] border-[1px] border-[#ABE1D1]"
                        >
                          Explore now
                        </Link>
                      </div>
                      <div className="hidden lg:flex ">
                        <img
                          src={`${import.meta.env.VITE_APP_BASE_URL}/blogs/${
                            blog?.image
                          }`}
                          className=" mt-[-100px] pe-10 h-62 w-100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Poster;
