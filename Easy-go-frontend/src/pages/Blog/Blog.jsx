/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import PageTitle from "../../utils/PageTitle";
import Banner from "../Home/Banner";
import postBg2 from "../../assets/PosterImg/postBg2.png";
import blogRotate from "../../assets/PosterImg/blogRotate.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getBlogs } from "../../features/blog/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import BlogSkeletonLoader from "./loader/BlogsLoader";

const Blog = () => {
  const { blogs, isLoading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs(dispatch);
  }, [dispatch]);

  return (
    <div className=" overflow-hidden mb-10">
      <PageTitle title="Blog" />
      <Banner></Banner>
      {isLoading ? (
        <div className="mt-9">
          <BlogSkeletonLoader width="40%" height="400px" />
          <BlogSkeletonLoader width="40%" height="400px" />
          <BlogSkeletonLoader width="40%" height="400px" />
          <BlogSkeletonLoader width="40%" height="400px" />
        </div>
      ) : (
        blogs.map((data, i) => (
          <div key={i} className="mt-9">
            {i % 2 === 0 ? (
              <div className=" hero lg:ms-8 mb-10 lg:mb-0">
                <div className="flex gap-4 justify-center items-center lg:flex-row flex-col ">
                  <div className=" lg:flex-1">
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}/blogs/${
                        data?.image
                      }`}
                      className="lg:h-[400px] w-[350px] lg:w-auto "
                    />
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${postBg2})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right",
                      backgroundSize: "28%",
                      marginRight: "-40px",
                    }}
                    className="lg:px-8 py-5 flex flex-col justify-center lg:block  items-center lg:flex-1 lg:h-[500px] mb-10"
                  >
                    <div className="lg:mt-24 px-5 lg:px-0">
                      <h1 className="lg:text-3xl text-xl font-bold lg:w-[70%] w-[80%] text-left py-2 lg:py-0">
                        {data?.title}
                      </h1>
                      <p className="lg:text-lg  text-sm text-[#777E90] lg:py-6  lg:w-[70%] w-[90%] text-justify lg:text-left ">
                        {data?.description.length > 300
                          ? data?.description?.slice(0, 297) + "..."
                          : data?.description}
                      </p>
                      <Link
                        to={`/blog/${data?._id}`}
                        className="hover:text-black uppercase pe-[22px] absolute  font-semibold w-36 rounded-lg py-2 mt-4 mx-auto text-white bg-[#3CBD96] border-[1px] border-[#ABE1D1]"
                      >
                        Explore now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 justify-center items-center lg:flex-row flex-col-reverse mb-20">
                <div
                  style={{
                    backgroundImage: `url(${blogRotate})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left",
                    backgroundSize: "20%",
                    marginRight: "-40px",
                  }}
                  className="lg:px-8 lg:py-5 flex flex-col justify-center lg:block  items-center lg:flex-1 lg:h-[700px] lg:mb-10"
                >
                  <div className="lg:mt-48 lg:absolute lg:ms-36 px-5 lg:px-0">
                    <h1 className="lg:text-3xl text-xl font-bold lg:w-[45%] text-left  w-[90%] py-2 lg:py-0">
                      {data?.title}
                    </h1>
                    <p className="lg:text-lg  text-sm text-[#777E90] lg:py-6 lg:w-[45%] text-justify lg:text-left w-[90%] ">
                      {data?.description.length > 300
                        ? data?.description?.slice(0, 297) + "..."
                        : data?.description}
                    </p>
                    <Link
                      to={`/blog/${data?._id}`}
                      className="hover:text-black uppercase absolute  font-semibold w-36 rounded-lg py-2 mt-4 pe-[22px] mx-auto text-white bg-[#3CBD96] border-[1px] border-[#ABE1D1]"
                    >
                      Explore now
                    </Link>
                  </div>
                </div>
                <div className=" lg:flex-1  lg:ms-16">
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}/blogs/${
                      data?.image
                    }`}
                    className="lg:h-[400px] "
                  />
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
