package com.skiut.gateway

import com.skiut.gateway.router.RouterPath
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GatewayApplication

val beans = RouterPath.bean

fun main(args: Array<String>) {
    runApplication<GatewayApplication>(*args){
        addInitializers(beans)
    }

}