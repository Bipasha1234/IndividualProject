package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.MessagePojo;
import com.example.individualprojectspringboot.repository.MessageRepository;
import com.example.individualprojectspringboot.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, JavaMailSender javaMailSender) {
        this.messageRepository = messageRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void saveMessage(MessagePojo messagePojo) throws IOException {
        Message messageEntity = new Message();


        if (messagePojo.getId() != null) {
            messageEntity = messageRepository.findById(messagePojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }

        messageEntity.setMessageName(messagePojo.getMessageName());
        messageEntity.setMessageEmail(messagePojo.getMessageEmail());
        messageEntity.setMessageNumber(messagePojo.getMessageNumber());
        messageEntity.setMessageMsg(messagePojo.getMessageMsg());
        messageRepository.save(messageEntity);

        // Send email
        sendEmail(messageEntity);
    }

    @Override
    public List<Message> findAll() {
        List<Message> messages = messageRepository.findAll();
        System.out.println("Retrieved Messages: " + messages);
        return messages;
    }

    @Override
    public void deleteById(Integer id) {
        messageRepository.deleteById(id);
    }

    private void sendEmail(Message message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("bipashalamsal@gmail.com");
        mailMessage.setSubject("New Message from Contact Form");
        mailMessage.setText(
                "Name: " + message.getMessageName() + "\n" +
                        "Email: " + message.getMessageEmail() + "\n" +
                        "Phone Number: " + message.getMessageNumber() + "\n" +
                        "Message: " + message.getMessageMsg()
        );

        javaMailSender.send(mailMessage);
    }
}
