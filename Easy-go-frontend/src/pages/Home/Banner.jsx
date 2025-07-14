/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "../../components/silder/bannerSilder/Slider";
import { publicRequest } from "../../requestMethod";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

const Banner = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    publicRequest
      .get(`/banner?cat=${category}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: error,
          title: "Error",
          text: "Failed to fetch Banner",
        });
      });
  }, [category]);

  return (
    <div className="lg:mx-[-40px] ">
      {loading ? (
        <Skeleton height={"300px"} width={"100%"} />
      ) : (
        data && data.length > 0 && <Slider data={data} />
      )}
    </div>
  );
};

export default Banner;

Banner.propTypes = {
  category: PropTypes.string,
};
