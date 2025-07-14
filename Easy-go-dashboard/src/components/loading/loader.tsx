import "./loader.scss";

function Loader() {
  const renderLoadingSkeletons = () => {
    const skeletonElements = [];

    for (let i = 0; i < 10; i++) {
      skeletonElements.push(<div key={i} className="loading-skeleton"></div>);
    }

    return skeletonElements;
  };

  return (
    <div className="data-table">
      <div className="table-header"></div>
      <div className="table-body">{renderLoadingSkeletons()}</div>
    </div>
  );
}
export default Loader;
