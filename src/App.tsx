import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, Center, Flex, theme } from "@chakra-ui/react";
import { preprocess_image, save_image } from "./model";
import FileUpload from "./components/FileUpload";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export interface ImageInfo {
  name: string;
  src: string;
  toUpscale: boolean;
}

export const App = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    console.log("change");
  }, [images]);

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
