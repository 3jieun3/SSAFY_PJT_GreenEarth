package com.ssafy.greenEarth.interceptor;

import com.ssafy.greenEarth.jwt.JwtProperties;
import com.ssafy.greenEarth.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
public class AuthenticationInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("login interceptor preHandler 실행");

        String authHeader = request.getHeader(JwtProperties.HEADER_STRING);

        // Bearer 체크
        if (authHeader == null || !authHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            log.info("access token : {}", "null");
            throw new AuthenticationException("Access Token is null");
        }

        // Bearer 제외한 토큰값 추출
        String accessToken = authHeader.replace(JwtProperties.TOKEN_PREFIX, "");
        // 토큰 검증
        if (!StringUtils.hasText(accessToken)) {
            log.info("access token : {}", "null");
            throw new AuthenticationException("AccessToken 값이 비어있습니다.");
        }

        String msg = tokenProvider.isTokenValid(accessToken);
        log.info("access token : {}", msg);

        if (msg.equals("invalid")) {
            throw new AuthenticationException("AccessToken 값이 유효하지 않습니다.");
        } else if (msg.equals("expired")) {
            throw new AuthenticationException("AccessToken 기간이 만료되었습니다.");
        }

        // 토큰에서 사용자 id 와 role 추출하여 request body에 전달
        request.setAttribute("curUserId", tokenProvider.getCurrentUserId(accessToken));
        request.setAttribute("curUserRole", tokenProvider.getCurrentUserRole(accessToken));

        return true;
    }
}
