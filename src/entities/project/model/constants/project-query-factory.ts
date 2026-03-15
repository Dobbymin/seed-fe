import type { ProjectListParameters } from "../apis";

const PROJECT_QUERY_KEY = "project";

export const projectQueryFactory = {
  all: () => [PROJECT_QUERY_KEY],
  lists: () => [...projectQueryFactory.all(), "list"],
  details: () => [...projectQueryFactory.all(), "detail"],
  list: (params: Required<ProjectListParameters>) => [
    ...projectQueryFactory.lists(),
    params.page,
    params.size,
    params.sort,
  ],
  detail: (projectId: string) => [...projectQueryFactory.details(), projectId],
};

export const normalizeProjectListQueryParams = (
  params: ProjectListParameters = {},
): Required<ProjectListParameters> => {
  return {
    page: params.page ?? 0,
    size: params.size ?? 10,
    sort: params.sort ?? "createdAt,DESC",
  };
};
