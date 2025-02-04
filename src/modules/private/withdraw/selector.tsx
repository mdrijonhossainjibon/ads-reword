import { RootState } from "@/modules/app";

export const selectWithdrawLoading = (state: RootState ) => state.private.withdraw.loading;
export const selectWithdrawError = (state: RootState ) => state.private.withdraw.error;
export const selectWithdrawData = (state: RootState ) => state.private.withdraw.data;