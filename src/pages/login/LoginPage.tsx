import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

import GoogleLogo from "@/features/login/_assets/google-symbol.webp";
import KakaoSymbol from "@/features/login/_assets/kakao-symbol.webp";

export default function LoginPage() {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="neutral.0"
      w="full"
      overflow="hidden"
    >
      <Flex
        as="main"
        direction="column"
        align="center"
        justify={{ base: "flex-start", md: "center" }}
        minH={{ base: "auto", md: "100vh" }}
        pt={{ base: 8, md: 0 }}
        pb={{ base: 10, md: 0 }}
        px={4}
      >
        <VStack
          w="full"
          maxW={{ base: "100%", md: "440px" }}
          p={{ base: 8, md: 12 }}
          bg="neutral.0"
          borderRadius={{ base: "2xl", md: "3xl" }}
          border="1px solid"
          borderColor="neutral.100"
          boxShadow="0px 10px 40px -10px rgba(0,0,0,0.05)"
          gap={0}
        >
          <VStack gap={3} mb={{ base: 8, md: 10 }} textAlign="center" w="full">
            <Heading
              as="h1"
              fontSize={{ base: "2xl", lg: "3xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              color="neutral.900"
              whiteSpace="pre-wrap"
            >
              SEED와 함께{"\n"}과제를 압축해 보세요
            </Heading>
            <Text
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight={500}
              color="neutral.600"
              lineHeight="1.5"
              whiteSpace="pre-wrap"
            >
              별도의 회원가입 없이 소셜 계정으로 즉시 시작할 수{"\n"}있습니다.
            </Text>
          </VStack>

          <VStack gap={3} w="full" mb={8}>
            <Button
              w="full"
              h={{ base: 12, sm: 13 }}
              bg="login.kakao.bg"
              color="login.kakao.foreground"
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight={600}
              borderRadius="xl"
              _hover={{ bg: "login.kakao.hover" }}
              position="relative"
            >
              <Image
                position="absolute"
                objectFit="contain"
                left={{ base: 4, sm: 5 }}
                boxSize={5}
                src={KakaoSymbol}
                alt="Kakao Logo"
              />
              카카오 로그인
            </Button>
            <Button
              w="full"
              h={{ base: 12, sm: 13 }}
              bg="login.google.bg"
              color="login.google.foreground"
              border="1px solid"
              borderColor="login.google.border"
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight={600}
              borderRadius="xl"
              _hover={{ bg: "login.google.hover" }}
              position="relative"
            >
              <Image
                position="absolute"
                objectFit="contain"
                left={{ base: 4, sm: 5 }}
                boxSize={5}
                src={GoogleLogo}
                alt="Google Logo"
              />
              Google 로그인
            </Button>
          </VStack>

          <Text fontSize={{ base: "xs", md: "sm" }} color="neutral.600">
            도움이 필요하신가요?{" "}
            <Link
              href="#"
              color="neutral.800"
              textDecoration="underline"
              textDecorationColor="neutral.500"
              _hover={{ color: "neutral.800" }}
            >
              문의하기
            </Link>
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
