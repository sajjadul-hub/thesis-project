import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div
      style={{
        height: "300px", // Set the height here
        width: "250px", // Set the width here
        margin: "20px auto", // Center the div
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center", // Center the content vertically
      }}
    >
      <Skeleton count={1} height={"300px"} width={"700px"} />
      <Skeleton count={1} height={"300px"} width={"290px"} />
    </div>
  );
};

export default Loader;
