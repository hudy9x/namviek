export abstract class BaseJob {
  name: string
  abstract implement(data: unknown): Promise<void>
}
