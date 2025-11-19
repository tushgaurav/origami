# Origami

A hackable, self-hosted and modern start page for your homelab—fast, minimal, and built to customize.

![Origami Screenshot](https://raw.githubusercontent.com/tushgaurav/origami/main/screenshot.png)

## Quick Start

### Docker Compose (Recommended)

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

### Docker CLI

```bash
docker run -d \
  --name origami \
  -p 3000:3000 \
  -v origami_data:/data \
  --restart unless-stopped \
  tushgaurav/origami:latest
```

## Persistence

This image uses a volume mounted at `/data` to store the SQLite database. This ensures your configuration and bookmarks persist across container updates.

