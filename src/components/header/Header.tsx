'use client'
import { User } from "@/lib/user/User";
import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/user/fetchUser";
import css from './Header.module.scss'
import { fromModule } from "@/utils/styler/Styler";


const styles = fromModule(css)

export const Header: React.FC = () => {
    const [user, setUser] = useState<User>();

    const loadUser = async() => {
        const user = await fetchUser();
        if (!user) return;
        setUser(user);
    }

    useEffect(() => {
        loadUser();
    });

    return (
        <div className={styles.header()}>
            {user?.carecenter.logo &&
                <img src={user.carecenter.logo} alt="" className={styles.header.logo()}/>
            } 
            <h1 className={styles.header.title()}>{user?.carecenter.name}</h1>
        </div>
    );
}
