import axios from "axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginPayload) => {
  const res = await axios.post("/api/auth/login", data);
  return res.data;
};
