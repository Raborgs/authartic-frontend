import React, { useState } from "react";
import { TextField, Button, Box, Stack, CircularProgress } from "@mui/material";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetValidationCodeByCodeMutation } from "@/slices/validationCodeApiSlice";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";

const Registration = () => {
  const router = useRouter();
  const [validCode, setValidCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const [validateCode, { isLoading: isValidateCodeLoading }] =
    useGetValidationCodeByCodeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);

    try {
      const response = await validateCode(validCode).unwrap();
      if (response.id) {
        localStorage.setItem("validCodeId", response.id);
        toast.success(
          response?.message ||
            response?.data?.message ||
            "Validation code is valid"
        );
        // Redirect to registration-with-code page
        router.push("registration-with-code");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col justify-between">
      <Header
        attributes={{
          to: "/",
          menuItems: [{ to: "/", title: "HOME", icon: HomeIcon }],
        }}
      />
      <Box className="flex flex-col items-center h-full px-4">
        <form
          className="w-full max-w-xs mb-3"
          onSubmit={handleSubmit}
          id="form1"
        >
          <TextField
            label="Validation code"
            variant="outlined"
            fullWidth
            value={validCode}
            onChange={(e) => setValidCode(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#606060",
                  borderWidth: "2px",
                  borderRadius: "10px",
                },
                "&:hover fieldset": {
                  borderColor: "#606060",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#606060",
                },
              },
            }}
          />
          {/* <p className="mb-7 text-red-500">{validText ? validText : ""}</p> */}
        </form>

        <Button
          form="form1"
          type="submit"
          variant="contained"
          disabled={!validCode || isValidating || isValidateCodeLoading}
          className="mb-4 bg-[#22477F] rounded-[7px] font-kodchasan font-[700]"
        >
          <Stack spacing={2} direction="row" alignItems="center">
            {isValidateCodeLoading ? (
              <CircularProgress size="30px" />
            ) : (
              <span>Continue &gt;&gt;</span>
            )}
          </Stack>
        </Button>

        <div className="w-[50%] h-[1px] bg-black"></div>
        <Link href="registration-with-code">
          <Button
            variant="contained"
            className="w-100px mt-16 bg-[#22477F] rounded-[7px] font-kodchasan font-[700]"
          >
            I Don&apos;t have a validation code
          </Button>
        </Link>
      </Box>
      <Footer />
    </Box>
  );
};

export default Registration;
