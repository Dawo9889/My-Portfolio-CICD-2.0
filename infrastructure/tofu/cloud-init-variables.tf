variable "vm_config" {
  type = object({
    target_node         = string
    vm_name             = string
    cloud_init_template = string
    vm_memory           = number
    vm_cores            = number
    vm_state            = string
    vm_ip               = string
    bridge              = string
    mac_address         = string
    ssh_keys            = list(string)
  })
  default = {
    target_node         = "pve"
    vm_name             = "portfolio-cicd"
    cloud_init_template = "ubuntu-cloud"
    vm_memory           = 2048
    vm_cores            = 2
    vm_state            = "started"
    vm_ip               = "ip=192.168.1.16/24,gw=192.168.1.1"
    bridge              = "vmbr0"
    mac_address         = "bc:24:11:0b:ec:8f"
    ssh_keys = [ "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILhKpbWy7VPP7p7CL0/DdNtrWHnTTogaAfXmNegECbJZ For automation" ]
  }
}