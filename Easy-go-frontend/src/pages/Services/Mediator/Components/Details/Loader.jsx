import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div
      style={{
        height: "50vh",
        width: "70vw",
        marginLeft: "50px",
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        gap: "25px",
      }}
    >
      <Skeleton count={1} height={"300px"} width={"600px"} />
      <Skeleton count={1} height={"300px"} width={"290px"} />
    </div>
  );
};

export default Loader;
