import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  // Check if the token is expired
  return decodedToken.exp < currentTime;
};

// Possible roles
export const roles = [
  { id: 1, role: "Admin", color: "primary", domain: "@voiaxisadmin.com" },
  {
    id: 2,
    role: "Moderator",
    color: "secondary",
    domain: "@voiaxismoderator.com",
  },
  { id: 3, role: "User", color: "secondary", domain: "@gmail.com" },
];

// Auto-assign role based on email domain
export const assignRole = (email) => {
  if (email.includes("@voiaxisadmin.com")) {
    return "Admin";
  } else if (email.includes("@voiaxismoderator.com")) {
    return "Moderator";
  } else {
    return "User";
  }
};

//Get logged in user role
export const getUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    let role = null;

    if (decodedToken.email) {
      role = assignRole(decodedToken.email);
    }

    return {
      userId: decodedToken.userId,
      email: decodedToken.email,
      fullName: decodedToken.fullName,
      role,
    };
  } else {
    return {
      userId: null,
      email: "",
      fullName: "",
      role: "",
    };
  }
};
