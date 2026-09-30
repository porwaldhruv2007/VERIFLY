package com.verifly.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.verifly.db.DatabaseConnection;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/verify")
public class VerifyServlet extends HttpServlet {

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String code = request.getParameter("code");

        PrintWriter out = response.getWriter();

        if (code == null || code.trim().isEmpty()) {

            out.println(
                "{"
                + "\"valid\": false,"
                + "\"message\": \"Verification code is required\""
                + "}"
            );

            return;
        }

        String sql =
            "SELECT "
            + "b.verification_code, "
            + "b.issued_at, "
            + "s.student_id, "
            + "s.name, "
            + "s.email, "
            + "m.module_id, "
            + "m.title, "
            + "m.category "
            + "FROM badges b "
            + "JOIN students s ON b.student_id = s.student_id "
            + "JOIN modules m ON b.module_id = m.module_id "
            + "WHERE b.verification_code = ?";

        try (
            Connection connection =
                DatabaseConnection.getConnection();

            PreparedStatement statement =
                connection.prepareStatement(sql)
        ) {

            statement.setString(1, code.trim());

            try (ResultSet result = statement.executeQuery()) {

                if (result.next()) {

                    out.println(
                        "{"
                        + "\"valid\": true,"
                        + "\"studentId\": \"" + result.getString("student_id") + "\","
                        + "\"student\": \"" + result.getString("name") + "\","
                        + "\"email\": \"" + result.getString("email") + "\","
                        + "\"moduleId\": \"" + result.getString("module_id") + "\","
                        + "\"badge\": \"" + result.getString("title") + "\","
                        + "\"category\": \"" + result.getString("category") + "\","
                        + "\"verificationCode\": \"" + result.getString("verification_code") + "\","
                        + "\"issuedAt\": \"" + result.getTimestamp("issued_at") + "\""
                        + "}"
                    );

                } else {

                    out.println(
                        "{"
                        + "\"valid\": false,"
                        + "\"message\": \"Badge not found\""
                        + "}"
                    );
                }
            }

        } catch (Exception e) {

    response.setStatus(
        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
    );

    out.println(
        "{"
        + "\"valid\": false,"
        + "\"message\": \""
        + e.getMessage().replace("\"", "'")
        + "\""
        + "}"
    );

    e.printStackTrace();
}
    }
}