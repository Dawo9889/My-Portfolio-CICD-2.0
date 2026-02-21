# How I Set This Up

My journey building this project from scratch - the decisions I made and what I learned along the way.

## The Goal

Build a portfolio website with a professional DevOps setup that shows:
- Infrastructure as Code
- Proper secrets management
- Self-hosted CI/CD pipeline
- Real-world DevOps practices

## The Setup Journey

### 1. Foundation: Where to Store Everything

**First problem:** Where should Terraform state files live?

I chose **MinIO** (S3-compatible storage) running on Docker. This means the infrastructure state is stored remotely, so I can manage it from any machine - not just my laptop.

**Why MinIO?** Self-hosted, S3-compatible, no AWS costs. Perfect for homelab.

[→ MinIO Technical Setup](infrastructure/minio/setup.md)

---

**Second problem:** Where do I store passwords, API tokens, SSH keys?

I chose **Infisical** - a self-hosted secrets vault. All credentials live there and get injected at runtime with `infisical run` commands. Nothing hardcoded in git.

**Why Infisical?** Modern UI, OIDC support for GitHub Actions, self-hosted. Cleaner than `.env` files everywhere.

[→ Infisical Technical Setup](infrastructure/infisical/setup.md)

---

### 2. Infrastructure: Provisioning the VM

**The challenge:** Manually creating VMs gets old fast.

I wrote **OpenTofu/Terraform** code to automatically provision an Ubuntu VM on my Proxmox server. The configuration includes:
- Cloud-init for automatic setup
- SSH key injection
- Static IP assignment
- Network configuration

Commands now look like:
```bash
infisical run --env=prod --path=/tofu -- tofu apply
```

Secrets get injected, VM gets created. Infrastructure as code done right.

**Key learning:** Cloud-init is amazing for initial VM setup. No manual SSH configuration needed.

[→ OpenTofu Technical Setup](infrastructure/tofu/setup.md)

---

### 3. Configuration: Setting Up the VM

**The need:** Fresh Ubuntu VM needs Docker, dependencies, and user permissions.

I used **Ansible** with a simple playbook that:
- Installs Docker
- Configures user permissions
- Ensures services start on boot

One command to configure the whole VM. Repeatable and documented.

**Key learning:** Ansible playbooks are idempotent - safe to run multiple times.

---

### 4. CI/CD: Self-Hosted Runner

**The decision:** Use GitHub-hosted runners or run my own?

I went self-hosted because:
- Can access my private network (Infisical, MinIO)
- Full control over the environment
- Custom tools pre-installed
- No cost per minute

Set up the GitHub Actions runner as a systemd service on the VM, then configured **OIDC authentication** so workflows can fetch secrets from Infisical without long-lived tokens.

**Key learning:** OIDC is way better than static tokens - short-lived credentials reduce risk.

---

### 5. The Application

Built a **Next.js 15** portfolio website with:
- React 18 and TypeScript
- Tailwind CSS for styling
- Multi-stage Dockerfile (build stage + runtime stage)
- Docker image under 200MB

**The workflow now:**
1. Push code to GitHub
2. Self-hosted runner picks it up
3. Fetches secrets via OIDC
4. Builds and tests the Docker image
5. PR validation complete

Everything automated.
Everything automated.

## What I Learned

**Infrastructure as Code is worth it**
Being able to destroy and rebuild everything from code is powerful. No more "works on my machine" issues.

**Secrets management is critical**
Runtime injection with Infisical is way cleaner than `.env` files scattered everywhere. And OIDC removes the need for long-lived tokens.

**Self-hosted gives you control**
Running my own GitHub Actions runner means I can access private network resources and install exactly what I need.

**Documentation matters**
Writing this down helps me remember what I did and why. Future me will appreciate it.

## The Result

Now when I push code:

1. GitHub triggers my self-hosted runner
2. Runner authenticates to Infisical via OIDC
3. Secrets are fetched securely
4. Docker image builds and tests run
5. PR validation passes or fails

Everything automated, secure, and repeatable.

## Tech Stack

| Purpose | Tool | Why |
|---------|------|-----|
| Compute | Proxmox VE | Already had it |
| IaC | OpenTofu | Open-source Terraform |
| Config | Ansible | Industry standard |
| Secrets | Infisical | Self-hosted, modern |
| Storage | MinIO | S3-compatible |
| CI/CD | GitHub Actions | Built-in |
| Container | Docker | Universal |
| App | Next.js | Modern React |