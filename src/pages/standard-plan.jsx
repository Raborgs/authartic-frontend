import React, { useEffect, useRef, useState } from "react";
import { usePostCertificateInfoMutation } from "@/slices/certificateInfoApiSlice";
import { useUploadAttachmentMutation } from "@/slices/uploadAttachmentApiSlice";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  Box,
  TextField,
  Radio,
  Avatar,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import ColorPicker from "@/components/colorPicker";
import { Check, Close } from "@mui/icons-material";
import Icon from "../assets/images/elements.svg";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useGetProfileQuery } from "@/slices/userApiSlice";
import { useGetAllFontsQuery } from "@/slices/fontApiSlice";
import WithAuth from "@/components/withAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const initialData = {
  name: "",
  description: "",
  number_of_certificate: 1,
  font: "Arial",
  font_color: "#000000",
  bg_color: "#FFFFFF",
  saved_draft: false,
  product_sell: "",
  product_image_id: null,
};

function Index() {
  const router = useRouter();
  const [allFonts, setAllFonts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if data is loaded
  const uploadProductImageRef = useRef(null);
  const [productImagePreview, setProductImagePreview] = useState({
    productImagePreview: null,
    customImagePreview: null,
  });

  const { data: currentUser, refetch: currentUserRefetch } =
    useGetProfileQuery();

  const {
    data: allFont,
    isLoading: isAllfontLoading,
    refetch: AllfontRefetch,
  } = useGetAllFontsQuery();

  const [uploadProductImage, { isLoading: uploadImgLoading }] =
    useUploadAttachmentMutation();

  const [createCertificate, { isLoading: createCertificateLoading }] =
    usePostCertificateInfoMutation();

  const [toggleColorPicker, setToggleColorPicker] = useState({
    isOpenFontColorpicker: false,
    isOpenBgColorPicker: false,
  });
  const [formData, setFormData] = useState(initialData);
  const [acceptCertificate, setAcceptCertificate] = useState(false);
  const [imageFiles, setImageFiles] = useState({
    productImage: null,
    customBgImage: null,
  });

  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);

  const handleProductImageInputClick = () => {
    uploadProductImageRef.current.click();
  };

  const handleProductImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      toast.success(selectedFile.name);
      setImageFiles((prev) => {
        return { ...prev, productImage: selectedFile };
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview((prev) => {
          return { ...prev, productImagePreview: reader.result };
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (toggleDraft) => {
    if (!formData.name || !formData.description || !formData.product_sell) {
      toast.error(
        (!formData.name && "Item Name is Required") ||
          (!formData.description && "Item description is Required") ||
          (!formData.product_sell && "Product sell information is Required")
      );
    } else if (!acceptCertificate) {
      toast.info("You must accept acknowledge to continue");
    } else {
      try {
        if (toggleDraft) {
          setSaveDraftLoading(true);
        } else {
          setPlaceOrderLoading(true);
        }

        if (imageFiles.productImage) {
          const productImageFormData = new FormData();
          productImageFormData.append("file", imageFiles.productImage);
          productImageFormData.append("type", "text/photo");
          const productImageResponse = await uploadProductImage(
            productImageFormData
          ).unwrap();

          const productImageId = productImageResponse?.data?.id;

          const certificateData = {
            name: formData.name,
            description: formData.description,
            number_of_certificate: parseInt(formData.number_of_certificate),
            font: formData.font,
            font_color: formData.font_color,
            bg_color: formData.bg_color,
            saved_draft: toggleDraft,
            product_sell: formData.product_sell,
            product_image_id: productImageId,
          };

          const certificateResponse = await createCertificate(
            certificateData
          ).unwrap();

          setFormData(initialData);
          setImageFiles({
            productImage: null,
          });
          setProductImagePreview({
            productImagePreview: null,
          });
          setAcceptCertificate(false);
          toast.success(
            certificateResponse?.message ||
              certificateResponse?.data?.message ||
              "Certificate created successfully!"
          );
          router.push("/home");
        } else {
          toast.error("Product image not provided.");
        }
      } catch (error) {
        toast.error(error?.data?.message || "All Fields are required");
      } finally {
        setPlaceOrderLoading(false);
        setSaveDraftLoading(false);
      }
    }
  };

  const handleCancelSubmit = () => {
    setFormData(initialData);
    setImageFiles({
      productImage: null,
    });
    setAcceptCertificate(false);
    setProductImagePreview((prev) => {
      return { ...prev, productImagePreview: null };
    });
    toast.success("Certificate Cleared!");
    router.push("/home");
  };

  // Warning Tip When Both Background Color and Font Color are same....
  useEffect(() => {
    if (formData.bg_color == formData.font_color) {
      toast.info(
        "Hint: You have choose same colors check 'Background color' and 'Font color'"
      );
    }
  }, [formData.font_color, formData.bg_color]);

  useEffect(() => {
    // Simulate fetching userInfo data or any necessary data
    if (currentUser) {
      setIsDataLoaded(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (allFont) {
      setAllFonts(allFont);
    }
  }, [allFont]);

  useEffect(() => {
    currentUserRefetch();
    AllfontRefetch();
  }, [AllfontRefetch, currentUserRefetch]);

  return (
    <>
      <Header
        attributes={{
          to: "/home",
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
      <Box className="min-h-screen">
        <Box className="max-w-[602px] w-full mx-auto bg-[#22477F] py-6 my-6 rounded-[30px] px-[20px]">
          {/* NAME AND DESCRIPTION FIELDS */}
          <Box className="bg-[#ADA8A8] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] p-4 max-w-[518px] w-full mx-auto ">
            <TextField
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              label="Item Name"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: "#fff",
                borderRadius: "10px",
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
            <TextField
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
              label="Item Description"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: "#fff",
                borderRadius: "10px",
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
          </Box>

          <Box className="flex flex-col sm:flex-row md:justify-between items-center mb-6 max-w-[518px] w-full mx-auto">
            {/* HANDLE PRODUCT IMAGE UPLOAD */}
            <Box className="sm:bg-[#ADA8A8] bg-transparent rounded-br-[20px] rounded-bl-[20px] p-8 max-w-[280px] w-full mb-4 mr-[1.3rem] md:mb-0">
              <div className="flex items-center text-black bg-[#fff] rounded-[41.47px] px-4 py-4 gap-2">
                {productImagePreview.productImagePreview ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={productImagePreview.productImagePreview}
                    sx={{ width: 46, height: 46 }}
                  />
                ) : (
                  <Image src={Icon} alt="Icon" width={40} height={40} />
                )}

                <Typography className="font-DMSans">Product Image</Typography>
                <input
                  type="file"
                  className="hidden"
                  ref={uploadProductImageRef}
                  onChange={handleProductImageChange}
                />
              </div>
              <Button
                className=" bg-[#3276E8] text-white rounded-[41.47px] w-full px-4 py-2 mt-3"
                onClick={handleProductImageInputClick}
              >
                Upload Now
              </Button>
            </Box>

            {/* HANDLE NUMBER OF CERTIFICATES */}
            <Box className="flex justify-center w-full md:w-auto">
              <fieldset className="w-full sm:max-w-[193px] h-[80px] bg-white rounded-[10px] border-2 border-[#606060] px-2 flex flex-col">
                <legend className="bg-white text-sm text-black px-[3px] pb-[3pxpx] tracking-tighter">
                  Number of Certificates
                </legend>
                {isDataLoaded && (
                  <div className="w-full h-full">
                    <input
                      type="number"
                      name="number_of_certificate_select"
                      min={0}
                      max={
                        currentUser?.subscriptionStatus?.remaining_certificates
                      }
                      id="number_of_certificate_select"
                      className="outline-none border-none w-full h-full"
                      value={formData.number_of_certificate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          number_of_certificate: e.target.value,
                        }))
                      }
                    />
                    <strong className="text-white text-sm">{`Remaining ${currentUser?.subscriptionStatus?.remaining_certificates}`}</strong>
                  </div>
                )}
              </fieldset>
            </Box>
          </Box>
          <Box className="max-w-[518px] w-full mx-auto my-2 border-2 border-[#606060] rounded-[30px] flex flex-col items-center py-4 px-2">
            {/* HANDLE FONTS SETTINGS */}
            <fieldset className="max-w-[335px] w-full bg-white mt-[10px] rounded-[10px] border-[#606060] border-2 flex flex-col outline-none overflow-hidden">
              <legend className="text-sm md:text-base font-normal bg-white px-[3px] pb-[3px] tracking-tighter">
                {isAllfontLoading ? "Loading please wait..." : "Fonts"}
              </legend>
              <select
                disabled={isAllfontLoading}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, font: e.target.value };
                  })
                }
                name="fonts"
                id="fonts"
                className="w-full border-none outline-none h-[40px]"
              >
                {allFonts &&
                  allFonts?.map((font, index) => (
                    <option key={index}>{font.name}</option>
                  ))}
              </select>
            </fieldset>

            {/* HANDLE FONT COLOR PICKER */}
            <Box className="flex items-center mt-4 relative">
              <Typography className="mr-2 text-[#fff]">Font Color:</Typography>
              <span
                style={{ backgroundColor: formData.font_color }}
                className="w-[70px] h-[45px] text-center inline-block relative cursor-pointer rounded-sm hover:shadow-xl hover:scale-[1.1] transition-all"
                onClick={() => {
                  setToggleColorPicker((prev) => {
                    return { ...prev, isOpenFontColorpicker: true };
                  });
                }}
              >
                {formData.font_color}
              </span>

              <div
                onMouseLeave={() => {
                  setToggleColorPicker((prev) => {
                    return { ...prev, isOpenFontColorpicker: false };
                  });
                }}
                className={`absolute left-0 top-0 z-10 flex flex-col bg-[#333333] gap-3 py-1 px-3 rounded-lg transition-all ${
                  toggleColorPicker.isOpenFontColorpicker
                    ? "block opacity-1 scale-1"
                    : "hidden opacity-0 scale-0"
                }`}
              >
                <h1
                  style={{ color: formData.font_color }}
                  className="text-base font-medium"
                >
                  Font Color {formData.font_color}
                </h1>
                <ColorPicker
                  initialColor={formData.font_color}
                  setInitialColor={setFormData}
                />
                <div className="flex items-center justify-between">
                  <Button
                    className="bg-red-600 hover:bg-red-700 rounded-lg text-white"
                    onClick={() => {
                      setToggleColorPicker((prev) => {
                        return { ...prev, isOpenFontColorpicker: false };
                      });
                      setFormData((prev) => {
                        return { ...prev, font_color: initialData.font_color };
                      });
                    }}
                  >
                    <Close />
                  </Button>

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                    onClick={() => {
                      setToggleColorPicker((prev) => {
                        return { ...prev, isOpenFontColorpicker: false };
                      });
                    }}
                  >
                    <Check />
                  </Button>
                </div>
              </div>
            </Box>

            {/* HANDLE BACKGROUND COLOR AND BACKGROUND IMAGE SETTINGS */}
            <Box className="flex my-6 w-full justify-around flex-col gap-4 sm:flex-row sm:gap-0">
              <Box className="flex flex-col justify-center items-center relative">
                <Box className="flex items-center justify-around">
                  <Radio
                    checked
                    sx={{
                      color: "#fff",
                    }}
                  />
                  <Typography className="text-[#fff]">
                    Background Color
                  </Typography>
                </Box>
                <span
                  style={{ backgroundColor: formData.bg_color }}
                  className="w-[100px] h-[80px] rounded-[12px] inline-block text-center relative cursor-pointer"
                  onClick={() => {
                    setToggleColorPicker((prev) => {
                      return {
                        ...prev,
                        isOpenBgColorPicker: true,
                      };
                    });
                  }}
                >
                  {formData.bg_color}
                </span>

                <div
                  onMouseLeave={() => {
                    setToggleColorPicker((prev) => {
                      return {
                        ...prev,
                        isOpenBgColorPicker: false,
                      };
                    });
                  }}
                  className={`absolute left-0 top-0 z-10 flex flex-col bg-[#333333] gap-3 py-1 px-3 rounded-lg transition-all ${
                    toggleColorPicker.isOpenBgColorPicker
                      ? "block opacity-1 scale-1"
                      : "hidden opacity-0 scale-0"
                  }`}
                >
                  <h1 className="text-base font-medium w-full h-[30px] text-white">
                    Background {formData.bg_color}
                  </h1>
                  <ColorPicker
                    initialBGColor={formData.bg_color}
                    setInitialColor={setFormData}
                  />
                  <div className="flex items-center justify-between">
                    <Button
                      className="bg-red-600 hover:bg-red-700 rounded-lg text-white"
                      onClick={() => {
                        setToggleColorPicker((prev) => {
                          return { ...prev, isOpenBgColorPicker: false };
                        });
                        setFormData((prev) => {
                          return {
                            ...prev,
                            bg_color: initialData.bg_color,
                          };
                        });
                      }}
                    >
                      <Close />
                    </Button>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                      onClick={() => {
                        setToggleColorPicker((prev) => {
                          return { ...prev, isOpenBgColorPicker: false };
                        });
                      }}
                    >
                      <Check />
                    </Button>
                  </div>
                </div>
              </Box>
              {/* HANDLE CUSTOM BACKGROUND IMAGE UPLOAD */}
              <Box className="flex flex-col justify-center items-center border-xl relative">
                <Box className="flex items-center p-1">
                  <Radio
                    disabled
                    sx={{
                      color: "#fff",
                    }}
                  />
                  <Typography className="text-[#fff]">
                    Custom Background
                  </Typography>
                </Box>
                <Box className="flex justify-around items-center opacity-50 pointer-events-none">
                  <Box className="flex flex-col justify-center items-center text-black bg-[#fff] rounded-[12px] ml-5 w-[100px] h-[80px]">
                    <Image src={Icon} alt="Icon" />
                    <Typography className="font-DMSans text-center">
                      Click to upload
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[28px] w-full p-2 select-none cursor-pointer hover:shadow-lg "
                  onClick={() => router.push("package-plans")}
                >
                  <Typography className="text-white text-center text-[12px]">
                    Upgrade plan from account <br /> settings to upload custom{" "}
                    <br /> background image
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="max-w-[476px] w-full mx-auto mb-6">
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                }}
              >
                Where will this product primarily sell?
              </Typography>
              <TextField
                value={formData.product_sell}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, product_sell: e.target.value };
                  })
                }
                variant="outlined"
                placeholder="Enter text"
                multiline
                rows={4}
                InputLabelProps={{ shrink: false }}
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  margin: "0 auto", // Center the TextField
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
            </Box>
          </Box>
          <Box className="flex flex-col md:flex-row justify-between items-center mx-10 my-8">
            <Box className="flex flex-col justify-center items-center mb-4 md:mb-0">
              <Typography
                sx={{
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                The certificate QR codes will be delivered to <br /> the email
                associated with your account.
              </Typography>
              <Box className="flex items-center mt-2">
                <Checkbox
                  checked={acceptCertificate}
                  onChange={(e) => setAcceptCertificate(e.target.checked)}
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: "#fff",
                  }}
                >
                  I acknowledge
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="end" gap={2}>
              <Button
                disabled={
                  !acceptCertificate || placeOrderLoading || saveDraftLoading
                }
                variant="contained"
                onClick={() => handleSubmit(false)}
                className="bg-[#27A213] rounded-[7px] font-kodchasan px-4"
              >
                {placeOrderLoading ? (
                  <CircularProgress size="24px" />
                ) : (
                  "Place Order"
                )}
              </Button>
              <Button
                disabled={
                  !acceptCertificate || placeOrderLoading || saveDraftLoading
                }
                onClick={() => handleSubmit(true)}
                variant="contained"
                className="bg-[#81ACF3] rounded-[7px] font-kodchasan px-4"
              >
                {saveDraftLoading ? (
                  <CircularProgress size="24px" />
                ) : (
                  "Save Draft"
                )}
              </Button>
              <Button
                disabled={placeOrderLoading || saveDraftLoading}
                onClick={handleCancelSubmit}
                variant="contained"
                className="bg-[#A21313] rounded-[7px] font-kodchasan px-4"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default WithAuth(Index, ["VENDOR"]);
