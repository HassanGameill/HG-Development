import axios from "axios";

export interface ActivationPayload {
  activation_token: string;
  activation_code: string;
}

export interface ActivationResponse {
  success: boolean;
  message: string;
  user?: unknown;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const activateAccountService = async (
  payload: ActivationPayload
): Promise<ActivationResponse> => {
  try {
    const response = await axios.post<ActivationResponse>(
      `${API_URL}/api/users/active`,
      {
        // 🔑 map frontend keys → backend expected keys
        token: payload.activation_token,
        activationCode: payload.activation_code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Activation API error:",
        err.response?.data || err.message
      );

      return (
        err.response?.data || {
          success: false,
          message: err.message,
        }
      );
    }

    console.error("Unexpected activation error:", err);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
