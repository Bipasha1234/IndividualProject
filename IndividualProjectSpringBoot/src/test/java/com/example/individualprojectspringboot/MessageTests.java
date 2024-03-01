package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.MessagePojo;
import com.example.individualprojectspringboot.repository.MessageRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class MessageTests {

    @Autowired
    private MessageRepository messageRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void testSaveMessage() throws IOException {
        MessagePojo messagePojo = new MessagePojo();
        messagePojo.setMessageName("Test Name");
        messagePojo.setMessageEmail("bipashalamsal@gmail.com");
        messagePojo.setMessageNumber("1234567890");
        messagePojo.setMessageMsg("Test message");

        Message message = Message.builder()
                .messageName(messagePojo.getMessageName())
                .messageEmail(messagePojo.getMessageEmail())
                .messageNumber(messagePojo.getMessageNumber())
                .messageMsg(messagePojo.getMessageMsg())
                .build();

        messageRepository.save(message);

        Optional<Message> savedMessageOptional = messageRepository.findById(message.getId());
        Assertions.assertThat(savedMessageOptional.isPresent());

        Message savedMessage = savedMessageOptional.get();
        assertEquals("Test Name", savedMessage.getMessageName());
        assertEquals("bipashalamsal@gmail.com", savedMessage.getMessageEmail());
        assertEquals("1234567890", savedMessage.getMessageNumber());
        assertEquals("Test message", savedMessage.getMessageMsg());
    }

    @Test
    @Order(2)
    public void testFindAll() {
        Message message1 = new Message();
        message1.setMessageName("Message 1 Name");
        message1.setMessageEmail("message1@example.com");
        message1.setMessageNumber("1234567890");
        message1.setMessageMsg("Message 1 Content");

        Message message2 = new Message();
        message2.setMessageName("Message 2 Name");
        message2.setMessageEmail("message2@example.com");
        message2.setMessageNumber("9876543210");
        message2.setMessageMsg("Message 2 Content");

        messageRepository.save(message1);
        messageRepository.save(message2);

        List<Message> messages = messageRepository.findAll();

        assertEquals(3, messages.size());
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void testDeleteById() {
        // Save a message
        Message message = Message.builder()
                .messageName("Test Name")
                .messageEmail("test@example.com")
                .messageNumber("1234567890")
                .messageMsg("Test message")
                .build();
        messageRepository.save(message);

        // Retrieve the ID of the saved message
        Integer messageId = message.getId();

        // Delete the message by its ID
        messageRepository.deleteById(messageId);

        // Attempt to find the deleted message by its ID
        Optional<Message> deletedMessageOptional = messageRepository.findById(messageId);

        // Assert that the deleted message is not present
        assertFalse(deletedMessageOptional.isPresent());
    }

}
