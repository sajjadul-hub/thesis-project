import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div
      style={{
        height: "50vh",
        width: "70vw",
        marginLeft: "50px",
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        flexWrap: "wrap",
      }}
    >
      <Skeleton height={"300px"} width={"250px"} />
      <Skeleton height={"300px"} width={"250px"} />
      <Skeleton height={"300px"} width={"250px"} />
      <Skeleton height={"300px"} width={"250px"} />
    </div>
  );
};

export default Loader;
