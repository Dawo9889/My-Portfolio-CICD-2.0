# My Portfolio CICD 2.0

Portfolio website with automated CI/CD using self-hosted infrastructure.

## What I Built

A Next.js portfolio application with a complete DevOps setup in my homelab:

- **Next.js app** - Portfolio website with React and Tailwind CSS
- **Self-hosted secrets** - Infisical for managing credentials
- **Remote state** - MinIO (S3-compatible) for Terraform state
- **Infrastructure as Code** - OpenTofu to provision VMs on Proxmox
- **Self-hosted CI/CD** - GitHub Actions runner on my own VM
- **Automated workflows** - PR checks and testing

## The Flow

```
GitHub Push → Self-Hosted Runner → Fetch Secrets from Infisical → Build & Test
                     ↓
              Uses Docker Engine
                     ↓
              Runs on Proxmox VM
```

## 📚 Documentation

- **[Project Overview](docs-site/docs/index.md)** - What this project is about
- **[How I Set This Up](docs-site/docs/setup-process.md)** - My journey from start to finish
- [MinIO Setup](docs-site/docs/infrastructure/minio/setup.md) - S3-compatible state backend
- [Infisical Setup](docs-site/docs/infrastructure/infisical/setup.md) - Secrets management
- [OpenTofu Setup](docs-site/docs/infrastructure/tofu/setup.md) - VM provisioning

## Tech Stack

- Next.js 15 + React 18 + TypeScript + Tailwind CSS
- Docker
- OpenTofu (Terraform) + Ansible
- Infisical (secrets) + MinIO (S3)
- GitHub Actions (self-hosted)
- Proxmox VE

---

![PR CI](https://github.com/Dawo9889/My-Portfolio-CICD-2.0/actions/workflows/pr-ci.yml/badge.svg)
