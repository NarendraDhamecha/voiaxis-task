import { Outlet } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import { useEffect } from "react";
import { useUser } from "./context/userContext";
import { getUser } from "./utils/_helpers";
import axiosInstance from "./config/axiosInstance";
import { toast } from "react-toastify";

const BaseRoute = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const loggedInUser = getUser();
    setUser(loggedInUser);
    const getLoggedInUser = async () => {
      try {
        const response = await axiosInstance.get(
          `/user/${loggedInUser.userId}`
        );
        const allowedPermissions = response.data.data.permissions;
        setUser((prev) => ({ ...prev, allowedPermissions }));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BaseRoute;
