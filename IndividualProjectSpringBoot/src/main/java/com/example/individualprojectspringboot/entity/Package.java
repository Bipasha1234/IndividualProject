package com.example.individualprojectspringboot.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name="packages")
public class Package {
        @Id
        @SequenceGenerator(name = "package_seq_gen", sequenceName = "package_id_seq", allocationSize = 1)
        @GeneratedValue(generator = "package_seq_gen", strategy = GenerationType.SEQUENCE)
        private Integer id;

        @Column(name = "package_name", nullable = false,length = 255)
        private String packageName;

        @Column(name = "package_image", nullable = false)
        private String packageImage;

        @Column(name = "package_description", nullable = false, length = 5000)
        private String packageDescription;

        @Column(name = "package_difficulty", nullable = false, length = 255)
        private String packageDifficulty;

        @Column(name = "package_per_price", nullable = false)
        private String packagePerPrice;

        @Column(name = "package_max_altitude", nullable = false)
        private String packageMaxAltitude;

        @Column(name = "package_best_time", nullable = false, length = 255)
        private String packageBestTime;

        @Column(name = "package_itinerary", nullable = false, length = 5000)
        private String packageItinerary;

        @Column(name = "package_faq", nullable = false, length = 5000)
        private String packageFaq;
        @Column(name = "package_duration", nullable = false, length = 255)
        private String packageDuration;
}
