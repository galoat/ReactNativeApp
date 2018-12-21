package com.skiut.personneservice.stream;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Input;

import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Processor;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.messaging.Message;

import org.springframework.messaging.handler.annotation.SendTo;


import org.springframework.integration.support.MessageBuilder;
@EnableBinding(Processor.class)
public class PersonneMessage {

    @Setter
    private final PersonneRepository personneRepository;

    @Autowired
    public PersonneMessage(PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

 /*   @StreamListener(Processor.INPUT)
    @SendTo(Processor.OUTPUT)
    public Message process(@Input(Sink.INPUT) Flux<String> incoming){
        incoming.map(s-> new Personne(null, s))
                .flatMap(personneRepository::save
        return MessageBuilder.withPayload( false).copyHeaders()
    }*/


    @StreamListener(Processor.INPUT)
    @SendTo(Processor.OUTPUT)
    public Message test(Message<String> message){
        System.out.println("received message "+message.getPayload());
        return MessageBuilder.withPayload(false)
                .copyHeaders(message.getHeaders())
                .build();
    }
}
