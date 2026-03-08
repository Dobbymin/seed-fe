import { useState } from "react";

import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import {
  AdjustmentsVerticalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PlusIcon,
  SettingIcon,
} from "@/shared/_assets/icons";

const projects = [
  { id: 1, name: "환경학 개론 과제", updatedAt: "10분 전 수정됨" },
  { id: 2, name: "UI 디자인 시스템 구축", updatedAt: "3시간 전 수정됨" },
  { id: 3, name: "2024 마케팅 기획안", updatedAt: "어제 수정됨" },
];

const paginationPages = [2, 3];

export default function MyPage() {
  const [filterActive, setFilterActive] = useState(false);
  const [manageActive, setManageActive] = useState(false);

  return (
    <Flex align="center" bg="white" direction="column" minH="100vh">
      <Flex
        direction="column"
        maxW="1024px"
        w="full"
        pt="128px"
        pb="80px"
        px="24px"
      >
        <VStack align="flex-start" gap={3} px={2} pb={12}>
          <Text color="neutral.900" fontSize="4xl" fontWeight="bold">
            반가워요, 서연님
          </Text>
          <Text color="neutral.600" fontSize="lg" fontWeight="medium">
            오늘도 새로운 아이디어를 실현해보세요.
          </Text>
        </VStack>

        <VStack gap={6} align="flex-start" pt={4} w="full">
          <Flex w="full" align="center" justify="space-between" px={2}>
            <Text color="neutral.900" fontSize="xl" fontWeight="bold">
              내 프로젝트 목록
            </Text>
            <HStack gap={2}>
              <Button
                variant="ghost"
                gap={1.5}
                px={3}
                py={1.5}
                h="auto"
                borderRadius="lg"
                bg="white"
                color={filterActive ? "seed" : "neutral.600"}
                _hover={{ bg: "neutral.100" }}
                onClick={() => setFilterActive((v) => !v)}
              >
                <AdjustmentsVerticalIcon
                  boxSize="13.5px"
                  color={filterActive ? "seed" : "neutral.600"}
                />
                <Text fontSize="sm" fontWeight="medium">
                  필터
                </Text>
              </Button>
              <Button
                variant="ghost"
                gap={1.5}
                px={3}
                py={1.5}
                h="auto"
                borderRadius="lg"
                bg="white"
                color={manageActive ? "seed" : "neutral.600"}
                _hover={{ bg: "neutral.100" }}
                onClick={() => setManageActive((v) => !v)}
              >
                <SettingIcon
                  boxSize="15px"
                  color={manageActive ? "seed" : "neutral.600"}
                />
                <Text fontSize="sm" fontWeight="medium">
                  관리
                </Text>
              </Button>
            </HStack>
          </Flex>

          <VStack gap={3} w="full">
            {projects.map((project) => (
              <Flex
                key={project.id}
                bg="white"
                border="1px solid"
                borderColor="neutral.50"
                borderRadius="2xl"
                boxShadow="0px 8px 30px 0px rgba(0,0,0,0.04)"
                p="25px"
                w="full"
                align="center"
                justify="space-between"
                cursor="pointer"
                _hover={{ bg: "neutral.50" }}
                transition="background 0.15s"
              >
                <Flex gap={5} align="center">
                  <Flex
                    bg="#F4FAEB"
                    borderRadius="xl"
                    boxSize={12}
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <DocumentTextIcon color="seed" w={4} h={5} />
                  </Flex>
                  <Flex flexDir="column" align="flex-start">
                    <Text color="neutral.900" fontSize="lg" fontWeight="bold">
                      {project.name}
                    </Text>
                    <Text color="neutral.600" fontSize="xs">
                      {project.updatedAt}
                    </Text>
                  </Flex>
                </Flex>
                <ChevronRightIcon color="neutral.600" w="7px" h="11px" />
              </Flex>
            ))}

            <Flex
              bg="white"
              border="1px dashed"
              borderColor="neutral.600"
              borderRadius="2xl"
              boxShadow="0px 8px 30px 0px rgba(0,0,0,0.04)"
              h={24}
              w="full"
              align="center"
              justify="center"
              cursor="pointer"
              _hover={{ bg: "neutral.50" }}
              transition="background 0.15s"
            >
              <Flex
                bg="#F4FAEB"
                borderRadius="full"
                boxSize={10}
                align="center"
                justify="center"
              >
                <PlusIcon color="seed" boxSize="17.5px" />
              </Flex>
            </Flex>
          </VStack>

          <HStack gap={2} justify="center" w="full" pt={4}>
            <Flex
              align="center"
              justify="center"
              boxSize={8}
              borderRadius="lg"
              opacity={0.5}
              cursor="pointer"
              _hover={{ opacity: 1 }}
              transition="opacity 0.15s"
            >
              <ArrowLeftIcon boxSize={2.5} color="neutral.900" />
            </Flex>

            <Flex
              align="center"
              justify="center"
              boxSize={8}
              borderRadius="lg"
              bg="seed"
              boxShadow="0px 1px 2px 0px rgba(0,0,0,0.05)"
              cursor="pointer"
            >
              <Text color="white" fontSize="sm" fontWeight="semibold">
                1
              </Text>
            </Flex>

            {paginationPages.map((page) => (
              <Flex
                key={page}
                align="center"
                justify="center"
                boxSize={8}
                borderRadius="lg"
                cursor="pointer"
                _hover={{ bg: "neutral.100" }}
                transition="background 0.15s"
              >
                <Text color="neutral.600" fontSize="sm" fontWeight="medium">
                  {page}
                </Text>
              </Flex>
            ))}

            <Box px={1}>
              <Text color="neutral.600" fontSize="sm" lineHeight="20px">
                ...
              </Text>
            </Box>

            <Flex
              align="center"
              justify="center"
              boxSize={8}
              borderRadius="lg"
              cursor="pointer"
              _hover={{ bg: "neutral.100" }}
              transition="background 0.15s"
            >
              <Text color="neutral.600" fontSize="sm" fontWeight="medium">
                8
              </Text>
            </Flex>

            <Flex
              align="center"
              justify="center"
              boxSize={8}
              borderRadius="lg"
              cursor="pointer"
              _hover={{ opacity: 0.7 }}
              transition="opacity 0.15s"
            >
              <ArrowRightIcon boxSize={2.5} color="neutral.900" />
            </Flex>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
