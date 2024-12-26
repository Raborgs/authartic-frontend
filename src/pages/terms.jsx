import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import termsAssets from "@/assets/jsonData/terms.Assets";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const [assets] = termsAssets();
const Terms = () => {
  const isUserHaveCodeFromAdmin = useSelector(
    (state) => state.auth.userInfo?.user
  );

  let userRedirection =
    isUserHaveCodeFromAdmin?.validation_code?.code &&
    isUserHaveCodeFromAdmin?.subscriptionStatus;
  let attributes = {};

  if (isUserHaveCodeFromAdmin?.role === "ADMIN") {
    attributes = {
      to: "/admin-dashboard",
      menuItems: [
        { to: "/admin-dashboard", title: "HOME", icon: HomeIcon },
        { to: "/", title: "LOGOUT", icon: LogoutIcon, logout: true },
      ],
    };
  } else if (userRedirection) {
    attributes = {
      to: "/home",
      menuItems: [
        { to: "/home", title: "HOME", icon: HomeIcon },
        { to: "/", title: "LOGOUT", icon: LogoutIcon, logout: true },
      ],
    };
  } else {
    attributes = {
      to: "/",
      menuItems: [{ to: "/", title: "HOME", icon: HomeIcon }],
    };
  }

  return (
    <>
      <Head>
        <title>Terms </title>
      </Head>
      <div className="w-full min-h-screen flex flex-col justify-between ">
        <Header attributes={attributes} />
        <div className="h-full max-w-[1223px] mx-auto !font-kodchasan text-[18px] md:text-[24px] font-light px-5 sm:px-9 md:px-12 py-7 my-11">
          {assets &&
            assets?.map((section, i) => {
              return (
                section && (
                  <Box
                    key={i}
                    sx={{ borderBottom: section?.id < 4 && "2px solid #999" }}
                  >
                    <SubHeadings section={section} key={section?.id} />
                    {section?.subItems &&
                      section?.subItems?.map((subItem, i) => (
                        <MainListItem
                          key={i}
                          subItem={subItem}
                          sectionId={section?.id}
                        />
                      ))}
                  </Box>
                )
              );
            })}
        </div>
        <Footer />
      </div>
    </>
  );
};

const SubHeadings = ({ section }) => (
  <div className="my-4">
    <Typography
      variant="h6"
      className={`!inline !font-kodchasan ${
        Object.values([1, 4]).includes(section?.id)
          ? "font-normal"
          : Object.values([2, 3]).includes(section?.id)
          ? "font-semibold"
          : ""
      }`}
    >
      {section?.intro} &#32;
    </Typography>
    <a href={`mailto:${section?.mailLink}`} className="!inline" target="_blank">
      <Typography
        className="!inline !font-kodchasan text-blue-600 underline"
        variant="h6"
      >
        &#32;{section?.mailLink}
      </Typography>
    </a>
  </div>
);

const MainListItem = ({ subItem, sectionId }) => (
  <Box sx={{ my: "20px" }}>
    {sectionId == 1 && (
      <Box>
        <strong className="text-lg font-semibold !font-kodchasan">{`${
          subItem?.id
        }. ${subItem?.title + " " ?? ""}`}</strong>
        {subItem?.items?.map((item, i) => (
          <span key={i} className="font-normal !font-kodchasan text-lg">
            {subItem?.id < 11 && `${subItem?.id}.${item?.id + " "}`}
            {item?.subHead && (
              <b className="!font-kodchasan">{item?.subHead + " "}</b>
            )}
            {item?.item + " "}
          </span>
        ))}
      </Box>
    )}

    {sectionId > 1 && (
      <Box>
        <Typography
          variant="body1"
          className="!font-kodchasan"
          sx={{ fontWeight: "600", display: "inline" }}
        >
          {subItem?.title + " "}
        </Typography>
        <Typography
          className="!font-kodchasan"
          variant="body1"
          sx={{ fontWeight: "400", display: "inline" }}
        >
          {subItem?.title2}
        </Typography>

        <List
          component={"ol"}
          sx={{
            listStyleType: "initial",
            paddingLeft: { xs: "1.5rem", md: "5rem" },
          }}
        >
          {subItem?.items?.map((item, i) => (
            <ListItem
              key={i}
              sx={{ display: "list-item" }}
              className="!font-kodchasan"
            >
              <ListItemText primary={item?.item} className="!font-kodchasan" />
            </ListItem>
          ))}
        </List>
      </Box>
    )}
  </Box>
);
export default Terms;
