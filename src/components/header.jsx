import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@/slices/userApiSlice";
import { toast } from "react-toastify";
import { logout } from "@/slices/authSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetProfileQuery } from "@/slices/userApiSlice";
import { getUserRoleFromLocalStorage } from "@/utils/get-token";
import { usePathname } from "next/navigation";

const Header = ({ disableAccountSettings, attributes }) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { data: logedInUserDetails } = useGetProfileQuery();
  const token = useSelector((state) => state.auth.userInfo?.access_token);
  const [logoutApiCall] = useLogoutMutation();

  const [logedInUser, setLogedInUser] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    if (logedInUserDetails) {
      setLogedInUser(logedInUserDetails);
    }
  }, [logedInUserDetails]);

  useEffect(() => {
    if (token) {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success(
        response?.message ||
          response?.data?.message ||
          "Successfully logged out!"
      );
      if (logedInUser?.role === "ADMIN") {
        router.push("/admin-login");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          "Failed to log out. Please try again."
      );
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    const userRole = getUserRoleFromLocalStorage();
    if (attributes?.to) {
      router.push(attributes?.to);
    }
  };

  const handleItemClick = (menuItem) => {
    if (menuItem?.logout) {
      handleLogout();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      className="px-2 sm:px-4 md:px-10"
    >
      <Box display="flex" alignItems="center">
        <Image
          src={Logo}
          alt="Logo"
          height="auto"
          width={200}
          className="w-[125px] sm:w-[160px] md:w-[200px] h-auto"
          priority
          onClick={handleLogoClick}
        />
      </Box>

      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {attributes?.menuItems?.map((items, index) => {
            const Icon = items?.icon;
            return (
              <MenuItem onClick={() => handleItemClick(items)} key={index}>
                <Link href={items?.to || ""}>
                  <Button
                    variant="h6"
                    color="inherit"
                    className="font-Kodchasan text-xs md:text-sm font-semibold cursor-pointer p-0 flex items-center gap-1"
                  >
                    <Icon />
                    {items?.title || ""}
                  </Button>
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
