**Infisical Self-Hosted Installation & Usage Guide**

This document explains how to deploy Infisical with Docker Compose and integrate it with OpenTofu/Terraform for secret injection.

---
### 1. Overview
Infisical is an open-source secret management platform. Self-hosting gives full control over data, encryption keys, and access policies. This setup uses Postgres + Redis + Infisical backend.

Reference: https://infisical.com/docs/self-hosting/deployment-options/docker-compose

### 2. Docker Compose File
Save as `docker-compose.yml`:
```yaml
version: "3"
services:
  backend:
    image: infisical/infisical:latest-postgres
    container_name: infisical-backend
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    env_file: .env
    pull_policy: always
    ports:
      - "80:8080" # Expose internal 8080 on host 80 (put behind HTTPS proxy externally)
    environment:
      - NODE_ENV=production
    networks:
      - infisical

  redis:
    image: redis
    container_name: infisical-redis
    restart: always
    environment:
      - ALLOW_EMPTY_PASSWORD=no
    networks:
      - infisical
    volumes:
      - redis_data:/data

  db:
    image: postgres:14-alpine
    container_name: infisical-db
    restart: always
    env_file: .env
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - infisical
    healthcheck:
      test: "pg_isready --username=${POSTGRES_USER} && psql --username=${POSTGRES_USER} --list"
      interval: 5s
      timeout: 10s
      retries: 10

volumes:
  pg_data:
  redis_data:

networks:
  infisical:
```


---
### 3. Environment Variables (.env)
Create a `.env` file next to the compose file:
```dotenv
# Encryption key (16 bytes hex => 32 hex chars)
ENCRYPTION_KEY=REPLACE_ME

# JWT signing secret (32 bytes base64)
AUTH_SECRET=REPLACE_ME

# Postgres
POSTGRES_USER=infisical
POSTGRES_PASSWORD=infisical
POSTGRES_DB=infisical
DB_CONNECTION_URI=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}

# Redis
REDIS_URL=redis://redis:6379

# Public site URL (HTTPS in production)
SITE_URL=https://infisical.example.com
```

DO NOT use sample values in production. Store originals in a secure password manager or hardware vault.

---
### 4. Generating Required Keys
```bash
# 16-byte hex (32 hex chars) for ENCRYPTION_KEY
openssl rand -hex 16

# 32-byte base64 for AUTH_SECRET
openssl rand -base64 32
```

---
Start services:
```bash
docker compose up -d
```

### 5. Initial Application Setup
Visit `http://<HOST>` (or behind HTTPS reverse proxy) and create your first organization/project.

![Infisical Project Creation – initial onboarding](../../media/infrastructure/infisical/create-project.png)

Create environments (e.g., `dev`, `prod`) and define secret paths.

---
### 6. Managing Secrets for OpenTofu
Create a folder/path in Infisical for your Tofu project (e.g., `/tofu`). Add required secrets (provider credentials, backend configs, etc.).

![Infisical Secret Management – OpenTofu path](../../media/infrastructure/infisical/tofu-secrets.png)


---
### 7. CLI Installation & Authentication
Reference: https://infisical.com/docs/cli/usage
```bash
brew install infisical/get-cli/infisical
infisical login
```
Login opens a browser or prompts for token. After login:
```bash
cd /path/to/project
infisical init   # Creates local .infisical config if required
```

---
### 8. Injecting Secrets into OpenTofu/Terraform
Use `infisical run` to wrap commands with environment injection.
For example, You can run OpenTofu/Terraform commands and inject variables into environment:
```bash
infisical run --env=prod --path=/tofu -- tofu init -reconfigure
infisical run --env=prod --path=/tofu -- tofu plan
infisical run --env=prod --path=/tofu -- tofu apply
```
Flags:
- `--env`: Infisical environment (prod/dev/staging)
- `--path`: Path/folder where secrets are stored


### 9. Backups & Restore
```bash
# Backup Postgres
docker exec infisical-db pg_dump -U infisical infisical > backup.sql

# Restore
docker exec -i infisical-db psql -U infisical -d infisical < backup.sql
```
Redis persistence holds transient data; primary source of truth is Postgres.

---
### 10. Upgrades
```bash
docker compose pull backend
docker compose up -d backend
```
Review release notes for migration steps before upgrading major versions.

### 11. Quick Reference Commands
```bash
# Start stack
docker compose up -d

# Tail backend logs
docker compose logs -f backend

# Generate keys
openssl rand -hex 16
openssl rand -base64 32

# Inject and run plan
infisical run --env=prod --path=/tofu -- tofu plan
```
