import { pmClient } from "packages/database/src/lib/_prisma"
import { getRedisConnection } from "./lib/redis"

const style = `
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #1a1a1a;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          color: #d4d4d8;
          padding: 2rem;
      }
      .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
      }
      .card {
          width: 100%;
          max-width: 24rem;
          border: 1px solid #3f3f46;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
      }
      .card-top {
          background-color: #2d2d30;
          padding: 1.5rem;
      }
      .card-bottom {
          background-color: #252528;
          padding: 1.5rem;
      }
      .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
      }
      .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
      }
      .status-indicator {
          height: 0.75rem;
          width: 0.75rem;
          border-radius: 50%;
          animation: blink 1s infinite;
          margin-top: 0.25rem;
      }
      .card-description {
          font-size: 0.875rem;
          color: #a1a1aa;
          margin: 0;
          line-height: 1.5;
      }
      .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          font-size: 0.75rem;
      }
      .info-row:not(:last-child) {
          border-bottom: 1px solid #3f3f46;
      }
      .info-label {
          flex-shrink: 0;
          color: #a1a1aa;
      }
      .info-value {
          font-weight: 500;
          flex-grow: 0;
          text-align: right;
      }
      @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
      }
      
      /* Success styles */
      .success .card-title,
      .success .status-connected {
          color: #22c55e;
      }
      .success .status-indicator {
          background-color: #22c55e;
      }
      
      /* Warning styles */
      .warning .card-title,
      .warning .status-connected {
          color: #eab308;
      }
      .warning .status-indicator {
          background-color: #eab308;
      }
      
      /* Failure styles */
      .failure .card-title,
      .failure .status-connected {
          color: #ef4444;
      }
      .failure .status-indicator {
          background-color: #ef4444;
      }
  </style>
`

const card = (cacheConnection: boolean, dbConnection: boolean, deployTime: Date) => {
  let status = 'failure'
  let title = 'Failure'
  let desc = `Your deployment has failed. Immediate attention is required to resolve issues.`

  if (cacheConnection && dbConnection) {
    status = 'success'
    title = 'Success'
    desc = `Your deployment has been successfully completed and all systems are operational.`
  }

  if (!cacheConnection || !dbConnection) {
    status = 'warning'
    title = 'Warning'
    desc = `Your deployment has completed, but some systems require attention.`
  }

  return `
  <!-- Success Card -->
  <div class="card ${status}">
      <div class="card-top">
          <div class="card-header">
              <h2 class="card-title">${title} Deployment</h2>
              <div class="status-indicator"></div>
          </div>
          <p class="card-description">${desc}</p>
      </div>
      <div class="card-bottom">
          <div class="info-row">
              <span class="info-label">Last Deployment</span>
              <span class="info-value">${deployTime}</span>
          </div>
          <div class="info-row">
              <span class="info-label">Database</span>
              <span class="info-value status-connected">${dbConnection ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div class="info-row">
              <span class="info-label">Cache</span>
              <span class="info-value status-connected">${cacheConnection ? 'Connected' : 'Disconnected'}</span>
          </div>
      </div>
  </div>
`
}

const checkHealth = async () => {

  const lastDeploymentTime = new Date()
  let redisConnection = getRedisConnection()
  let connectionMongoDB = false

  try {
    await pmClient.$connect()
    connectionMongoDB = true
  } catch (error) {
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Status</title>
    ${style}
</head>
<body>
    <div class="cards-container">
        ${card(redisConnection, connectionMongoDB, lastDeploymentTime)}
    </div>
</body>
</html>
`

  return html
}

export const checkHealthRoute = async (req, res) => {
  const html = await checkHealth()
  res.send(html)
}
