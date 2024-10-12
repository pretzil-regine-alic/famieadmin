import { UilEstate, UilUser, UilPalette, UilSignout } from "@iconscout/react-unicons";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    route: "/dashboard"
  },
  {
    icon: UilUser,
    heading: "Active Users",
    route: "/users"
  },
  {
    icon: UilPalette,
    heading: "User Theme",
    route: "/user-theme"
  },
  {
    icon: UilSignout,
    heading: "LOGOUT",
    route: "/register"
  }
];
