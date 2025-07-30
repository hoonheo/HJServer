// com.h2.web.controller.LoginController.java
package com.h2.web.controller;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // CORS 허용 (개발용)
public class LoginController {

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        if ("admin".equals(request.getUsername()) && "1234".equals(request.getPassword())) {
            return new LoginResponse("success", "로그인 성공", "fake-jwt-token");
        } else {
            return new LoginResponse("fail", "로그인 실패", null);
        }
    }

    @Getter
    @Setter
    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername(){return username;};
        public void setUsername(String name){ username= name;   };

        public String getPassword() { return password;  };
        public void setPassword(String pwd) { password = pwd;   };
    }

    @Data
    static class LoginResponse {
        private String status;
        private String message;
        private String token;

        public LoginResponse(String status, String message, String token) {
            this.status = status;
            this.message = message;
            this.token = token;
        }
    }
}
