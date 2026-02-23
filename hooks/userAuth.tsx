import { useSelector } from "react-redux";

export default function useUserAuth() {
  const { user, isLoading } = useSelector((state: any) => state.auth);

  return {
    isAuthenticated: Boolean(user),
    isLoading,
  };
}
