"use client";

import Messages from "./Messages";
import { Channel, ChannelList, Chat, MessageInput, MessageList } from "stream-chat-react";
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
    const [channel, setChannel] = useState<ChannelType>();
    const [chatClient, setChatClient] = useState<StreamChat>();
    const [messageText, setMessageText] = useState("");
    const { user } = useUser();

    // const watchChannel = () => {
    //     const channel = chatClient!.channel("messaging", "livestreaming_chat", {
    //         name: "Live Streaming Chat",
    //     });
    //     channel.watch().then(() => setChannel(channel));
    // };

    useEffect(() => {
        // if (chatClient) watchChannel();
    }, [chatClient]);

    const loadChatClient = async () => {
        const newChatClient = new StreamChat(
            process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            { enableWSFallback: true }
        );

        if (newChatClient.user) await newChatClient.disconnectUser();

        const localUser = localStorage.getItem("local_user");
        if (!localUser) localStorage.setItem("local_user", user!.id);

        const id: string = localStorage.getItem("local_user") || "";
        const userToConnect: UserResponse = { id: id, name: user?.name? user.name : "Jij", image: user?.logo? user.logo : undefined };

        await newChatClient.connectUser(userToConnect, DevToken(userToConnect.id));
        
        setChatClient(newChatClient);
    };
    useEffect(() => {
        if(user) loadChatClient();
    }, [user]);



    return (
        <div className={styles.chatContainer()}>
            {chatClient && (
                <Chat client={chatClient!}>
                    <div className={styles.chat()}>
                        <ChannelList sort={{ last_message_at: -1 }} filters={{members: {$in: [user!.id]}, type: "messaging"}} options={{ presence: true, state: true }} Preview={CustomChannelPreview}/>
                        <Channel channel={channel}>
                            <div className={styles.channel()}>
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