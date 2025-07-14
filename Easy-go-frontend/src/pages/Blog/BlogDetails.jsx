import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../features/blog/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const BlogDetails = () => {
  const { author_name, author_img, description, image, title, createdAt } =
    useSelector((state) => state.blog.blog);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getBlog(dispatch, id);
  }, [dispatch, id]);

  console.log(author_name);

  return (
    <div className="my-20 lg:w-[60%] lg:mx-auto mx-5 border-green-300 shadow-md border-[1px] rounded-lg px-3 py-2">
      <h1 className="lg:text-3xl text-xl font-bold  text-left py-2 lg:py-0">
        {title}
      </h1>
      <div className="flex items-center gap-3 mt-3 ">
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}/blogs/${author_img}`}
          className="rounded-full h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]"
          alt=""
        />
        <div>
          <h1 className="lg:text-lg font-bold">{author_name}</h1>
          <p className="lg:text-lg font-bold">
            {moment(createdAt, "YYYYMMDD").fromNow()}
          </p>
        </div>
      </div>
      <img
        className="py-8 px-8"
        src={`${import.meta.env.VITE_APP_BASE_URL}/blogs/${image}`}
        alt=""
      />
      <p>{description}</p>
      <p className="my-6">
        {" "}
        <span className="font-bold">Publish Date: </span>
        {moment(createdAt).format("LL")}
      </p>
    </div>
  );
};

export default BlogDetails;
