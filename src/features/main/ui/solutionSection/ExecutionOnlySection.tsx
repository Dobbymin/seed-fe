import { SolutionProgressPanel } from "./common/solutionProgressPanel/ui/SolutionProgressPanel";

type ExecutionOnlySectionProps = {
  isActivated: boolean;
};

// Section entry that mounts the solution walkthrough once the sticky story is complete.
export const ExecutionOnlySection = ({
  isActivated,
}: ExecutionOnlySectionProps) => {
  return <SolutionProgressPanel isActivated={isActivated} />;
};
