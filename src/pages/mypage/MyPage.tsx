import { useState } from "react";

import { Flex } from "@chakra-ui/react";

import { ProjectListSection, UserNameSection } from "@/features";

export default function MyPage() {
  const [filterActive, setFilterActive] = useState(false);
  const [manageActive, setManageActive] = useState(false);

  const userName = "양준식";
  return (
    <Flex align="center" bg="white" direction="column" minH="100vh">
      <Flex direction="column" maxW="1024px" w="full" py={16} px={6}>
        <UserNameSection name={userName} />
        <ProjectListSection
          setFilterActive={setFilterActive}
          filterActive={filterActive}
          setManageActive={setManageActive}
          manageActive={manageActive}
        />
      </Flex>
    </Flex>
  );
}
