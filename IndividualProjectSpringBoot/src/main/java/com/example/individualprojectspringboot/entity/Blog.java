package com.example.individualprojectspringboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name="blogs")
public class Blog {

        @Id
        @SequenceGenerator(name = "blog_seq_gen", sequenceName = "blog_id_seq", allocationSize = 1)
        @GeneratedValue(generator = "blog_seq_gen", strategy = GenerationType.SEQUENCE)
        private Integer id;

        @Column(name = "blog_name", nullable = false,length = 255)
        private String blogName;

        @Column(name = "blog_image", nullable = false)
        private String blogImage;

        @Column(name = "blog_description", nullable = false, length = 255)
        private String blogDescription;


    }


