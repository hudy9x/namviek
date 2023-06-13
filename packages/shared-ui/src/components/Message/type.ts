export type MessageFunc = (message: string) => void
export type MessageType = "info" | "success" | "warning" | "error"
export type CreateMessageFunc = (type: MessageType, message: string) => void;
