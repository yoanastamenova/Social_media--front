import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/nav";
import { useSelector } from "react-redux";
import UserWidget from "views/widgets/UserWidget";
import MyPostWidget from "views/widgets/MyPostWidget";
import PostsWidget from "views/widgets/PostsWidget";
import AdvertWidget from "views/widgets/AvertWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        <AdvertWidget />
        <Box margin="2rem 0" />
      </Box>
    </Box>
  );
};

export default HomePage;
