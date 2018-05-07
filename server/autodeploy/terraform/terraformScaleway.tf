provider "scaleway" {
    region = "par1"
}


resource "scaleway_ip" "ip" {
    server = "${scaleway_server.test.id}"
    provisioner "local-exec" {
        command = "echo ${scaleway_ip.ip.ip}> ip_address.txt"
    }

provisioner "local-exec" {
      command = "printf '[all] \n ${scaleway_ip.ip.ip}' > ${var.inventory_path}"
    }

provisioner "local-exec" {
      command = "ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook -i ${var.inventory_path} ${var.path_ansible}"

    }

}


resource "scaleway_server" "test"{
    name = "testToDestroy"
    type = "${var.commercial_type}"
    image = "${data.scaleway_image.docker.id}"
}


output "ip" {
    value = "${scaleway_ip.ip.ip}"
}
