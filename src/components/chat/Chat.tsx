"use client";

import Messages from "./Messages";
import { Channel, ChannelHeader, ChannelList, Chat, MessageInput, MessageList, useChannelStateContext } from "stream-chat-react";
import Button from "@/ui/button/Button";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Channel as ChannelType, DevToken, StreamChat, UserResponse } from "stream-chat";
import { generateUsername } from "unique-username-generator";
import { useUser } from "@/providers/user/useUser";
import { fromModule } from "@/utils/styler/Styler";
import css from "./Chat.module.scss";
import { ChannelListMessenger } from "./ChannelList";
import { CustomChannelPreview } from "./ChannelPreview";
const styles = fromModule(css);

export default function ChatComponent () {
    const { channel } = useChannelStateContext();
    const [client, setClient] = useState<StreamChat>();
    const { user } = useUser();
        
    const loadClient = async () => {
        const newClient = new StreamChat(
            process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            { enableWSFallback: true }
        );

        if (newClient.user) await newClient.disconnectUser();

        const localUser = localStorage.getItem("local_user");
        if (!localUser) localStorage.setItem("local_user", user!.id);

        const id: string = localStorage.getItem("local_user") || "";
        const userToConnect: UserResponse = { id: id, name: user?.name? user.name : "Jij", image: user?.logo? user.logo : undefined };

        await newClient.connectUser(userToConnect, DevToken(userToConnect.id));
        
        setClient(newClient);
    };
    useEffect(() => {
        if(user) loadClient();
    }, [user]);



    return (
        <div className={styles.chatContainer()}>
            {client && (
                <Chat client={client!}>
                    <div className={styles.chat()}>
                        <div>
                        <h1 className={styles.title()}>Chat</h1>
                        <ChannelList sort={{ last_message_at: -1 }} filters={{members: {$in: [user!.id]}, type: "messaging"}} options={{ presence: true, state: true }} Preview={CustomChannelPreview}/>
                        </div>
                        <Channel channel={channel}>
                            <div className={styles.channel()}>
                                <ChannelHeader />
                                <div className={styles.messageList()}>
                                <MessageList />
                                </div>
                                <MessageInput/>
                            </div>
                        </Channel>
                    </div>
                </Chat>
            )} 
        </div>
    );
}