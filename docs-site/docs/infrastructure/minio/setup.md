**MinIO Setup for Terraform State**

This guide configures a local or remote MinIO server to host Terraform state in an S3-compatible bucket with scoped permissions.

**1) Run MinIO with Docker**
Use Docker Compose or a single container. Example Compose service:

```yaml
services:
  minio:
    image: minio/minio:latest
    container_name: minio-server
    ports:
      - "9000:9000"   # S3 API
      - "9001:9001"   # Admin Console
    environment:
      - MINIO_ROOT_USER=${MINIO_ROOT_USER}
      - MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}
    volumes:
      - /mnt/minio:/data
    command: server /data --console-address ":9001"
```

Start the stack and confirm the console at `http://<MINIO_HOST>:9001`.

**2) Install MinIO Client (mc)**

```bash
brew install minio-mc
```

**3) Create an alias to your MinIO server**

```bash
mc alias set minio http://<MINIO_HOST>:9000 <MINIO_ROOT_USER> <MINIO_ROOT_PASSWORD>
```

Replace `<MINIO_HOST>` with the IP/hostname where MinIO is running.

**4) Create the Terraform state bucket**

```bash
mc mb minio/terraform-states
```

**5) Create a restricted policy for Terraform state**
Create a file named `tfstate_policy.json` with the following content:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucketForTfState",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::terraform-states"]
    },
    {
      "Sid": "ReadWriteObjectsInTfState",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:AbortMultipartUpload"
      ],
      "Resource": ["arn:aws:s3:::terraform-states/*"]
    }
  ]
}
```

Add the policy to MinIO:

```bash
mc admin policy add minio tfstate-policy tfstate_policy.json
```

**6) Create a dedicated Terraform user**

```bash
mc admin user add minio tf-state-user <SECRET>
mc admin policy attach minio tfstate-policy --user tf-state-user
```

Use a strong `<SECRET>` and store it securely (e.g., in Infisical).

**7) Verify access**

```bash
mc ls minio/terraform-states
```

You should see an empty bucket with no permission errors.

**8) Configure Terraform to use MinIO (S3 backend)**
Configuration process will be provided in the terraform section TODO: ADD LINKS

**Dashboard**

You can manage buckets and users via the MinIO Console at `http://<MINIO_HOST>:9001` or at the https link if You put server behind the proxy.

![MinIO Console – Bucket List](../../media/infrastructure/minio/dashboard.png)
_Figure: MinIO administration console showing the terraform-states bucket._