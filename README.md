# My Portfolio CICD 2.0

Portfolio website with automated CI/CD using self-hosted infrastructure.

**📖 [View Documentation](https://dawo9889.github.io/My-Portfolio-CICD-2.0/)**

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

**[📖 Full Documentation Site →](https://dawo9889.github.io/My-Portfolio-CICD-2.0/)**

Quick links:
- [Project Overview](https://dawo9889.github.io/My-Portfolio-CICD-2.0/) - What this project is about
- [How I Set This Up](https://dawo9889.github.io/My-Portfolio-CICD-2.0/setup-process/) - My journey from start to finish
- [MinIO Setup](https://dawo9889.github.io/My-Portfolio-CICD-2.0/infrastructure/minio/setup/) - S3-compatible state backend
- [Infisical Setup](https://dawo9889.github.io/My-Portfolio-CICD-2.0/infrastructure/infisical/setup/) - Secrets management
- [OpenTofu Setup](https://dawo9889.github.io/My-Portfolio-CICD-2.0/infrastructure/tofu/setup/) - S3-compatible state backend
- [Infisical Setup](docs-site/docs/infrastructure/infisical/setup.md) - Secrets management
- [OpenTofu Setup](docs-site/docs/infrastructure/tofu/setup.md) - VM provisioning

---

![PR CI](https://github.com/Dawo9889/My-Portfolio-CICD-2.0/actions/workflows/pr-ci.yml/badge.svg)
