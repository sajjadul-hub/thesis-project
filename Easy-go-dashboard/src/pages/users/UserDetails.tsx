import "./users.scss";
import moment from "moment";
type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item: any;
};
function UserForm(props: Props) {
  const { slug, item } = props;
  const time = moment(item.createdAt);
  const formateDate = time.format("MMM Do YY");
  return (
    <div className="user-wrapper">
      <h3>User Details</h3>
      <div className="user-details">
        <div className="user-photo">
          <img src={item?.photoURL} alt={item?.name} />
        </div>
        <div className="user-info">
          <span>
            <h3 className="user-name">{item?.name}</h3>
            <p className="admin">Admin</p>
          </span>
          <p className="user-id">ID: {item?._id}</p>
          <p className="created-date">
            <span>Created:</span> {formateDate}
          </p>
          <div className="user-contact">
            {item?.email && (
              <span>
                <img src="email.svg" alt="" />
                <a href={`mailto:${item.email}`}>{item?.email}</a>
              </span>
            )}
            {item?.phoneNumber && (
              <span>
                <img src="phoneCall.svg" alt="" />
                <a href={`tel:${item?.phoneNumber}`}>{item?.phoneNumber}</a>
              </span>
            )}
          </div>
          <button>Make Admin</button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
