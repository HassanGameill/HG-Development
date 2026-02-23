import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available" | "notavailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enterEmail, setEnterEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnterEmail(email);
    setEmailAvailabilityStatus("checking");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/get-all-users?email=${email}`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
        
      );

      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notavailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnterEmail(null);
  };

  return {
    emailAvailabilityStatus,
    resetCheckEmailAvailability,
    enterEmail,
    checkEmailAvailability,
  };
};

export default useCheckEmailAvailability;
