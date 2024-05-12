import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, prettyPrint, simple } = format

export const createModuleLog = (module: string) => {
  return createLogger({
    format: combine(label({ label: module }), timestamp(), prettyPrint()),
    transports: [
      new transports.Console({ format: simple() }),
      new transports.File({
        format: simple(),
        filename: 'logs/backend.log'
      })
    ]
  })
}

