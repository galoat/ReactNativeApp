variable "commercial_type" {
  default = "VC1S"
}


variable "architectures" {
  default = {
    C1   = "arm"
    VC1S = "x86_64"
    VC1M = "x86_64"
    VC1L = "x86_64"
    C2S  = "x86_64"
    C2M  = "x86_64"
    C2L  = "x86_64"
  }
}

variable "image" {
    default = "Ubuntu Xenial"
}

variable "imagedocker" {
    default = "docker"
}

data "scaleway_image" "ubuntu" {
  architecture = "${lookup(var.architectures, var.commercial_type)}"
  name = "${var.image}"
}

data "scaleway_image" "docker" {
  architecture = "${lookup(var.architectures, var.commercial_type)}"
  name = "Docker"
}


variable "inventory_path" {
    default = "hosts"
}

variable "path_ansible"{
    default = "../ansible/deploy.yml"
}
