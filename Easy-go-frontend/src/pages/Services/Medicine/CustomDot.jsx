import PropTypes from "prop-types";
function CustomDot({ onClick, active }) {
  return (
    <button
      onClick={() => onClick()}
      style={{
        height: "10px",
        transition: "ease 0.4s",
        width: active ? "18px" : "17px",
        backgroundColor: active ? "#007bff" : "#ccc",
        borderRadius: "30%",
        border: "none",
        margin: "0 5px",
        cursor: "pointer",
        paddingBottom: "5px",
      }}
    ></button>
  );
}

CustomDot.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
function CustomArrowRight({ onClick }) {
  return (
    <button
      onClick={() => onClick()}
      style={{
        height: "30px",
        width: "30px",
        transition: "ease 0.4s",
        backgroundColor: "#ccc",
        borderRadius: "100%",
        border: "none",
      }}
    ></button>
  );
}

CustomArrowRight.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { CustomDot, CustomArrowRight };
