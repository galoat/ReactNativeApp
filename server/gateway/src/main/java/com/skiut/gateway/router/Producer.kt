package com.skiut.gateway.router

import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.header.internals.RecordHeader
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.requestreply.ReplyingKafkaTemplate
import org.springframework.kafka.support.KafkaHeaders
import org.springframework.stereotype.Service
import java.util.concurrent.ExecutionException


@Service
class Producer {

    @Autowired
    internal var kafkaTemplate: ReplyingKafkaTemplate<String, String, Boolean>? = null


    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendMessage(message: String): Boolean? {
        println(String.format("#### -> Producing message -> %s", message))
        val record = ProducerRecord<String, String>("personne", message)
        record.headers().add(RecordHeader(KafkaHeaders.REPLY_TOPIC, "test".toByteArray()))
        val sendAndReceive = kafkaTemplate!!.sendAndReceive(record)
        val sendResult = sendAndReceive.sendFuture.get()
        // get consumer record
        val consumerRecord = sendAndReceive.get()
        return consumerRecord.value()
    }
}