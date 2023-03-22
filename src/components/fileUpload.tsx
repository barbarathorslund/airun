import { useCallback, useEffect, useState } from "react";
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
import {createWorkerFactory, useWorker} from '@shopify/react-web-worker';

const createWorker = createWorkerFactory(() => import('../worker'));

const FileUpload = ({
  images,
  setImages,
}: {
  images: ImageInfo[];
  setImages: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
}) => {
  const [progress, setProgress] = useState(0.0);
  const worker = useWorker(createWorker);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        if (!images.some((image: ImageInfo) => image.name === file.name)) {
          setImages((images: ImageInfo[]) => [
            ...images,
            {
              name: file.name,
              src: URL.createObjectURL(file),
              downloadReady: false,
              download: "",
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

  const removeImage = (image: ImageInfo) => {
    setImages(images.filter((file) => file.src !== image.src));
  };

  const runModel = async (image: ImageInfo) => {
      // Set the progress to 0
      worker.upscaleImage(image.src, (progress: number) => {
        console.log(progress)
        setProgress(progress)
      }).then((upscaledImage) => console.log(upscaledImage))
  };

  return (
    <Box m="5" w="310px" h="100%">
      {!images.length ? (
        <Center
          p="8"
          mt="5"
          mb="5"
          h="250px"
          cursor="pointer"
          bg={isDragActive ? activeBg : "transparent"}
          _hover={{ bg: activeBg }}
          transition="background-color 0.2s ease"
          border="3px dashed"
          borderColor={borderColor}
          borderRadius="12px"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Icon as={AiFillFileAdd} mr="3" />
          <p>{dropText}</p>
        </Center>
      ) : (
        <Box
          h="250px"
          overflow="auto"
          p="1"
          mt="5"
          mb="5"
          border="3px dashed"
          borderColor={borderColor}
          borderRadius="12px"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {progress}
          {images.map((image) => (
            <Flex
              key={image.src}
              m="2"
              alignItems="center"
              justifyContent="space-between"
            >
              <Image
                src={image.src}
                boxSize="50px"
                objectFit="cover"
                borderRadius="5px"
              ></Image>
              <Text isTruncated maxW="80px" ml="2">
                {image.name}
              </Text>
              <Flex alignItems="center">
                {!image.downloadReady && (
                  <Button
                    w="85px"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => {
                      runModel(image);
                    }}
                  >
                    Upscale
                  </Button>
                )}
                {image.downloadReady && (
                  <a download={image.name} href={image.download}>
                    <Button w="85px" colorScheme="green" size="sm">
                      {" "}
                      Download{" "}
                    </Button>
                  </a>
                )}
                <CloseButton
                  onClick={() => {
                    removeImage(image);
                  }}
                />
              </Flex>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
