**Initial draft of Project Requirement Specification Document: NAAM Alumni Website**

**1. Introduction:**

   1.1 **Project Overview:**

    The purpose of this project is to design and develop a dynamic website for Navodaya vidyalaya Palakkad.

   1.2 **Project Objectives:**
   - Provide a platform for alumni to connect and network.
   - Include an interactive map to visually represent the global distribution of alumni.
   - Facilitate communication between alumni and the school.
   - Showcase students & alumni achievements and success stories.
   - Provide event management features for alumni gatherings.
   
**2. System Requirements:**


   2.1 **Functional Requirements:**
   
   -  **User Authentication:**
         - Alumni should be able to register, log in, and manage their profiles.      
   - **Profile Management:**
      - Alumni can update personal information, add educational and professional details, and upload photos.
   - **Alumni Directory:**
     -  A searchable directory of alumni profiles with filtering options.
     -  User can choose to enable or disable publish contact details.
   - **News and Updates:**
     -  Display latest news, achievements, and updates from the school and alumni community.
     -  Admin can able to push new pictures , news with their privileges. 
     -  Include a subscription feature for alumni to receive newsletters via email.
        -  **Push notification and alerts:**
           -  Allow push notification from the site
           -  Enable email alerts / subscription based plan
         - **Events Calendar:**
           - Feature to announce and manage alumni events, reunions, and gatherings.
           - Allow alumni to create and promote their own events within the community.
   - **Discussion Forum:**
     -  Provide a forum for alumni to discuss various topics, share experiences, and seek advice.
     -  Allow integrating whatsapp pointing to NAAM channel
        -  **Mentorship Program:**
           -  Implement a mentorship program connecting alumni who are willing to mentor with those seeking guidance.
           - Include a structured system for mentor-mentee matching based on career goals and interests.
        -  **Job Board:**
           - Platform for alumni to post job opportunities and job seekers to explore.
   - **Photo and Video Gallery:**
     - A section for sharing and viewing photos and videos related to alumni events.
     - Allow alumni to upload and tag others in their photos.
         - Archive the old gallery
         - Maybe admin can post or approve to publish.
   - **Social Media Integration:**
     -  Connect the alumni website with popular social media platforms to facilitate seamless sharing and networking.
   - **Interactive Polls and Surveys:**
      - Conduct polls and surveys to gather feedback from alumni regarding events, and potential improvements.
      - Poll links should be sharable in nature
   - **Donation Portal:** (not payment integration)
     -  Highlight ongoing and past fundraising campaigns and projects.
     -  Page sowing alumni's contributions thus far and also open for new voluntary contribution (a simple form to allow gather details)    .    
     -  
2.2 **Non-functional Requirements:**

   - **Performance:**
         - The website should load within 3~5 seconds for optimal user experience.
   - **Security:**
          - Implement secure user authentication and data encryption.
   - **Scalability:**
          - The system should be scalable to accommodate a growing number of users and data.
   - **Compatibility:**
         - Ensure compatibility with major web browsers (Chrome, Firefox, Safari, Edge).
   - **Mobile Responsiveness:**
         - The website should be accessible and user-friendly on various devices, including smartphones and tablets.
   - **Backup and Recovery:**
         - Regularly backup data and implement a recovery plan in case of system failures. 
         - [Yet to discuss] about DR plans
         
**3. Technology Stack:**

[Negotiable topic, its not primary focus of alumni to choose the stack however its good to have control over limiting the choice of modern & most common stack among the community]

   - **Frontend:**
      - HTML5, CSS3, JavaScript (React or Angular)
   - **Backend:**
      - Node.js, Express.js, MongoDB
   - **Authentication:**
      - JSON Web Tokens (JWT)
   - **Hosting:**
      - [Yet to discuss]
   - **Version Control:**
      - Git/GitHub for code versioning.
   - **Security:**
      - HTTPS, SSL/TLS for data encryption.
   
**4. Key Epics:**
   - As an alumni member, I want to log in to my profile and update my contact information. [Public, admin only, members only]
   - As an event organizer (not main admin), I want to create and manage alumni events.
   - As a job seeker, I want to explore job opportunities posted by fellow alumni.
   - As an admin, I should be able to publish, remove or archive existing contents.
   - As an admin , I should be able to restrict malicious users from being interacting.

**5. Project Timeline:**
   -  [Yet to discuss] phase like development, testing, and deployment.

**6. Testing:**
   - [Yet to discuss] , some subdomains should be provided for alumni management for approval

**7. Acceptance Criteria:**
   - [Yet to discuss]

**8. Budget and Resources:**
   - [Yet to discuss]

**9. Risks and Mitigation:**
   - Member Privacy
   - Data protection
 

**10. Approval:**
   - Alumni management should approve the final PRS and confirm the iterative features publishing in subdomain before go live.
   - We don't need watterfall model of giving all at once, rather provide us iterative rollouts in a 2 weeks sprint.
   - Change requests are also subject to approval from alumni management. 

**11. Documentation:**
   - Proper documentation of the codebase, system architecture, and any third-party integrations should be provided upon completion of the project.
   - Should be included along with the version control to keep track of the changes on every iteration.

**12. Maintenance and Support:**
   - [Yet to discuss]

**Note:** This document serves as a template. Modify and expand upon it based on specific requirements and discussions with alumni.
          Regular communication and feedback loops with the alumni community are crucial for the success of the project.




``` 
last edit : jidhin @ 2023-11-18 16:08 
send for initial review 
```
