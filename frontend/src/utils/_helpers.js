import { jwtDecode } from "jwt-decode";
import { PERMISSION } from "../config/features";

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  // Check if the token is expired
  return decodedToken.exp < currentTime;
};

// Role identifier
export const ROLE_IDENTIFIERS = {
  ADMIN: { ROLE_NAME: "Admin", ROLE_DOMAIN: "@voiaxisadmin.com" },
  MODERATOR: { ROLE_NAME: "Moderator", ROLE_DOMAIN: "@voiaxismoderator.com" },
  USER: { ROLE_NAME: "User", ROLE_DOMAIN: "@gmail.com" },
};

// Possible roles
export const ROLES = [
  {
    id: 1,
    role: ROLE_IDENTIFIERS.ADMIN.ROLE_NAME,
    color: "primary",
    domain: ROLE_IDENTIFIERS.ADMIN.ROLE_DOMAIN,
    permissions: [PERMISSION.DELETE_AD, PERMISSION.REVIEW_AD],
  },
  {
    id: 2,
    role: ROLE_IDENTIFIERS.MODERATOR.ROLE_NAME,
    color: "secondary",
    domain: ROLE_IDENTIFIERS.MODERATOR.ROLE_DOMAIN,
    permissions: [PERMISSION.REVIEW_AD],
  },
  {
    id: 3,
    role: ROLE_IDENTIFIERS.USER.ROLE_NAME,
    color: "secondary",
    domain: ROLE_IDENTIFIERS.USER.ROLE_DOMAIN,
    permissions: [],
  },
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
