"use client";

import { makeReservation } from "@/channels/visit/activities/add/makeReservation";
import { createSupabaseForBrowser } from "@/lib/createSupabaseForBrowser";
import { Database } from "@/lib/database.types";
import { useGlobalInfo } from "@/lib/global/useGlobalInfo";
import { Me } from "@/lib/me/Me";
import { createMyPlanning } from "@/lib/me/createMyPlanning";
import { fetchActiveDay } from "@/lib/me/fetchActiveDay";
import { fetchMe } from "@/lib/me/fetchMe";
import { storeFcmToken } from "@/lib/me/storeFcmToken";
import { LoginPopup } from "@/ui/popup/LoginPopup";
import { NotificationPopup } from "@/ui/popup/NotificationPopup";
import { dateToISO } from "@/util/dateToISO";
import firebaseApp from "@/util/firebase/firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { usePathname } from "next/navigation";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const Context = createContext<{
  me: Me | null;
  isLoading: boolean;
  setMe: (me: Me) => void;
  notifications: boolean;
  setNotifications: (notifications: boolean) => void;
  day: string;
  setDay: (day: string) => void;
  openPopupLogin: () => void;
}>({
  me: null,
  isLoading: true,
  setMe: () => {},
  notifications: false,
  setNotifications: () => {},
  day: dateToISO(new Date()),
  setDay: () => {},
  openPopupLogin: () => {},
});

export const useMe = () => {
  const supabase = createSupabaseForBrowser();
  const {
    me,
    setMe,
    isLoading,
    day,
    setDay,
    notifications,
    setNotifications,
    openPopupLogin,
  } = useContext(Context);
  const info = useGlobalInfo();
  const myPlanning = createMyPlanning(me, info);

  const actions = useMemo(() => {
    const setProfile = (update: Partial<Me["profile"]>) => {
      if (!me) return;
      setMe({ ...me, profile: { ...me.profile, ...update } });
    };

    return {
      myPlanning,
      setProfile,
      toggleNotifications: async (): Promise<void> => {
        if (!notifications) {
          const previousPermissions = Notification.permission;
          if (Notification.permission !== "granted") {
            const newPermissions = await Notification.requestPermission();
            if (newPermissions !== "granted") {
              if (previousPermissions === "denied") {
                alert(
                  "Activeer notificaties in de instellingen van je browser."
                );
              }
              return;
            }
          }
          const messaging = getMessaging(firebaseApp);
          const token = await getToken(messaging, {
            vapidKey:
              "BKWJPHfmGhyIiPrJ9iF4RO-_7_-EqO2Yi7onvOcI6lC0xCu_IoVXuKkQ_EEcj6-MJz1QlWD3b677oi6BLUxgIbU",
          });
          setNotifications(true);
          storeFcmToken(token); // This can run in the background, no need to await
          setProfile({ fcm_token: token });
        } else {
          setNotifications(false);
          setProfile({ fcm_token: null });
          storeFcmToken(null);
        }
      },
      makeReservation: async (
        locale: string,
        aid: string,
        day: string,
        time: string,
        spots: number
      ) => {
        if (!me) return "not_logged_in";
        const result = await makeReservation(locale, aid, day, time, spots);
        if (result && typeof result !== "string") {
          setMe(result);
          return true;
        } else {
          console.error(result);
          return result;
        }
      },
      like: async (aid: string) => {
        if (!me) return;
        const liked = [
          ...me.profile.liked.filter((content) => content.aid !== aid),
          { aid },
        ];
        setProfile({ liked });
        await supabase.from("liked").upsert({ aid, uid: me.id });
      },
      unlike: async (aid: string) => {
        if (!me) return;
        const liked = me.profile.liked.filter((content) => content.aid !== aid);
        setProfile({ liked });
        await supabase.from("liked").delete().eq("aid", aid);
      },
      earn: async (aid: string) => {
        if (!me) return;
        const badges = [
          ...me.profile.badges.filter((content) => content.aid !== aid),
          { aid },
        ];
        setProfile({ badges });
        await supabase.from("badges").upsert({ aid, uid: me.id });
      },
      insertPlanningItem: async (
        record: Database["public"]["Tables"]["planning"]["Insert"]
      ) => {
        if (!me) return;

        const { data: newRecord } = await supabase
          .from("planning")
          .insert(record)
          .select("*")
          .single();
        if (newRecord) {
          setProfile({
            planning: [...(me.profile?.planning || []), newRecord],
          });
        }
      },
      editPlanningItem: async (
        id: string,
        record: Database["public"]["Tables"]["planning"]["Update"]
      ) => {
        if (!me) return;

        const { data: newRecord } = await supabase
          .from("planning")
          .update(record)
          .eq("id", id)
          .select("*")
          .single();
        if (newRecord) {
          setProfile({
            planning: me.profile?.planning!.map((p) => {
              if (p.id === id) return newRecord;
              return p;
            }),
          });
        }
      },
      removePlanningItem: async (id: string) => {
        if (!me) return;

        await supabase.from("planning").delete().eq("id", id);
        setProfile({
          planning: me.profile?.planning!.filter((p) => p.id !== id),
        });
      },
      removeActivityFromPlanning: async (aid: string) => {
        if (!me) return;

        await supabase.from("planning").delete().eq("aid", aid);
        setProfile({
          planning: me.profile?.planning!.filter((p) => p.aid !== aid),
        });
      },
      setDay,
    };
  }, [me]);

  return { me, day, isLoading, notifications, openPopupLogin, ...actions };
};

