import { People } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { apiErrorClass } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
const register = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiErrorClass(400, "Required all information");
  }
  const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal.test(email)) {
    throw new apiErrorClass(400, "Email is not valid");
  }
  const existedUser = People.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new apiErrorClass(409, "User already existed");
  }
  const avatarPath = req.files?.avatar[0]?.path;
  const coverPath = req.files?.coverImage[0]?.path;
  if (!avatarPath) {
    throw new apiErrorClass(400, "Image upload failed");
  }
  const avatar = await uploadOnCloudinary(avatarPath);
  const cover = await uploadOnCloudinary(coverPath);
  if (!avatar) {
    throw new apiErrorClass(400, "Avatar file required");
  }
  const user = await People.create({
    fullname,
    avatar: avatar.url,
    username,
    email,
    coverImage: cover?.url || "",
    password,
  });
  const createdUser = await user
    .findById(user._id)
    .select("-password -refreshToken");
  if (!createdUser) {
    throw new apiErrorClass(500, "Register incompleted");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Register Succesfull"));
});

export { register };
