# Origami

![screenshot](/screenshot.png)

A hackable, self-hosted and modern start page for your homelab—fast, minimal, and built to customize.

### Motivation

After years of running a homelab and overlooking the value of a clean landing page, I finally set out to build my own. While there are plenty of existing projects, I wanted something modern, customizable, and visually appealing—many alternatives feel dated or lack flexibility. So I created Origami: a start page designed for today's homelabbers, focused on speed, minimalism, and easy customization.

Reddit Post: [r/homelabindia](https://www.reddit.com/r/homelabindia/comments/1oc82lq/creating_a_homelab_start_page_need_advice/)

### Setup

```bash
bun install

bun run migrate    # Run database migrations
bun run dev        # Start development server

bunx drizzle-kit generate
bunx drizzle-kit migrate
bunx drizzle-kit push
bunx drizzle-kit pull
bunx drizzle-kit check
bunx drizzle-kit up
bunx drizzle-kit studio
```

### Build

```bash
bun run build      # Build for production
bun run start      # Start production server
```

### Deploying to Docker

```bash
docker build -t origami .
docker run -p 3000:3000 origami

du -h -d 1 | sort -rh # List directory sizes
```