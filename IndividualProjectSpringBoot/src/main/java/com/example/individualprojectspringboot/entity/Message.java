package com.example.individualprojectspringboot.entity;
import jakarta.persistence.*;
import lombok.*;
@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="message")
public class Message {
        @Id
        @SequenceGenerator(name = "message_seq_gen", sequenceName = "message_id_seq", allocationSize = 1)
        @GeneratedValue(generator = "message_seq_gen", strategy = GenerationType.SEQUENCE)
        private Integer id;

        @Column(name = "message_name", nullable = false,length = 255)
        private String messageName;

        @Column(name = "message_email", nullable = false,length = 255)
        private String messageEmail;

        @Column(name = "message_number", nullable =false, length = 255)
        private String messageNumber;

    @Column(name = "message_msg", nullable = false, length = 1000)
    private String messageMsg;
    }




