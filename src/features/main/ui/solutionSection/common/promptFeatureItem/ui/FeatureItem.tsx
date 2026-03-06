import { Flex, HStack, Image, Text } from "@chakra-ui/react";

import { CHECK_ICON_URL } from "../../promptAssemblyContent/common/promptAssemblyContent";

type FeatureItemProps = {
  label: string;
};

export const FeatureItem = ({ label }: FeatureItemProps) => {
  return (
    <HStack align="center" gap={3} w="full">
      <Flex
        align="center"
        bg="#E7F3D4"
        borderRadius="full"
        h="24px"
        justify="center"
        w="24px"
      >
        <Image alt="" h="7.96px" src={CHECK_ICON_URL} w="10.44px" />
      </Flex>
      <Text
        color="#191F28"
        fontSize="16px"
        fontWeight={500}
        letterSpacing="-0.02em"
        lineHeight="24px"
      >
        {label}
      </Text>
    </HStack>
  );
};
