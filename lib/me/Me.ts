import { Database } from "@/lib/database.types";
import { User } from "@supabase/supabase-js";

export type Me = {
  id: string;
  email: string;
  user: User;
  hasEmailConfigured: boolean;
  isAlineaUser: boolean;
  profile: ProfileRow & {
    themes: { tid: string }[];
    ages: { tid: string }[];
    liked: { aid: string }[];
    badges: { aid: string }[];
    planning: PlanningRow[];
    group_member: {
      uid: string;
      gid: string;
      group: GroupRow;
    }[];
  };
};

export type PlanningRow = Database["public"]["Tables"]["planning"]["Row"];

export type GroupRow = Database["public"]["Tables"]["group"]["Row"];

export type ProfileRow = Omit<
  Database["public"]["Tables"]["profile"]["Row"],
  "preferences" | "planning"
> & {
  preferences: UserPreferences;
};

export type UserPreferences = {
  contrast: "light" | "dark";
  fontsize: "small" | "regular" | "large";
  wheelchair: boolean;
};

export function isClaimed(
  me: Me | null | undefined,
  aid: string | undefined
): boolean {
  if (!me || !aid) return false;

  return !!me?.profile.badges.some((b) => b.aid === aid);
}