export const MeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const supabase = createSupabaseForBrowser();
  const [popupOpen, setPopupOpen] = useState(false);
  const [me, setMe] = useState<Me | null>(null);
  const pathname = usePathname();
  const [fetching, setFetching] = useState(false);

  const [notifications, setNotifications] = useState(false);
  const [queue, setQueue] = useState<{ title: string; body: string }[]>([]);
  const [day, setDay] = useState<string>(() => dateToISO(new Date()));
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      /*navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
        registration => {
          console.log('Service worker registration succeeded:', registration)
        },
        error => {
          console.error(`Service worker registration failed: ${error}`)
        }
      )*/

      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.info("Foreground push notification received:", payload);
        const title = payload.notification?.title || payload.data?.title || "";
        const body = payload.notification?.body || payload.data?.body || "";
        setQueue([...queue, (payload.data as any) || { title, body }]);
      });

      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  useEffect(() => {
    if (fetching || me) return;

    setFetching(true);
    const loadMe = async () => {
      const timeBefore = Date.now();
      supabase.auth.getSession().then(() => {
        console.log(`Session fetched in ${Date.now() - timeBefore}ms`);
      });
      const init = await fetchMe();
      console.log(`User fetched in ${Date.now() - timeBefore}ms`);
      setMe(init);
      setFetching(false);
      setDay(fetchActiveDay(init));
      setIsLoading(false);

      const notificationsEnabledOnDevice =
        Notification.permission === "granted";
      if (notificationsEnabledOnDevice) {
        if (init?.profile.fcm_token) {
          setNotifications(true);
          const messaging = getMessaging(firebaseApp);
          const newToken = await getToken(messaging, {
            vapidKey:
              "BKWJPHfmGhyIiPrJ9iF4RO-_7_-EqO2Yi7onvOcI6lC0xCu_IoVXuKkQ_EEcj6-MJz1QlWD3b677oi6BLUxgIbU",
          });
          if (newToken !== init?.profile.fcm_token) {
            // store this token in the user's profile via a server function
            storeFcmToken(newToken);
          }
        } else {
          setNotifications(false);
        }
      } else {
        setNotifications(false);
      }
    };
    loadMe();
  }, [pathname]);

  useEffect(() => {
    setPopupOpen(false);
  }, [pathname]);

  useEffect(() => {
    let theme = "light";
    const themeSystem = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    if (!me) theme = themeSystem;
    if (me) theme = me.profile.preferences?.contrast || themeSystem;
    document.documentElement.setAttribute("data-theme", theme);

    let fontsize = "16px";
    if (me) {
      switch (me.profile.preferences?.fontsize || "regular") {
        case "small":
          fontsize = "14px";
          break;
        case "regular":
          fontsize = "16px";
          break;
        case "large":
          fontsize = "18px";
          break;
      }
    }
    document.documentElement.style.setProperty("font-size", fontsize);
  }, [me]);

  return (
    <Context.Provider
      value={{
        me,
        setMe,
        notifications,
        setNotifications,
        day,
        setDay,
        isLoading,
        openPopupLogin: () => setPopupOpen(true),
      }}
    >
      <LoginPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
      <NotificationPopup notification={queue[0]} onClose={() => setQueue([])} />
      {children}
    </Context.Provider>
  );
};
