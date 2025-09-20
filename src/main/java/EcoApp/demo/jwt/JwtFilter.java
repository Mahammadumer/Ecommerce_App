package EcoApp.demo.jwt;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class JwtFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String path = req.getRequestURI();
        if (path.equals("/login") || 
    		path.equals("/signup") || 
    		path.equals("/admin/login")) { // Skip login endpoint
            chain.doFilter(request, response);
            return;
        }

        String authHeader = req.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String token = authHeader.substring(7);
        try {
            Map<String, Object> claims = JwtUtil.validateToken(token);
            String username = (String) claims.get("sub"); // subject is username
            String role = (String) claims.get("role");
            
            if (!role.equals("admin") && path.startsWith("/products/admin")){
            	res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            	return;
            }
            // Save claims in request attributes for use in controllers
            req.setAttribute("username", username);
            
            
            req.setAttribute("role", role);

            chain.doFilter(request, response);
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}