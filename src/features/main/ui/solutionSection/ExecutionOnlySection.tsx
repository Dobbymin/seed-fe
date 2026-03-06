import { SolutionProgressPanel } from "./SolutionProgressPanel";

type ExecutionOnlySectionProps = {
  isActivated: boolean;
};

export const ExecutionOnlySection = ({
  isActivated,
}: ExecutionOnlySectionProps) => {
  return <SolutionProgressPanel isActivated={isActivated} />;
};
