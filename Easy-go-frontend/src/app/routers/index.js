import express from "express";
import { UserRoutes } from "../modules/users/user.route.js";
import { BikeRentRoutes } from "../modules/bike-rent/bike.route.js";
import { ParcelRoutes } from "../modules/parcel/parcel.route.js";
import { BlogRoutes } from "../modules/blog/blog.route.js";
import { MedicineRoutes } from "../modules/medicine/medicine.route.js";
import { StatisticRoutes } from "../modules/statistics/statistics.route.js";
import { BannerRoutes } from "../modules/banner/banner.route.js";
import { CategoryRoutes } from "../modules/mediator/category/category.route.js";
import { MediatorRoutes } from "../modules/mediator/product/product.route.js";
import { PrescriptionRoutes } from "../modules/prescription/prescription.route.js";
import { MedicineOrderRoutes } from "../modules/medicineOrder/medicineOrder.route.js";
import { MediatorOrderRoutes } from "../modules/mediatorOrder/mediatorOrder.route.js";
import { ReviewRoutes } from "../modules/review/review.route.js";

const routers = express.Router();

const routerModule = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/bike-rent",
    route: BikeRentRoutes,
  },
  {
    path: "/parcel",
    route: ParcelRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/medicine",
    route: MedicineRoutes,
  },
  {
    path: "/statistic",
    route: StatisticRoutes,
  },
  {
    path: "/banner",
    route: BannerRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: MediatorRoutes,
  },
  {
    path: "/prescription",
    route: PrescriptionRoutes,
  },
  {
    path: "/order-medicine",
    route: MedicineOrderRoutes,
  },
  {
    path: "/order-product",
    route: MediatorOrderRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
];

routerModule.forEach((route) => routers.use(route.path, route.route));

export default routers;
