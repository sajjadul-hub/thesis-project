import { Link, useLocation } from "react-router-dom";
import "./Menu.scss";
import { menu } from "../../data";

const Menu = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              style={{
                backgroundColor:
                  path === `/${listItem?.title.toLowerCase()}` ? "gray" : "",
              }}
              to={listItem.url}
              className="listItem"
              key={listItem.id}
            >
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
