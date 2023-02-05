import { Drizzle, IDrizzleOptions } from "@drizzle/store";
import MemberRole from "utils/abi/MemberRole.json";

const drizzleOptions: IDrizzleOptions = {
  contracts: [MemberRole],
  events: {
    MemberRole: ["RoleAdded", "StateChanged"],
  },
};

export const drizzle = new Drizzle(drizzleOptions);
