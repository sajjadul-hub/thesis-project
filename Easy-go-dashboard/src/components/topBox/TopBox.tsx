import "./topBox.scss";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod.ts";

interface DataItem {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  total_amount: number;
  type: string;
}

const TopBox = () => {
  const [latestTransaction, setLatestTransaction] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/statistic/latest-transaction");
        if (res.status === 200) {
          setLatestTransaction(res.data.data);
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

  console.log(latestTransaction);

  return (
    <div className="topBox">
      <h1>Top Deals</h1>
      <div className="list">
        {isLoading
          ? "Loading..."
          : latestTransaction.map((user) => (
              <div className="listItem" key={user.id}>
                <div className="user">
                  <img
                    src={(user?.photoURL! as string) || "/noavatar.png"}
                    alt=""
                  />
                  <div className="userTexts">
                    <span className="username">{user.name}</span>
                    <span className="email">{user.email}</span>
                  </div>
                </div>
                <span className="amount">৳{user.total_amount}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopBox;
