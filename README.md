# VERIFLY — Verified Digital Skill-Badge Portal

**VERIFLY — Skills you can prove.**

A Web Technologies PBL project implementing a verified digital skill-badge portal and comparing **CGI and Java Servlet request-processing models** using the same badge-verification task.

## Project Overview

VERIFLY allows students to receive digital skill badges and provides a public verification mechanism using a unique verification code.

The project implements badge verification using two different approaches:

- **Python CGI** running through Apache HTTP Server
- **Java Servlet** running on Apache Tomcat

Both implementations perform the same database lookup against MySQL, allowing their request-processing behaviour to be compared.

## Features

- Student badge wallet
- Public badge verification
- Admin badge issuance
- MySQL database persistence
- Java Servlet backend
- Python CGI verification
- CGI vs Servlet benchmark
- Responsive HTML/CSS/JavaScript frontend

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Servlet Backend | Java, Jakarta Servlet API |
| CGI Backend | Python CGI |
| Application Server | Apache Tomcat 10 |
| Web Server | Apache HTTP Server |
| Database | MySQL |
| Build Tool | Maven |

## Implemented API Endpoints

### Java Servlet

**Verify a badge**

```text
GET /api/verify?code=WX-SRV-8A29K


Issue a badge

POST /api/badges/issue
Python CGI

Verify a badge

GET /cgi-bin/verify.py?code=WX-SRV-8A29K

The CGI and Servlet verification implementations use the same database information and verification task.

Database

The project uses a MySQL database named:

verifly_db

Main tables:

students
modules
badges

Database credentials are supplied through environment variables and are not stored in the repository.

Example:

export VERIFLY_DB_USER="root"
export VERIFLY_DB_PASSWORD="your_password"
Benchmark Results

A local 10-request test was performed using the same badge-verification task.

Implementation	Requests	Total Time	Average
Java Servlet	10	0.212 s	0.0212 s/request
Python CGI	10	0.989 s	0.0989 s/request

These measurements are specific to the local development environment and workload. They are intended to demonstrate the difference between the CGI and Servlet request-processing models.

Project Structure
VERIFLY/
├── admin/
├── student/
├── assets/
├── css/
├── js/
├── CGI/
├── backend/
├── docs/
├── index.html
├── verify.html
├── benchmark-results.txt
└── README.md
Important Directories
admin/ — Admin dashboard and management pages
student/ — Student portal pages
js/ — Frontend JavaScript logic
css/ — Frontend styling
CGI/ — Python CGI verification implementation
backend/ — Java Servlet/Maven backend
docs/ — Backend integration documentation
Running the Project
Frontend

Serve the project directory using a local web server and open the provided URL.

Java Servlet Backend

Build the backend using Maven:

mvn clean package

Deploy the generated WAR file to Apache Tomcat 10.

The backend requires the database environment variables:

export VERIFLY_DB_USER="root"
export VERIFLY_DB_PASSWORD="your_password"
CGI

The Python CGI script is configured to run through Apache HTTP Server.

Example verification URL:

http://localhost/cgi-bin/verify.py?code=WX-SRV-8A29K
Demo Verification Code

A sample verification code available in the database is:

WX-SRV-8A29K
Project Objective

The main objective is to demonstrate the implementation of a digital badge verification system while comparing two server-side request-processing approaches:

CGI vs Java Servlets

The comparison focuses on their request handling and measured response performance under the same verification workload.

Project Status
Frontend: Implemented
MySQL database: Implemented
Java Servlet verification: Implemented
Badge issuance: Implemented
Python CGI verification: Implemented
CGI vs Servlet benchmark: Completed
