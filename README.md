# Namviek

Namviek is designed for development teams operating on limited budgets, providing essential project management features without the high costs. Read the full [story here](https://dev.to/hudy9x/i-built-a-free-open-source-project-manager-that-helps-teams-keep-costs-under-15month-3pmk).

![App shot](https://github.com/hudy9x/namviek/assets/95471659/00cab20a-747a-4cf5-8f5e-105f314f7e2f)

![Commit Activity](https://img.shields.io/github/commit-activity/t/hudy9x/namviek.svg)
![GitHub](https://img.shields.io/github/license/hudy9x/namviek.svg)
![Last Commit](https://img.shields.io/github/last-commit/hudy9x/namviek.svg)
![Open Issues](https://img.shields.io/github/issues/hudy9x/namviek.svg)
![Contributors](https://img.shields.io/github/contributors/hudy9x/namviek.svg)

## 🎮 Demo

Try Namviek at one of our demo instances:
- 🇸🇬 Singapore: [namviek-sing.vercel.app](https://namviek-sing.vercel.app)
- 🇺🇸 Virginia: [namviek-vir.vercel.app](https://namviek-vir.vercel.app)

## 💰 Cost Comparison

Here's how Namviek can help your team save on operational costs. The comparison below is based on a team of 13 members:

| Tool | Cost per User/Month | Annual Cost (13 members) |
|------|--------------------|-----------------------|
| Jira | $12.80 | $1,996.80 |
| Trello | $10.00 | $1,560.00 |
| Monday.com | $9.00 | $1,404.00 |
| ClickUp | $10.00 | $1,560.00 |

**Namviek**, being a self-hosted solution, only requires a fixed hosting cost of **$10-15 per month** ($120-180 annually), regardless of team size. 

This means your team can save up to **90%** on operational costs compared to traditional solutions. As your team grows, the cost remains the same, making Namviek an increasingly cost-effective choice for expanding organizations.

## 🛠️ Tech Stack

- ⚡ Next.js
- 📦 NX (Monorepo)
- 🟢 Node.js
- 🍃 MongoDB
- 🔄 Redis

## ✨ Main Features

![Features](https://github.com/hudy9x/namviek/assets/95471659/28b1d157-e765-49ab-b7fd-0f3c441661ad)



## 🚀 Getting Started

### Docker Setup
```bash
$ cp .env.example .env.local
$ yarn compose-build
$ yarn compose-up
```

> **Note**: The `docker-compose.services.yml` file is provided for developers who want to contribute without setting up cloud services. It helps run all required services (Redis, MongoDB, Minio) locally.

### Manual Setup
For detailed installation instructions:
- Check out the [setup guide](https://docs.namviek.com)
- View the [complete documentation](https://docs.namviek.com/doc/installation)

## 📦 Deployment

Before deploying, please review our [deployment guide](https://docs.namviek.com/doc/deployment).

### One-Click Deploy Options

| Platform | Deploy Button | Description |
|----------|--------------|-------------|
| Vercel | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhudy9x%2Fnamviek%2Ftree%2Fmain&project-name=namviek&build-command=npm%20run%20generate2%20%26%26%20npm%20run%20build:fe&output-directory=dist%2Fapps%2Ffrontend%2F.next&install-command=npm%20install&env=NEXT_PUBLIC_BE_GATEWAY,NEXT_PUBLIC_APP_NAME) | Best for Next.js applications with serverless functions |
| Render | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/hudy9x/namviek/tree/main) | Suitable for full-stack applications |

## ❤️ Support

If you love this open source project, consider supporting its future development on Ko-fi!

<a href="https://ko-fi.com/hudy9x" target="_blank"><img width="200" src="https://storage.ko-fi.com/cdn/brandasset/kofi_button_stroke.png" /></a>



