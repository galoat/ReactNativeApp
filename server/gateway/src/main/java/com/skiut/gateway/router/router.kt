package com.skiut.gateway.router


import com.skiut.gateway.entity.Personne
import org.reactivestreams.Publisher
import org.springframework.boot.SpringApplication
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancerExchangeFilterFunction
import org.springframework.context.support.beans
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToFlux
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.body
import org.springframework.web.reactive.function.server.router

class RouterPathPersonneService{
    companion object {
        val bean = beans {
            bean {
                WebClient.builder().filter(ref<LoadBalancerExchangeFilterFunction>()).build()
            }
            bean {
                val client = ref<WebClient>()
                router {
                    GET("/personnes") {
                        val body: Publisher<String> = client.get().uri("http://personne-service/personnes").retrieve().bodyToFlux<Personne>().map { it.name }
                        ServerResponse.ok().body(body);
                    }
                }
            }
        }
    }
}


