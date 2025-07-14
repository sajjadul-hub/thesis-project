import PropTypes from "prop-types";

const BlogSkeletonLoader = ({ width, height }) => {
  return (
    <div className="animate-pulse flex justify-center gap-7">
      <div
        className="bg-gray-300 h-6 w-24 mb-2"
        style={{ width, height }}
      ></div>
      <div
        className="bg-gray-300 h-6 w-24 mb-2"
        style={{ width, height }}
      ></div>
    </div>
  );
};

export default BlogSkeletonLoader;

BlogSkeletonLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
