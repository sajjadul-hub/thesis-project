import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethod";
interface DataItem {
  name: string;
  bike_rent: number;
  parcel: number;
  medicine: number;
  product: number;
}

const BigChartBox = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/daily-booking");
        if (res.status === 200) {
          setData(res.data.data);
          setIsLoading(false);
        } else {
          console.error("Request failed with status", res.status);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Request failed:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bigChartBox">
      <h1>Revenue Analytics</h1>
      {isLoading ? (
        "Loading"
      ) : (
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bike_rent"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="parcel"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="medicine"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Area
                type="monotone"
                dataKey="product"
                stackId="1"
                stroke="#f87bff"
                fill="#f87bff"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BigChartBox;
