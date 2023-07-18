export interface ConfirmAction {
  message: string
  yes: () => void
  no?: () => void
}
export type ConfirmFunc = (action: ConfirmAction) => void
export type ConfirmboxType = "alert" | "warning"
export type CreateConfirmFunc = (type: ConfirmboxType, action: ConfirmAction) => void
