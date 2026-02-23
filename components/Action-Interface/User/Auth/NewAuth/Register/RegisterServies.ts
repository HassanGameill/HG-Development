import axios from "axios";

type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export const registerUser = async (
  data: RegisterPayload
) => {
  const res = await axios.post("/api/users/registration", data);
  return res.data;
};
