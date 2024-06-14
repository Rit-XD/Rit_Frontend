"use client";

import Messages from "./Messages";
import { Channel, ChannelList, Chat } from "stream-chat-react";
import Button from "@/ui/button/Button";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Channel as ChannelType, DevToken, StreamChat, UserResponse } from "stream-chat";
import { generateUsername } from "unique-username-generator";
import { useUser } from "@/providers/user/useUser";
import { fromModule } from "@/utils/styler/Styler";
import css from "./Chat.module.scss";
import { ChannelListMessenger } from "./ChannelList";
const styles = fromModule(css);

export default function ChatComponent () {
    const [channel, setChannel] = useState<ChannelType>();
    const [chatClient, setChatClient] = useState<StreamChat>();
    const [messageText, setMessageText] = useState("");
    const { user } = useUser();

    const getChannels = async () => {
        if (!chatClient) return;
        const channels = await chatClient.queryChannels( { members: { $in: [user!.id] } });
    };

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
        <div>
            {chatClient && (
                <Chat client={chatClient!}>
                    <div className={styles.chat()}>
                        <ChannelList List={ChannelListMessenger}/>
                        <div>
                        <Channel channel={channel}>
                            <Messages />
                        </Channel>
                        <Textarea
                            id="message_text"
                            name="message_text"
                            placeholder="Message..."
                            className="min-h-[100px] w-full"
                            onChange={(e) => {setMessageText(e.target.value)}}
                        />
                        <Button
                            onClick={() => {
                                if (channel) {
                                    channel.sendMessage({ messageText });
                                    setMessageText("");
                                }
                            }}
                        >
                            Send Message →
                        </Button>
                        </div>
                    </div>
                </Chat>
            )} 
        </div>
    );
}