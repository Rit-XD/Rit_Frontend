"use client"
import { useChannelStateContext } from "stream-chat-react";
import { Message, MessageList } from "@chatscope/chat-ui-kit-react";
import css from "./Chat.module.scss";
import { fromModule } from "@/utils/styler/Styler";

const styles = fromModule(css);

export default function () {
    const { messages } = useChannelStateContext();

    return (
    <MessageList className={styles.messageList()}>
        {messages?.map((i, index: number) => (
            <Message
                key={i.id}
                model={{
                    position: "normal",
                    sender: i.user?.id,
                    direction: "incoming",
                    message: `${i.user?.name}: ${i.text}`,
                    sentTime: i.created_at?.toString(),
                }}
                
            />
        ))}
    </MessageList>
    );
}