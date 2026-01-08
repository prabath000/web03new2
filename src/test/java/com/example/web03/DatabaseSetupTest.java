package com.example.web03;

import com.example.web03.model.Project;
import com.example.web03.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class DatabaseSetupTest {

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    public void testProjectsTableCreation() {
        // Test that the projects table exists and we can query it
        List<Project> projects = projectRepository.findAll();
        
        // Should have 4 projects from our data.sql
        assertEquals(4, projects.size(), "Should have 4 projects from data.sql");
        
        // Verify first project details
        Project firstProject = projects.get(0);
        assertEquals("Portfolio Website", firstProject.getTitle());
        assertEquals("completed", firstProject.getStatus());
        assertNotNull(firstProject.getDescription());
        assertNotNull(firstProject.getImage());
        
        // Verify all projects have required fields
        for (Project project : projects) {
            assertNotNull(project.getId(), "Project ID should not be null");
            assertNotNull(project.getTitle(), "Project title should not be null");
            assertNotNull(project.getStatus(), "Project status should not be null");
        }
    }

    @Test
    public void testProjectRepository() {
        // Test CRUD operations
        Project newProject = new Project("Test Project", "Test Description", "testing", "test-image.jpg");
        Project savedProject = projectRepository.save(newProject);
        
        assertNotNull(savedProject.getId(), "Saved project should have an ID");
        assertEquals("Test Project", savedProject.getTitle());
        
        // Test find all
        List<Project> allProjects = projectRepository.findAll();
        assertTrue(allProjects.size() > 0, "Should find projects");
        
        // Clean up
        projectRepository.delete(savedProject);
    }
}