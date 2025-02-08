import { RootState } from "@/modules/app";

export const selectTasksLoading = (state: RootState) => state.private.tasks.loading;
export const selectTasksError = (state: RootState) => state.private.tasks.error;
export const selectTasks = (state: RootState) => state.private.tasks.tasks;
