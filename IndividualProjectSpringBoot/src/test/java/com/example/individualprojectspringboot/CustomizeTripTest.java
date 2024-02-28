import com.example.individualprojectspringboot.controller.CustomizeTripController;
import com.example.individualprojectspringboot.entity.CustomizeTrip;
import com.example.individualprojectspringboot.pojo.CustomizeTripPojo;
import com.example.individualprojectspringboot.service.CustomizeTripService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomizeTripTest {

    @Mock
    private CustomizeTripService customizeTripService;

    @InjectMocks
    private CustomizeTripController customizeTripController;

    @Test
    public void testSaveTrip() throws IOException {
        CustomizeTripPojo customizeTripPojo = new CustomizeTripPojo();
        customizeTripPojo.setFullName("John Doe");
        customizeTripPojo.setPhoneNumber("1234567890");
        customizeTripPojo.setEmailAddress("john@example.com");
        customizeTripPojo.setSelectTrip("Trip to Mountains");
        customizeTripPojo.setApproxDate("2024-03-01");
        customizeTripPojo.setTripLength("5 days");
        customizeTripPojo.setNumberOfAdults("2");
        customizeTripPojo.setNumberOfChildren("1");
        customizeTripPojo.setTourType("Adventure");
        customizeTripPojo.setHotelType("Luxury");
        customizeTripPojo.setEstimatedBudget("High");
        customizeTripPojo.setGuideLanguage("English");
        customizeTripPojo.setMoreInfo("Additional info");
        customizeTripPojo.setWhereDidYouFindUs("Google");

        String result = customizeTripController.saveTrip(customizeTripPojo);

        assertEquals("data created successfully yohhh", result);
        verify(customizeTripService, times(1)).saveTrip(customizeTripPojo);
    }

    @Test
    public void testFindAll() {
        CustomizeTrip trip1 = new CustomizeTrip();
        CustomizeTrip trip2 = new CustomizeTrip();
        when(customizeTripService.findAll()).thenReturn(Arrays.asList(trip1, trip2));

        List<CustomizeTrip> result = customizeTripController.findAll();

        assertEquals(2, result.size());
        verify(customizeTripService, times(1)).findAll();
    }

    @Test
    public void testDeleteById() {
        customizeTripController.deleteById(1);

        verify(customizeTripService, times(1)).deleteById(1);
    }
}
