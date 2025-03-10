import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import PackageCard from "@/components/packageCards";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useGetsubscrptionPlanQuery } from "@/slices/packageDataApiSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useResendVerificationEmailMutation } from "@/slices/userApiSlice";
import WithAuth from "@/components/withAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useGetProfileQuery } from "@/slices/userApiSlice";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const { userInfo } = useSelector((state) => state?.auth);

  const router = useRouter();
  const { data: logedInUserDetails } = useGetProfileQuery();
  const {
    data: subscriptionData,
    error: subscriptionError,
    isError: isSubscriptionError,
    isLoading: isSubscriptionLoading,
  } = useGetsubscrptionPlanQuery();

  const [resendVerificationEmail, { isLoading: resendLoading }] =
    useResendVerificationEmailMutation();

  useEffect(() => {
    if (userInfo) {
      const isEmailVerified = userInfo?.user?.is_email_verified;
      if (!isEmailVerified) {
        setOpenModal(true);
      } else {
        if (openModal) {
          setOpenModal(false);
          router.push("/package-plans");
        }
      }
    }
  }, [userInfo, openModal, router]);

  const handleResendVerification = async () => {
    try {
      const response = await resendVerificationEmail().unwrap();
      toast.success(
        response?.message ||
          response?.data?.message ||
          "Verification email has been sent!"
      );
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(`Failed to resend verification email: ${err.data.message}`);
      } else {
        toast.error("Failed to resend verification email. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-between min-h-screen"
      style={{ overflow: "scroll", height: "100vh" }}
    >
      <Header
        attributes={{
          to: "/",
          menuItems: [
            { to: "/", title: "LOGOUT", icon: LogoutIcon, logout: true },
            {
              to: "/account-settings",
              title: "Account Settings",
              icon: ManageAccountsIcon,
            },
          ],
        }}
      />
      <Box>
        {/* Message for unverified email */}
        {!userInfo?.user?.validation_code && (
          <Box className="text-center m-10">
            <Typography variant="body1">
              Your account is not yet validated by Authartic. Validation may
              take up to 24 hours. You will be notified by email.
            </Typography>
          </Box>
        )}

        {/* Full-screen overlay when email is not verified */}
        {logedInUserDetails?.is_email_verified === false && (
          <Dialog open={!logedInUserDetails?.is_email_verified} onClose={() => setOpenModal(!false)}>
            <DialogTitle>Email Verification Required</DialogTitle>
            <DialogContent>
              <Typography>
                Your email address <strong>{userInfo?.user?.email}</strong> is
                not verified yet. Please check your spam folder or click the
                button below to resend the verification link
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleResendVerification}
                className="cursor-pointer font-kodchasan text-md md:text-lg xl:text-xl text-black border-1 border-solid border-[#22477F] font-normal py-1 px-5 md:px-9"
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Send Again"}
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Main Content */}
        <Box className="flex-1 pt-16 ">
          {" "}
          {/* Adjusted for fixed message */}
          <Box className="max-w-[1440px] mx-auto bg-white">
            <Box className="w-full  flex items-center justify-center pt-[7%] md:pt-0 pb-[150px]">
              {isSubscriptionLoading && (
                <h1 className="font-KoHo font-bold text-blue-600 text-[14px] sm:text-[18px] md:text-[24px]">
                  Loading! Please wait...
                </h1>
              )}

              {subscriptionData && (
                <Box className="grid items-end justify-items-center gap-7 md:gap-1 lg:gap-7 grid-cols-1 md:grid-cols-3 px-2">
                  {subscriptionData.map((data) => (
                    <PackageCard data={data} key={data.id} />
                  ))}
                </Box>
              )}
              {isSubscriptionError && (
                <h1 className="font-KoHo font-bold text-red-600 text-[14px] sm:text-[18px] md:text-[24px]">
                  {subscriptionError?.error}
                </h1>
              )}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
      </Box>
      <Footer />
    </div>
  );
};

export default WithAuth(Index, ["VENDOR"]);
