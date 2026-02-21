resource "proxmox_vm_qemu" "cloud-init" {
  name        = var.vm_config.vm_name
  target_node = var.vm_config.target_node

  clone      = var.vm_config.cloud_init_template
  full_clone = false

  scsihw  = "virtio-scsi-single"
  os_type = "cloud-init"
  memory  = var.vm_config.vm_memory

  start_at_node_boot = true


  agent = 1

  ipconfig0 = var.vm_config.vm_ip

  sshkeys = join("\n", var.vm_config.ssh_keys)

  serial {
    id   = 0
    type = "socket"
  }

  cpu {
    cores = var.vm_config.vm_cores
    type  = "host"
  }

  network {
    id       = 0
    model    = "virtio"
    bridge   = var.vm_config.bridge
    firewall = true
    tag      = 0
    macaddr  = var.vm_config.mac_address
  }

  disks {
    scsi {
      scsi0 {
        disk {
          size      = "16"
          storage   = "local-lvm"
          replicate = "true"
        }
      }
    }
    ide {
      ide0 {
        cloudinit {
          storage = "local-lvm"
        }
      }
    }
  }
  tags = "portfolio-cicd" # Set to empty string explicitly

  startup_shutdown {
    order            = -1
    shutdown_timeout = -1
    startup_delay    = -1
  }

}