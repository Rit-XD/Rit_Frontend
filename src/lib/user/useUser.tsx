"use client";

import { createSupabaseForBrowser } from "@/src/utils/supabase/createSupabaseForBrowser";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "./User";
import { fetchUser } from "./fetchUser";
import { usePathname } from "next/navigation";

const Context = createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  const supabase = createSupabaseForBrowser();
  const { user, setUser } = useContext(Context);
  return { user };
};

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const supabase = createSupabaseForBrowser();
  const [user, setUser] = useState<User | null>(null);
  const [fetching, setFetching] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (fetching || user) return;

    setFetching(true);
    const loadUser = async () => {
      const timeBefore = Date.now();
      supabase.auth.getUser().then(() => {
        console.log(`session fetched in ${Date.now() - timeBefore}ms`);
      });
      const init = await fetchUser();
      console.log(`User fetched in ${Date.now() - timeBefore}ms`);
      setUser(init);
      setFetching(false);
    };
    loadUser();
  }, [pathname]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
