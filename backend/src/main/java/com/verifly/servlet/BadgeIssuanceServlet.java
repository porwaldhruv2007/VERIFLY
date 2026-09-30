package com.verifly.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.UUID;

import com.verifly.db.DatabaseConnection;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/badges/issue")
public class BadgeIssuanceServlet extends HttpServlet {

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String studentId = request.getParameter("studentId");
        String moduleId = request.getParameter("moduleId");

        PrintWriter out = response.getWriter();

        if (studentId == null || moduleId == null
                || studentId.trim().isEmpty()
                || moduleId.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.println(
                    "{"
                    + "\"success\": false,"
                    + "\"message\": \"Student ID and Module ID are required\""
                    + "}"
            );

            return;
        }

        String verificationCode =
                "WX-" + moduleId.substring(3) + "-"
                + UUID.randomUUID()
                        .toString()
                        .substring(0, 5)
                        .toUpperCase();

        String sql =
                "INSERT INTO badges "
                + "(student_id, module_id, verification_code) "
                + "VALUES (?, ?, ?)";

        try (
                Connection connection =
                        DatabaseConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(
                                sql,
                                PreparedStatement.RETURN_GENERATED_KEYS
                        )
        ) {

            statement.setString(1, studentId.trim());
            statement.setString(2, moduleId.trim());
            statement.setString(3, verificationCode);

            int rowsInserted = statement.executeUpdate();

            if (rowsInserted == 1) {

                int badgeId = 0;

                try (ResultSet keys =
                             statement.getGeneratedKeys()) {

                    if (keys.next()) {
                        badgeId = keys.getInt(1);
                    }
                }

                out.println(
                        "{"
                        + "\"success\": true,"
                        + "\"badgeId\": " + badgeId + ","
                        + "\"studentId\": \"" + studentId + "\","
                        + "\"moduleId\": \"" + moduleId + "\","
                        + "\"verificationCode\": \""
                        + verificationCode + "\""
                        + "}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                out.println(
                        "{"
                        + "\"success\": false,"
                        + "\"message\": \"Badge could not be issued\""
                        + "}"
                );
            }

        } catch (Exception e) {

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.println(
                    "{"
                    + "\"success\": false,"
                    + "\"message\": \""
                    + e.getMessage().replace("\"", "'")
                    + "\""
                    + "}"
            );

            e.printStackTrace();
        }
    }
}