"use client";

import Messages from "./Messages";
import { Channel, ChannelList, Chat } from "stream-chat-react";
import Button from "@/ui/button/Button";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Channel as ChannelType, DevToken, StreamChat, UserResponse } from "stream-chat";
import { generateUsername } from "unique-username-generator";
import { useUser } from "@/providers/user/useUser";

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
        const userToConnect: UserResponse = { id };

        await newChatClient.connectUser(userToConnect, DevToken(userToConnect.id));
        
        setChatClient(newChatClient);
    };
    useEffect(() => {
        console.log(user);
        if(user) loadChatClient();
    }, [user]);



    return (
        <div className="flex max-w-[300px] flex-col gap-y-3 p-5">
            <div className="flex w-[300px] flex-col gap-y-3">
                <span className="border-b border-gray-100 font-semibold">Chat</span>
                {chatClient && (
                    <Chat client={chatClient!}>
                        <ChannelList ></ChannelList>
                        <Channel channel={channel}>
                            <Messages />
                        </Channel>
                    </Chat>
                )}
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
    );
}