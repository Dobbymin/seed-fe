import { Outlet } from "react-router";

import { Box, Flex } from "@chakra-ui/react";

import { Footer, Header } from "../components";

export const RootLayout = () => {
  return (
    <Flex
      direction="column"
      maxW={{ base: "100vw", lg: "1280px" }}
      maxH={{ base: "100dvh", md: "720px" }}
      w="100vw"
      h="100dvh"
      mx="auto"
    >
      <Header />
      <Box mx="auto" w="full" as="main">
        <Box px={3} flex={1} w="full">
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Flex>
  );
};
