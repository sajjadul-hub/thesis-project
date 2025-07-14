import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}
    >
      <Skeleton height={"250px"} width={"280px"} />
      <Skeleton height={"250px"} width={"280px"} />
      <Skeleton height={"250px"} width={"280px"} />
    </div>
  );
};

export default Loader;
