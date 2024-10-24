import { useRef, useState, type ChangeEvent, type Dispatch, type FormEvent, type KeyboardEvent, type SetStateAction } from "react";
import styles from "./MessageInput.module.css";
import { useAppSelector } from "@src/store/hook";
import { addMessage } from "@src/api/message";

function MessageInput({setAddMessageStatus}:{setAddMessageStatus:Dispatch<SetStateAction<boolean>>}) {
    const id_dialog = useAppSelector((state) => state.user.currentDialog);
    const currentUser = useAppSelector((state) => state.user.idCurrentUser);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const [messageText, setMessageText] = useState("");

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        sendMessage()
    };
    const sendMessage = () => {
        if (!messageText.trim().length) return;
        addMessage({
            id_dialog: id_dialog,
            id_sender: currentUser,
            content: messageText,
        });
        setMessageText("");
        clearInputHeight()
        setAddMessageStatus(true)
    };

    const clearInputHeight = ()=>{
        setTimeout(() => {
            if (messageRef.current) {
                messageRef.current.style.height = "auto"; // Сбрасываем высоту перед изменением
                messageRef.current.style.height = `${messageRef.current.scrollHeight}px`; // Подгоняем высоту
                messageRef.current.scrollTop = messageRef.current.scrollHeight; // Прокручиваем к последней строке
            }
        }, 0); // Откладываем выполнение, чтобы подождать изменения состояния
    }

    const handleChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(event.target.value);

        // Автоматическое изменение высоты textarea
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        // Если нажата клавиша Enter, но не с Shift или Ctrl
        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault(); // Предотвращаем перенос строки
            sendMessage();
        }
        // Если нажата клавиша Enter с Shift или Ctrl, добавляем перенос строки
        if (event.key === "Enter" && (event.shiftKey || event.ctrlKey)) {
            // Разрешаем перенос строки
            event.preventDefault();
            setMessageText((prev) => prev + "\n");
            clearInputHeight()
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.body} onSubmit={handleSubmit}>
                <button className={styles.btn}>
                    <img src="../plus.svg" alt="" />
                </button>
                <textarea
                    value={messageText}
                    className={styles.messageInput}
                    placeholder="Сообщение"
                    ref={messageRef}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button className={styles.smileBtn}>
                    <img src="../SmileIcon.png" alt="" />
                </button>
                <button type="submit" className={styles.btn}>
                    <img
                        width={20}
                        height={20}
                        src="../Send-icon.svg"
                        alt="sendMessage"
                    />
                </button>
            </form>
        </div>
    );
}

export default MessageInput;
