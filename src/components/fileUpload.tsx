import { useCallback } from "react";
import { ImageInfo } from "../App";
import { useDropzone } from "react-dropzone";
import {
  Center,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Image,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { AiFillFileAdd } from "react-icons/ai";

const FileUpload = ({
  images,
  setImages,
}: {
  images: ImageInfo[];
  setImages: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        if (!images.some((image: ImageInfo) => image.name === file.name)) {
          setImages((images: ImageInfo[]) => [
            ...images,
            {
              name: file.name,
              src: URL.createObjectURL(file),
              toUpscale: false,
            },
          ]);
        }
      });
    },
    [images, setImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    maxFiles: 10,
  });

  const dropText = "Drop or select files";

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  const setImageToUpscale = (image: ImageInfo) => {
    const updatedImages = images.map((file) => {
      if (file.src === image.src) {
        return { ...file, toUpscale: true };
      } else {
        return file;
      }
    });
    console.log(updatedImages);
    setImages(updatedImages);
  };

  return (
    <Box m="5" w="310px" h="100%">
      <Center
        p="8"
        mt="5"
        mb="5"
        cursor="pointer"
        bg={isDragActive ? activeBg : "transparent"}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        borderColor={borderColor}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon as={AiFillFileAdd} mr="3" />
        <p>{dropText}</p>
      </Center>
      <Box h="250px" overflow="auto" mb="3">
        {images.map((image) => (
          <Flex
            key={image.src}
            m="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image src={image.src} boxSize="50px" objectFit="cover"></Image>
            <Text isTruncated maxW="80px" ml="2">
              {image.name}
            </Text>
            <Flex alignItems="center">
              {!image.toUpscale && (
                <Button
                  w="85px"
                  colorScheme="blue"
                  size="sm"
                  onClick={() => {
                    setImageToUpscale(image);
                  }}
                >
                  Upscale
                </Button>
              )}
              {image.toUpscale && (
                <Button w="85px" colorScheme="green" size="sm">
                  {" "}
                  Download{" "}
                </Button>
              )}
              <CloseButton
                onClick={() => {
                  setImages(images.filter((file) => file.src !== image.src));
                }}
              />
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default FileUpload;
