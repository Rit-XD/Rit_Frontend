"use client";

import { createSupabaseForBrowser } from "@/utils/supabase/createSupabaseForBrowser";
import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { User } from "./User";
import { fetchUser } from "./fetchUser";

const Context = createContext<{
    user: User | null;
    setUser: (user: User) => void;
}>({
    user: null,
    setUser: () => {}
})

export const UserProvider : React.FC<PropsWithChildren> = ({children}) => {
    const supabase = createSupabaseForBrowser();
    const [user, setUser] = useState<User | null>(null);
    const [fetching, setFetching] = useState(false);


    useEffect(() => {
        if (fetching || user) return;

        setFetching(true);
        const loadUser = async () => {
            const timeBefore = Date.now();
            supabase.auth.getSession()
            .then(() => {
                console.log(`session fetched in ${Date.now() - timeBefore}ms`);
            });
            const init = await fetchUser();
            console.log(`User fetched in ${Date.now() - timeBefore}ms`);
            setUser(init);
            setFetching(false);

        };
        loadUser();
    });

    return (
        <Context.Provider value={{
            user,
            setUser
            }}>
            {children}
        </Context.Provider>
    );

};