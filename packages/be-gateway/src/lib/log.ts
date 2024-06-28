import { createLogger, format, transports } from 'winston'
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';

// const { combine, timestamp, label, prettyPrint, simple } = format

export const createModuleLog = (module: string) => {
  return createLogger({
    // format: combine(label({ label: module }), timestamp(), prettyPrint()),
    // transports: [
    //   new transports.Console({ format: simple() }),
    //   new transports.File({
    //     format: simple(),
    //     filename: 'logs/backend.log'
    //   })
    // ]
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new AxiomTransport({
        dataset: process.env.AXIOM_DATASET || '',
        token: process.env.AXIOM_TOKEN || '',
      }),
    ],

  })
}

export const sendDiscordLog = async (content: string) => {
  const data = {
    username: 'Scheduler',
    avatar_url: "",
    content
  }
  return fetch("https://discord.com/api/webhooks/1249577190626955284/QWVUtgJVOj6JVqlRb7qyZ-MoIKYRUhUm94hXLxXPMi3a23XSmlGfeyPo40x7hHPmlEts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}
