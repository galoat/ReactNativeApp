package com.skiut.gateway.router


import com.skiut.gateway.entity.Personne

import org.reactivestreams.Publisher

import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancerExchangeFilterFunction
import org.springframework.cloud.stream.annotation.EnableBinding
import org.springframework.cloud.stream.annotation.Input
import org.springframework.cloud.stream.annotation.Output
import org.springframework.cloud.stream.messaging.Processor
import org.springframework.context.annotation.Bean
import org.springframework.context.support.beans
import org.springframework.integration.annotation.Gateway
import org.springframework.integration.annotation.MessagingGateway
import org.springframework.integration.dsl.HeaderEnricherSpec
import org.springframework.integration.dsl.IntegrationFlow
import org.springframework.integration.dsl.IntegrationFlows
import org.springframework.messaging.MessageChannel
import org.springframework.messaging.SubscribableChannel
import java.util.function.Consumer
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToFlux
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.body
import org.springframework.web.reactive.function.server.bodyToFlux
import org.springframework.web.reactive.function.server.router
import org.xerial.snappy.Snappy
import java.io.ByteArrayOutputStream

@EnableBinding(GatewayChannels::class )
class RouterPathPersonneService {

    companion object {

        val bean = beans {
            bean {
                WebClient.builder().filter(ref<LoadBalancerExchangeFilterFunction>()).build()
            }

            bean {

                val src = ref<StreamGateway>()
                //  val reply = ref<Producer>()
                val client = ref<WebClient>()

                router {
                    POST("/personnes") {

                        /*   val send  : Publisher<Boolean>  = it.bodyToFlux<Personne>()
                                .map { reply.sendMessage(it.name!!) }
                               .map{it}
                        ServerResponse.ok().body(send)*/
                        System.out.println("received $it")
                        src.process("mnfienin")
                        val sent: Publisher<Boolean> = it.bodyToFlux<Personne>()
                                .map {src.process(it.name ?: "test") }
                                .map{ Snappy.isValidCompressedBuffer(it) }


                        ServerResponse.ok().body(sent)
                    }
                    GET("/personnes") {
                        val body: Publisher<String> = client.get().uri("http://personne-service/personnes").retrieve().bodyToFlux<Personne>().map { it.name }
                        ServerResponse.ok().body(body);
                    }
                }
            }
        }
    }



    @Bean
    fun headerEnricherFlow(): IntegrationFlow {
        return IntegrationFlows.from(GatewayChannels.ENRICH)
                .enrichHeaders(Consumer<HeaderEnricherSpec> { it.headerChannelsToString() })
                .channel(GatewayChannels.REQUEST)
                .get()
    }


    @MessagingGateway
    interface StreamGateway {

        @Gateway( requestChannel= GatewayChannels.ENRICH , replyChannel = GatewayChannels.REPLY)
        fun process(payload: String): ByteArray?
    }
}




    internal interface GatewayChannels {

        @Output(REQUEST)
        fun request(): MessageChannel

        @Input(REPLY)
        fun reply(): SubscribableChannel



        companion object {

            const val REQUEST = "request"


            const val REPLY = "reply"

            const val ENRICH = "enrich"
        }
    }
