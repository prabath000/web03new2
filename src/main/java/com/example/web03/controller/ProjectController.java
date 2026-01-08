package com.example.web03.controller;

import com.example.web03.model.Project;
import com.example.web03.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("projects")
@CrossOrigin(origins = {"*", "http://localhost:8089"}) // Allow requests from any origin (for dev simplicity)
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        try {
            System.out.println("Received project creation request: " + project.getTitle());
            Project savedProject = projectRepository.save(project);
            System.out.println("Project saved with ID: " + savedProject.getId());
            return ResponseEntity.ok(savedProject);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error saving project: " + e.getMessage());
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<?> createProjects(@RequestBody List<Project> projects) {
        try {
            List<Project> saved = projectRepository.saveAll(projects);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error saving projects: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setTitle(projectDetails.getTitle());
                    project.setDescription(projectDetails.getDescription());
                    project.setStatus(projectDetails.getStatus());
                    project.setImage(projectDetails.getImage());
                    project.setImage2(projectDetails.getImage2());
                    project.setImage3(projectDetails.getImage3());
                    project.setImage4(projectDetails.getImage4());
                    project.setImage5(projectDetails.getImage5());
                    project.setGithubUrl(projectDetails.getGithubUrl());
                    return ResponseEntity.ok(projectRepository.save(project));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(project -> {
                    projectRepository.delete(project);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
