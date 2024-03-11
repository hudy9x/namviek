import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, prettyPrint, simple } = format

// const logger = createLogger({
//   format: combine(label({ label: '' }), timestamp(), prettyPrint()),
//   transports: [
//     new transports.Console({ format: simple() }),
//     new transports.File({ filename: '/home/bitnami/logs/backend.log' })
//   ]
// })

// export const logging = logger

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

// import { Logtail } from '@logtail/node'
//
// const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN)
// export const Log = logtail
