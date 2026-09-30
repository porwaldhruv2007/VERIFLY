#!/usr/bin/env python3

import os
import json
import sys
from urllib.parse import parse_qs

import mysql.connector


def send_json(data, status="200 OK"):
    print(f"Status: {status}")
    print("Content-Type: application/json")
    print("Access-Control-Allow-Origin: *")
    print()
    print(json.dumps(data))


def main():

    query_string = os.environ.get("QUERY_STRING", "")
    params = parse_qs(query_string)

    code = params.get("code", [None])[0]

    if not code or not code.strip():
        send_json(
            {
                "valid": False,
                "message": "Verification code is required"
            },
            "400 Bad Request"
        )
        return

    code = code.strip()

    try:

        connection = mysql.connector.connect(
            host="127.0.0.1",
            port=3306,
            database="verifly_db",
            user=os.environ.get("VERIFLY_DB_USER", "root"),
            password=os.environ.get("VERIFLY_DB_PASSWORD")
        )

        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                b.verification_code,
                b.issued_at,
                s.student_id,
                s.name,
                s.email,
                m.module_id,
                m.title,
                m.category
            FROM badges b
            JOIN students s
                ON b.student_id = s.student_id
            JOIN modules m
                ON b.module_id = m.module_id
            WHERE b.verification_code = %s
        """

        cursor.execute(query, (code,))
        result = cursor.fetchone()

        if result:

            send_json(
                {
                    "valid": True,
                    "studentId": result["student_id"],
                    "student": result["name"],
                    "email": result["email"],
                    "moduleId": result["module_id"],
                    "badge": result["title"],
                    "category": result["category"],
                    "verificationCode": result["verification_code"],
                    "issuedAt": str(result["issued_at"])
                }
            )

        else:

            send_json(
                {
                    "valid": False,
                    "message": "Badge not found"
                },
                "404 Not Found"
            )

        cursor.close()
        connection.close()

    except Exception as error:

        print(
            "CGI error:",
            str(error),
            file=sys.stderr
        )

        send_json(
            {
                "valid": False,
                "message": "Internal server error"
            },
            "500 Internal Server Error"
        )


if __name__ == "__main__":
    main()
