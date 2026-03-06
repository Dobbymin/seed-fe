import { Box, Text, VStack } from "@chakra-ui/react";

import { ACTIONABLE_OUTPUT_FEATURES } from "../../promptAssemblyContent/common/promptAssemblyContent";
import { FeatureItem } from "../../promptFeatureItem/ui/FeatureItem";

// Explains why the generated prompt is immediately usable and lists the practical benefits.
export const ActionableOutputPanel = () => {
  return (
    <VStack
      align="start"
      flex="1 1 0"
      gap={4}
      maxW={{ base: "full", xl: "480px" }}
      minW={0}
      pt={{ base: 2, xl: 0 }}
      w="full"
    >
      <Box bg="#FAFAFA" borderRadius="8px" color="#98C95C" px={3} py={1}>
        <Text
          fontSize="14px"
          fontWeight={700}
          letterSpacing="-0.02em"
          lineHeight="20px"
        >
          Actionable Output
        </Text>
      </Box>

      <Text
        color="#191F28"
        fontSize={{ base: "30px", lg: "36px" }}
        fontWeight={700}
        letterSpacing="-0.02em"
        lineHeight="1.25"
      >
        諛붾줈 蹂듭궗?댁꽌
        <br />
        寃곌낵瑜?留뚮뱶?몄슂.
      </Text>

      <Text
        color="#A1A1A1"
        fontSize={{ base: "16px", lg: "18px" }}
        fontWeight={400}
        letterSpacing="-0.02em"
        lineHeight="1.625"
        maxW="420px"
      >
        濡쒕뱶留?媛??④퀎????留욌뒗 理쒖쟻???꾨＼?꾪듃媛 ?앹꽦?⑸땲??
        <br />
        怨좊????꾩슂 ?놁씠 &apos;蹂듭궗&apos; 踰꾪듉 ?섎굹硫?
        <br />
        ?꾨Ц?곸씤 ?섏????듬????살쓣 ???덉뒿?덈떎.
      </Text>

      <VStack align="start" gap={4} pt={4} w="full">
        {ACTIONABLE_OUTPUT_FEATURES.map((feature) => {
          return <FeatureItem key={feature} label={feature} />;
        })}
      </VStack>
    </VStack>
  );
};
