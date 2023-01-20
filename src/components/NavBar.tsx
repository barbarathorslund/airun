import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import {
  Flex,
  Box,
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillFileImage, AiFillInfoCircle } from "react-icons/ai";

const NavBar = () => {
  return (
    <Flex alignItems="center">
      <Box ml="1" p="3" fontSize="xl">
        AIrun
      </Box>
      <Spacer />
      <Box p="3">
        <ColorModeSwitcher />
      </Box>
      <Box mr="1" p="3" fontSize="l">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem minH="48px">
              <Icon mr="3" as={AiFillFileImage} />
              Image Enhancing
            </MenuItem>
            <MenuItem minH="48px">
              {" "}
              <Icon mr="3" as={AiFillInfoCircle} /> About
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default NavBar;
