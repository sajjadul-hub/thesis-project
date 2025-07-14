import { useEffect, useState } from "react";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxRevenue,
} from "../../data";
import "./home.scss";
import { publicRequest } from "../../requestMethod";

interface ChartBoxUser {
  color: string;
  icon: string;
  title: string;
  number: string;
  dataKey: string;
  percentage: number;
  chartData: { name: string; users: number }[];
}
interface sold {
  data: number;
}
interface visitedUser {
  title: string;
  color: string;
  dataKey: string;
  chartData: { name: string; visit: number }[];
}

const Home = () => {
  const [chartBoxUser, setChartBoxUser] = useState<ChartBoxUser[]>([]);
  const [chartBoxProduct, setChartBoxProduct] = useState<ChartBoxUser[]>([]);
  const [chartBoxMedicine, setChartBoxMedicine] = useState<ChartBoxUser[]>([]);
  const [totalSold, setTotalSold] = useState<sold>();
  const [visitedUser, setVisitedUSer] = useState<visitedUser>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/getChartData");
        if (res.status === 200) {
          setChartBoxUser(res.data.data);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/getChartBoxProduct");
        if (res.status === 200) {
          setChartBoxProduct(res.data.data);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/getChartBoxMedicine");
        if (res.status === 200) {
          setChartBoxMedicine(res.data.data);
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
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/totalSold");
        if (res.status === 200) {
          setTotalSold(res.data.data);
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

  console.log(totalSold);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/visitedUser");
        if (res.status === 200) {
          setVisitedUSer(res.data.data);
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
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox
          color={""}
          icon={""}
          title={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
          path="/users"
          {...chartBoxUser}
          isLoading={isLoading}
        />
      </div>
      <div className="box box3">
        <ChartBox
          color={""}
          icon={""}
          title={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
          path="/products"
          {...chartBoxProduct}
          isLoading={isLoading}
        />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox
          color={""}
          icon={""}
          title={""}
          dataKey={""}
          number={""}
          percentage={0}
          chartData={[]}
          path="/medicines"
          {...chartBoxMedicine}
          isLoading={isLoading}
        />
      </div>
      <div className="box box6">
        <ChartBox
          color={""}
          icon={""}
          title={"Total Sold"}
          dataKey={""}
          number={`৳ ${totalSold}`}
          percentage={0}
          path="/orders"
          chartData={[]}
          isLoading={isLoading}
        />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        {visitedUser && <BarChartBox {...visitedUser} />}
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
