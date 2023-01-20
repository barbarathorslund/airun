import * as React from "react";
import { ChakraProvider, Box, Center, Grid, theme } from "@chakra-ui/react";
import FileUpload from "./components/FileUpload";
import NavBar from "./components/NavBar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Box fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Center>
          <FileUpload />
        </Center>
      </Grid>
    </Box>
  </ChakraProvider>
);
