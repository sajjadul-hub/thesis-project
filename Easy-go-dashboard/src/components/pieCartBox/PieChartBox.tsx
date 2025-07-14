import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { publicRequest } from "../../requestMethod";

interface DataItem {
  name: string;
  color: string;
  value: number;
}

const PieChartBox = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic");
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
    <div className="pieChartBox">
      <h1>Booking Statistics</h1>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="chart">
          <ResponsiveContainer width="99%" height={300}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />
              <Pie
                data={data}
                innerRadius={"70%"}
                outerRadius={"90%"}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="options">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {data &&
              data?.length > 0 &&
              data.map((item) => (
                <div className="option" key={item.name}>
                  <div className="title">
                    <div
                      className="dot"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PieChartBox;
