import "./TableForm.scss";
import MedicineForm from "../../pages/medicines/MedicineForm";
import BikeBooking from "../../pages/orders/BikeBooking";
import ParcelBooking from "../../pages/orders/ParcelBooking";
import BlogForm from "../../pages/blogs/blogForm/BlogForm";
import PrescriptionDetails from "../../pages/prescription/prescriptionDetails";
import ProductForm from "../../pages/products/ProductForm";
import UserDetails from "../../pages/users/UserDetails";
import BannerForm from "../../pages/Banner/BannerForm";
import CategoryForm from "../../pages/category/CategoryForm";
import LocalProductOrder from "../../pages/orders/LocalProductOrder";
import MedicineOrder from "../../pages/orders/MedicineOrder";
type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item?: any;
  service?: string;
};
function TableForm(props: Props) {
  const { slug, item, setOpen, service } = props;

  return (
    <>
      {
        <div className="m_container">
          <div className="modal">
            <span className="close" onClick={() => props.setOpen(false)}>
              X
            </span>
            {service === "bike-rent" ? (
              <BikeBooking slug={slug} item={item} service={service} />
            ) : service === "parcel" ? (
              <ParcelBooking slug={slug} item={item} service={service} />
            ) : service === "medicine" ? (
              <MedicineOrder slug={slug} item={item} service={service} />
            ) : service === "local-product" ? (
              <LocalProductOrder slug={slug} item={item} service={service} />
            ) : slug === "Prescription" ? (
              <PrescriptionDetails slug={slug} item={item} setOpen={setOpen} />
            ) : slug === "Blog" ? (
              <BlogForm slug={slug} item={item} setOpen={setOpen} />
            ) : slug === "Product" ? (
              <ProductForm slug={slug} item={item} setOpen={setOpen} />
            ) : slug === "User" ? (
              <UserDetails slug={slug} item={item} setOpen={setOpen} />
            ) : slug === "Banner" ? (
              <BannerForm slug={slug} item={item} setOpen={setOpen} />
            ) : slug === "Category" ? (
              <CategoryForm slug={slug} item={item} setOpen={setOpen} />
            ) : (
              <MedicineForm slug={slug} item={item} setOpen={setOpen} />
            )}
          </div>
        </div>
      }
    </>
  );
}
export default TableForm;
