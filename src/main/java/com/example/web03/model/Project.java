package com.example.web03.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String status;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image2;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image3;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image4;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image5;

    @Column(name = "github_url")
    private String githubUrl;

    public Project() {
    }

    public Project(String title, String description, String status, String image) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.image = image;
    }

    public Project(String title, String description, String status, String image, String image2, String image3, String image4, String image5, String githubUrl) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.image = image;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.image5 = image5;
        this.githubUrl = githubUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public String getImage4() {
        return image4;
    }

    public void setImage4(String image4) {
        this.image4 = image4;
    }

    public String getImage5() {
        return image5;
    }

    public void setImage5(String image5) {
        this.image5 = image5;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
}
