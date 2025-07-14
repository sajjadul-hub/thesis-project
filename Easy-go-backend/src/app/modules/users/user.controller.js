import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { UserService } from "./user.service.js";
import pick from "../../../shared/pick.js";
import { usersFilterableField } from "./user.constant.js";
import { paginationFields } from "../../../constants/pagination.js";

const registerUser = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;
  const result = await UserService.registerUser(registerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, usersFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserService.getSingleUser(req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrived successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
