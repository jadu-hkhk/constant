>  This project is under active development.

# Constant – Uptime Monitoring Platform

A real-time website monitoring system built with a microservices architecture to track website availability and response times.

## Architecture

![Architecture Diagram](https://github.com/user-attachments/assets/bf7b1164-fb30-46d3-bac3-29e7840d5746)

### Services
- **API Service** – Handles user authentication and website management via RESTful endpoints  
- **Pusher Service** – Pushes website monitoring jobs into the queue every 3 minutes  
- **Worker Service** – Performs health checks and updates the database with status and response times  
- **Web Frontend** – Displays real-time status and response times for websites tracked by the user

## Tech Stack
- **Backend**: Node.js, Express.js, TypeScript  
- **Frontend**: Next.js 15, React, Tailwind CSS  
- **Database**: PostgreSQL with Prisma ORM  
- **Message Queue**: Redis Streams  
- **Authentication**: JWT with httpOnly cookies  

## Current Features
- User authentication (signup/signin)  
- Add websites for monitoring  
- Automated health checks every 3 minutes  
- Response time tracking  
- Real-time status dashboard  

## Planned Features
- Deployment with Docker and CI/CD pipeline  
- Custom check intervals per website  
- Email and webhook alerts for downtime  
- Historical uptime charts  
- Kubernetes deployment  
- Time-series database for metrics storage  
- Enable multi-region monitoring (infrastructure-ready; subject to cost feasibility)  
