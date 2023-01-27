import React, { useState } from "react";
import { ChakraProvider, Center, Flex, theme } from "@chakra-ui/react";
import FileUpload from "./components/FileUpload";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export interface ImageInfo {
  name: string;
  src: string;
  downloadReady: boolean;
  download: string;
}

export const App = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);

  return (
    <ChakraProvider theme={theme}>
      <Flex minH="100vh" p="1" flexDirection="column">
        <NavBar />
        <Center flexGrow="1">
          <FileUpload images={images} setImages={setImages} />
        </Center>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};
