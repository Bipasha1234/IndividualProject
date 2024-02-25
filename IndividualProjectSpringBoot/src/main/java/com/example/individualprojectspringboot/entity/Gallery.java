package com.example.individualprojectspringboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name="gallery")
public class Gallery {
        @Id
        @SequenceGenerator(name = "gallery_seq_gen", sequenceName = "gallery_id_seq", allocationSize = 1)
        @GeneratedValue(generator = "gallery_seq_gen", strategy = GenerationType.SEQUENCE)
        private Integer id;

        @Column(name = "gallery_image", nullable = false)
        private String galleryImage;


    }




