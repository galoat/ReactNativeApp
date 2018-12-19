package com.skiut.gateway

import com.skiut.gateway.router.RouterPathPersonneService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.stream.annotation.EnableBinding
import org.springframework.cloud.stream.messaging.Source

@SpringBootApplication
class GatewayApplication

val beans = RouterPathPersonneService.bean

fun main(args: Array<String>) {
    runApplication<GatewayApplication>(*args){
        addInitializers(beans)
    }

}