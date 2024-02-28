package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.controller.MessageController;
import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.MessagePojo;
import com.example.individualprojectspringboot.service.MessageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MessageTests {

    @Mock
    private MessageService messageService;

    @InjectMocks
    private MessageController messageController;

    @Test
    public void testSaveMessage() throws IOException {
        MessagePojo messagePojo = new MessagePojo();
        messagePojo.setMessageName("Test Name");
        messagePojo.setMessageEmail("test@example.com");
        messagePojo.setMessageNumber("1234567890");
        messagePojo.setMessageMsg("Test message");

        String result = messageController.saveMessage(messagePojo);

        assertEquals("data created successfully yohhh", result);
        verify(messageService, times(1)).saveMessage(messagePojo);
    }

    @Test
    public void testFindAll() {
        Message message1 = new Message();
        Message message2 = new Message();
        when(messageService.findAll()).thenReturn(Arrays.asList(message1, message2));

        List<Message> result = messageController.findAll();

        assertEquals(2, result.size());
        verify(messageService, times(1)).findAll();
    }

    @Test
    public void testDeleteById() {
        messageController.deleteById(1);

        verify(messageService, times(1)).deleteById(1);
    }
}
