# MinIO Setup for Terraform State

Setting up MinIO to store Terraform/OpenTofu state files with proper access controls.

## Running MinIO

Using Docker Compose:

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

Start it up and access the console at `http://<YOUR_HOST>:9001`.

## Installing MinIO Client

```bash
brew install minio-mc
```

## Setting Up an Alias

Point the client at your MinIO server:

```bash
mc alias set minio http://<MINIO_HOST>:9000 <MINIO_ROOT_USER> <MINIO_ROOT_PASSWORD>
```

Replace the placeholders with your actual MinIO host and root credentials.

## Creating the Bucket

```bash
mc mb minio/terraform-states
```

## Creating a Policy

Create a file `tfstate_policy.json` with limited permissions for just this bucket:

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

Add it to MinIO:

```bash
mc admin policy add minio tfstate-policy tfstate_policy.json
```

## Creating a User

Create a dedicated user for Terraform with limited permissions:

```bash
mc admin user add minio tf-state-user <STRONG_PASSWORD>
mc admin policy attach minio tfstate-policy --user tf-state-user
```

Use a strong password and save it in Infisical (not in a text file somewhere).

## Testing Access

```bash
mc ls minio/terraform-states
```

Should show an empty bucket without permission errors.

## Using With Terraform

The backend configuration is covered in the [OpenTofu setup guide](../tofu/setup.md).

## Console Dashboard

You can manage everything through the web UI at `http://<YOUR_HOST>:9001` (or the HTTPS URL if behind a proxy).

![MinIO Console](../../media/infrastructure/minio/dashboard.png)
_The MinIO console showing the terraform-states bucket._