import PropTypes from "prop-types";

const CustomRating = ({ value, size, color }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{ color: i <= value ? color : "gray", fontSize: size }}
      >
        ★
      </span>
    );
  }

  return (
    <div className="flex gap-2 mb-10 lg:mt-0 mt-2 text-[10px]">{stars}</div>
  );
};

export default CustomRating;

CustomRating.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
