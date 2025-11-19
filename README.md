# Origami

![screenshot](/screenshot.png)

A hackable, self-hosted and modern start page for your homelab—fast, minimal, and built to customize.

### Motivation

After years of running a homelab and overlooking the value of a clean landing page, I finally set out to build my own. While there are plenty of existing projects, I wanted something modern, customizable, and visually appealing—many alternatives feel dated or lack flexibility. So I created Origami: a start page designed for today's homelabbers, focused on speed, minimalism, and easy customization.

Reddit Post: [r/homelabindia](https://www.reddit.com/r/homelabindia/comments/1oc82lq/creating_a_homelab_start_page_need_advice/)

### Getting Started

The easiest way to run Origami is using the pre-built image from [Docker Hub](https://hub.docker.com/r/tushgaurav/origami).

#### Docker Compose

Create a `docker-compose.yml` file:

```yaml
services:
  origami:
    image: tushgaurav/origami:latest
    container_name: origami
    ports:
      - "3000:3000"
    volumes:
      - origami_data:/data
    restart: unless-stopped

volumes:
  origami_data:
```

Run it:
```bash
docker compose up -d
```

#### Docker CLI

```bash
docker run -d \
  --name origami \
  -p 3000:3000 \
  -v origami_data:/data \
  --restart unless-stopped \
  tushgaurav/origami:latest
```

### Development

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

### Deploying to Docker Hub

```bash
# 1. Login to Docker Hub
docker login

# 2. Build and tag the image
docker build -t tushgaurav/origami:latest -t tushgaurav/origami:0.1.0 .

# 3. Push to Docker Hub
docker push tushgaurav/origami:latest
docker push tushgaurav/origami:0.1.0
```


