package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.controller.BookingController;
import com.example.individualprojectspringboot.entity.Booking;
import com.example.individualprojectspringboot.pojo.BookingPojo;
import com.example.individualprojectspringboot.service.BookingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookingTest {

    @Mock
    private BookingService bookingService;

    @InjectMocks
    private BookingController bookingController;

    @Test
    public void testSaveBooking() {
        BookingPojo bookingPojo = new BookingPojo();
        // Set up bookingPojo with required data for testing
        bookingPojo.setBookingName("Test Name");
        bookingPojo.setBookingPhoneNumber("1234567890");
        bookingPojo.setBookingEmail("test@example.com");
        bookingPojo.setBookingTripDate("2024-02-27");
        bookingPojo.setBookingTravellers("2");
        bookingPojo.setBookingExtra("Extra details");

        String result = bookingController.saveBooking(bookingPojo);

        assertEquals("Data created successfully!", result);
        verify(bookingService, times(1)).saveBooking(bookingPojo);
    }

    @Test
    public void testFindAll() {
        Booking booking1 = new Booking();
        Booking booking2 = new Booking();
        when(bookingService.findAll()).thenReturn(Arrays.asList(booking1, booking2));

        List<Booking> result = bookingController.findAll();

        assertEquals(2, result.size());
        verify(bookingService, times(1)).findAll();
    }

    @Test
    public void testFindById() {
        Booking booking = new Booking();
        when(bookingService.findById(1)).thenReturn(Optional.of(booking));

        Optional<Booking> result = bookingController.findById(1);

        assertEquals(Optional.of(booking), result);
        verify(bookingService, times(1)).findById(1);
    }

    @Test
    public void testDeleteById() {
        bookingController.deleteById(1);

        verify(bookingService, times(1)).deleteById(1);
    }
}
