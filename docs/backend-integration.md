# VERIFLY Backend Integration

VERIFLY is a verified digital skill-badge portal implemented with a frontend, Java Servlet backend, CGI verification handler, and MySQL database.

## Implemented backend

The current implementation includes:

| Purpose | Implementation | Endpoint |
| --- | --- | --- |
| Public badge verification | Java Servlet | `GET /api/verify?code=...` |
| Public badge verification | Python CGI | `GET /cgi-bin/verify.py?code=...` |
| Badge issuance | Java Servlet | `POST /api/badges/issue` |

Both the CGI and Servlet implementations perform the same badge verification lookup against the VERIFLY MySQL database.

The public `verify.html` page calls `/cgi-bin/verify.py` on the same host by default, so the frontend and CGI endpoint must be deployed under the same public web origin. If they are hosted separately, define `window.VERIFLY_VERIFY_ENDPOINT` before loading `js/verification.js` with the public CGI URL.

## Database

The backend uses MySQL database `verifly_db` with the following main tables:

- `students`
- `modules`
- `badges`

Database credentials are provided through environment variables and are not stored in the repository.

## Benchmark

A local 10-request test was performed using the same verification task.

| Implementation | Requests | Total Time | Average |
| --- | ---: | ---: | ---: |
| Java Servlet | 10 | 0.212 s | 0.0212 s/request |
| Python CGI | 10 | 0.989 s | 0.0989 s/request |

These measurements are specific to the local development environment and workload. They are included to illustrate the difference between the CGI and Servlet request-processing models.

## Running the backend

### Java Servlet

The Java backend is packaged as a WAR file using Maven and deployed on Apache Tomcat 10.

The database password is supplied through:

```bash
export VERIFLY_DB_PASSWORD="your_password"