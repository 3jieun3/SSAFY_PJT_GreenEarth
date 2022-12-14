package com.greenEarth.chatting.controller;

import com.greenEarth.chatting.dto.ChatMessage;
import com.greenEarth.chatting.dto.ChatNotice;
import com.greenEarth.chatting.service.ChatProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    @Value("${spring.kafka.template.default-topic}")
    private String KAFKA_TOPIC;

    private final ChatProducer chatProducer;

    @MessageMapping("/notice")
    public void sendNotice(ChatNotice notice) {
        chatProducer.sendNotice(this.KAFKA_TOPIC, notice);
    }

    @MessageMapping("/message")
    public void sendMessage(ChatMessage message) {
        chatProducer.sendMessage(this.KAFKA_TOPIC, message);
    }
}