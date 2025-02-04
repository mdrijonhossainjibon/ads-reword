import { RootState } from "@/modules/app";

 export const selectMe = (state: RootState ) => state.private.user.data;