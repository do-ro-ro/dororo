# 🚙 DORORO PORTING MANUAL

## 목차

1. 환경 설정
2. 배포
3. 외부 서비스
4. 시연 시나리오

## 1. 환경 설정

### Nginx 설치

```jsx
$ sudo apt-get install nginx
```

### **Encrypt(SSL 발급)**

```jsx
$ sudo apt-get install letsencrypt
$ sudo letsencrypt certonly --standalone -d [도메인]
```

### Docker 설치

### Set up the repository

1. Update the `apt` package index and install packages to allow `apt` to use a repository over HTTPS:

```
$ sudo apt-get update
$ sudo apt-get install \\
    ca-certificates \\
    curl \\
    gnupg \\
    lsb-release
```

2. Add Docker's official GPG key

```
$ sudo install -m 0755 -d /etc/apt/keyrings
$ sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

3. Use the following command to set up the repository

```
$ echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] <https://download.docker.com/linux/ubuntu> \\
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Install Docker Engine

1. Update the apt package index

```
$ sudo apt-get update
```

2. Install Docker Engine, containerd, and Docker Compose

```
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

### Install PostgreSQL

### Install redis

### 환경변수 형태

```jsx
---------React---------
.env 내 환경변수 설정

VITE_TMAP_API_KEY='{key}'
VITE_KAKAOMAP_API_KEY='{key}'
VITE_KAKAOMAP_REST_API_KEY='{key}'

---------Spring---------
application.yml 내 환경변수 설정

spring :
    profiles:
        active: ${profile}
    output:
        ansi:
            enabled: ALWAYS
    servlet:
        multipart:
            max-file-size: 50MB
            max-request-size: 50MB
#logging
logging:
    level:
        root: info
        org:
            hibernate:
                orm:
                    jdbc:
                        bind: trace
    pattern:
        file: "%d %-5level [%thread] %logger : %msg%n"
#swagger
springdoc:
    packages-to-scan: com.dororo.api
    default-consumes-media-type: application/json;charset=UTF-8
    default-produces-media-type: application/json;charset=UTF-8
    api-docs:
        path: /api/api-docs
    swagger-ui:
        path: /api/docs # Swagger 페이지로 접속할 경로
        disable-swagger-default-url: true   # 기본 페이지로 리디렉션 되지 않게 하는 설정입니다
        operations-sorter: alpha    # API를 엔드 포인트들의 알파벳 순서로 정렬
        enabled: true   # 외부에서 접속 가능하게 하는 설정


application-{profile}.yml 내 환경변수 설정
secret-key: {secret-key}
spring :
  data:
    redis:
      host: {host-url}
      port: 6379
  security:
    oauth2:
      client:
        registration:
          naver:
            client-id: {id}
            client-secret: {secret}
            redirect-uri: '{baseUrl}/oauth2/callback/naver'
            authorization-grant-type: authorization_code
            scope: name
        provider:
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://{domain/db-name}
    username: {username}
    password: {password}
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: none
      format_sql: true
      jdbc:
        lob:
          non_contextual_creation: true
    database: postgresql
    database-platform: org.hibernate.spatial.dialect.postgis.PostgisPG95Dialect
cloud:
  aws:
    region:
      static: ap-northeast-2
      auto: false # 자동 region 탐지 옵션. false로 설정했으므로 위의 ap-northeast-2(서울 region)으로 적용 됨
    s3:
      bucket: {bucket-name}
    stack:  # AWS CloudFormation 스택과 연동하여 리소스의 자동 감지 및 구성을 활성화 할 지 여부. false는 CloudFormation 스택을 통한 리소스 관리나 자동 감지를 사용하지 않겠다는 의미
      auto: false
    credentials:
        access-key: {key}
        secret-key: {key}
```

## 2. 배포

---

## 3. 외부 서비스

---

## 4. 시연 시나리오
