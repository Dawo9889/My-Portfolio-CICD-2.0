# Setting This Up

Here's how I built this project from scratch. The decisions I made, what worked, what didn't.

## What I Was Going For

I wanted to build a portfolio site but actually learn DevOps properly:
- Write infrastructure as code
- Handle secrets the right way (not in git)
- Set up my own CI/CD pipeline
- Do it like you'd do it at work, not just for a tutorial

## How I Built It

### Step 1: Where Do I Put My State Files?

**The problem:** Terraform state files need to live somewhere that isn't my laptop.

I went with **MinIO** - it's basically S3 but self-hosted. Runs in Docker on one of my servers and gives me an S3-compatible API for free. No AWS bills, full control over the data.

Why this matters: With remote state, I can run terraform from anywhere. CI/CD can access it, other machines can access it. Not tied to one laptop.

[→ How I set up MinIO](infrastructure/minio/setup.md)

---

### Step 2: Where Do Secrets Go?

**The problem:** API tokens, passwords, SSH keys - where do these live?

**Infisical** was my answer. Self-hosted secrets vault with a clean UI. Instead of `.env` files all over the place, everything lives in one vault and gets injected at runtime with `infisical run`.

What I like about it: OIDC support for GitHub Actions means no long-lived tokens. The runner authenticates, grabs secrets, uses them, they expire. Clean.

[→ Infisical setup details](infrastructure/infisical/setup.md)

---

### Step 3: Provisioning VMs

**The challenge:** I got tired of manually creating VMs in Proxmox.

Wrote **OpenTofu** code (Terraform but open-source) to spin up Ubuntu VMs automatically. Cloud-init handles the initial setup - SSH keys, network config, all that. It's all in code now.

Running it looks like:
```bash
infisical run --env=prod --path=/tofu -- tofu apply
```

Secrets come from Infisical, VM gets created. Done.

What I learned: Cloud-init is great for initial VM bootstrapping. No need to SSH in and run setup scripts manually.

[→ OpenTofu configuration](infrastructure/tofu/setup.md)

---

### Step 4: Configuring the VM

**The need:** Fresh Ubuntu VM needs Docker and proper setup.

Used **Ansible** for this. One playbook that:
- Installs Docker
- Sets up user permissions
- Makes sure everything starts on boot

Run it once, VM is ready. Run it again, still works (idempotent).

Lesson learned: Ansible is forgiving. You can run playbooks multiple times without breaking stuff.

---

### Step 5: CI/CD Runner

**The decision:** GitHub-hosted runners or my own?

Went self-hosted because:
- Can hit my private network stuff (Infisical, MinIO)
- Full control over what's installed
- No per-minute costs
- Can customize the environment exactly how I want

Set it up as a systemd service on the VM. Combined with **OIDC authentication** so workflows can grab secrets without storing static tokens.

What I learned: OIDC is way better than static tokens. Short-lived credentials, automatic rotation. Should've done this from the start.

---

### Step 6: The App

Built a **Next.js 15** portfolio site:
- React 18 with TypeScript
- Tailwind for styling
- Multi-stage Dockerfile (build stage + runtime)
- Final image under 200MB

**The current workflow:**
1. Push code
2. Self-hosted runner picks it up
3. Authenticates to Infisical with OIDC
4. Grabs secrets, builds Docker image
5. Tests run
6. PR gets validated

All automated.

## What I Learned

**Infrastructure as Code pays off**  
Being able to nuke everything and rebuild from code is powerful. No more "it works on my machine" problems.

**Proper secrets management matters**  
Infisical with runtime injection is way cleaner than `.env` files everywhere. And OIDC beats static tokens every time.

**Self-hosting gives you flexibility**  
My own runner means I can hit private network stuff and install whatever tools I need. Worth the extra setup.

**Write it down**  
Documenting this helps me remember what I did and why. Future me will thank current me.

## End Result

When I push code now:

1. GitHub webhook hits my runner
2. Runner does OIDC auth to Infisical
3. Secrets get pulled in
4. Docker build happens, tests run
5. PR validation completes

Everything's automated, secured, and reproducible.

## What I Used

| What It Does | Tool | Why |
|---------|------|-----|
| Compute | Proxmox VE | Already had it running |
| IaC | OpenTofu | Open-source Terraform fork |
| Config Management | Ansible | Standard tool, does the job |
| Secrets | Infisical | Self-hosted, modern, has OIDC |
| State Storage | MinIO | S3-compatible, local |
| CI/CD | GitHub Actions | Built into GitHub |
| Containers | Docker | Everyone uses it |
| Web Framework | Next.js | Modern React setup |