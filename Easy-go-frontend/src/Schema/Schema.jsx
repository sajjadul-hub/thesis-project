import * as yup from "yup";
//Bike Rent Schema
export const B_Schema = yup.object().shape({
  name: yup
    .string()
    .required("*Required")
    .min(4, "At least 4 character")
    .max(20, "At most 20 Character")
    .matches(/^[^\s].*/, "Cannot start with a space"),
  nid: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(10, "At least 10 digits")
    .max(13, "At most 13 digits"),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(11, "At least 11 digits")
    .max(11, "At most 11 digits"),
  drivingLicense: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(11, "At least 11 digits")
    .max(17, "At most 17 digits"),
  from: yup.string().required("*Required"),
  destination: yup.string().required("*Required"),
  fuel: yup
    .string()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(1, "Minimum 1 Litter")
    .max(15, "Maximum 15 Litter"),
  start_time: yup.string().required("*Required"),
  end_time: yup.string().required("*Required"),
  rider: yup.string().required("*Required"),
  gender: yup.string().required("*Required"),
  start_date: yup
    .date()
    .required("*Required")
    .typeError("Invalid Date")
    .min(new Date(), "Cannot be Past"),
  end_date: yup
    .date()
    .required("*Required")
    .typeError("Invalid Date")
    .min(yup.ref("start_date"), "Should be after start Date"),
  bikeType: yup.string().required("*Required"),
});
//Product Delivery Schema
export const P_Schema = yup.object().shape({
  sender_name: yup
    .string()
    .required("*Required")
    .min(4, "At Least 4 Characters")
    .max(20, "At Most 20")
    .matches(/^[^\s].*/, "Cannot start with a space"),
  sending_date: yup
    .date()
    .required("Required")
    .typeError("Invalid date")
    .min(new Date(), "Cannot be past"),
  primary_num: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(11, "At least 11")
    .max(11, "At most 11"),
  secondary_num: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(11, "At Least 11")
    .max(11, "At Most 11"),
  sender_address: yup.string().required("*Required"),
  receiver_name: yup.string().required("*Required"),
  receiver_phone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(11, "At least 11")
    .max(11, "At most 11"),
  receiver_address: yup.string().required("*Required"),
  p_weight: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Digit Only")
    .min(1, "At least 1 KG")
    .max(40, "At most 40 KG"),
  p_type: yup.string().required(),
});

// Register Validation Schema
export const Register_Schema = yup.object().shape({
  userName: yup
    .string()
    .required("*Required")
    .min(4, "At least 4 character")
    .max(20, "At most 20 Character")
    .matches(/^[^\s].*/, "Cannot start with a space"),
  userEmail: yup.string().required("*Required").email("Invalid email address"),
  phoneNumber: yup
    .string()
    .required("*Required")
    .matches(/^[0-9]+$/, "*Digit Only")
    .min(11, "*At least 11")
    .max(11, "*At most 11"),
  password: yup
    .string()
    .required("*Required")
    .min(6, "*At least 6 characters")
    .test("has-uppercase", "*at least one uppercase", (value) =>
      /[A-Z]/.test(value)
    )
    .test("has-lowercase", "*at least one lowercase", (value) =>
      /[a-z]/.test(value)
    )
    .test("has-digit", "*at least one digit", (value) => /\d/.test(value))
    .test("has-special-char", "*at least one special character", (value) =>
      /[@$!%*?&]/.test(value)
    ),
});
