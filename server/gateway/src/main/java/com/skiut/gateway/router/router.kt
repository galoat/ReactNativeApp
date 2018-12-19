package com.skiut.gateway.router


import com.skiut.gateway.entity.Personne

import org.reactivestreams.Publisher

import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancerExchangeFilterFunction
import org.springframework.cloud.stream.annotation.EnableBinding
import org.springframework.cloud.stream.messaging.Source
import org.springframework.context.support.beans

import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToFlux
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.body
import org.springframework.web.reactive.function.server.bodyToFlux
import org.springframework.web.reactive.function.server.router

@EnableBinding(Source::class)
class RouterPathPersonneService{

    companion object {
        val bean = beans {
            bean {
                WebClient.builder().filter(ref<LoadBalancerExchangeFilterFunction>()).build()
            }
            bean {

                val src = ref<Source>()
                val reply = ref<Producer>()
                val client = ref<WebClient>()
                router {
                    POST("/personnes") {

                       val send  : Publisher<Boolean>  = it.bodyToFlux<Personne>()
                                .map { reply.sendMessage(it.name!!) }
                               .map{it}
                        ServerResponse.ok().body(send)
/*                    val sent : Publisher<Boolean> =    it.bodyToFlux<Personne>()
                                .map { MessageBuilder.withPayload(it.name ?: "Default").build() }
                                .map { src.output().send(it) }
                        ServerResponse.ok().body(sent)*/
                    }
                    GET("/personnes") {
                        val body: Publisher<String> = client.get().uri("http://personne-service/personnes").retrieve().bodyToFlux<Personne>().map { it.name }
                        ServerResponse.ok().body(body);
                    }
                }
            }
        }
    }
}
