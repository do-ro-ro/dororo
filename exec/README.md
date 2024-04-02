# 🚙DORORO 포팅 매뉴얼

## 목차

1. 환경 설정
2. 배포
3. 외부 서비스 정보
4. 시연 시나리오

---

## 1. 환경 설정

### Docker 설치

### Set up the repository

1. Update the `apt` package index and install packages to allow `apt` to use a repository over HTTPS:

```
$ sudo apt update
$ sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

2. Add Docker's official GPG key

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

3. Use the following command to set up the repository

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
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

### Nginx 설치

```
$ sudo apt-get install nginx
```

### Encrypt(SSL 발급)

```
$ sudo apt-get install letsencrypt
$ sudo letsencrypt certonly --standalone -d [도메인]
```

---

### 환경변수 형태

---------React------------

.env 내 환경변수 설정

```
"VITE_TMAP_API_KEY=''" > .env
echo "VITE_KAKAOMAP_API_KEY=''" >> .env
echo "VITE_KAKAOMAP_REST_API_KEY=''" >> .env
```

---------Spring------------

application.yml 내 환경변수 설정

```
spring:
  profiles:
    active: ${profile}
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
    format_sql: true
    use_sql_comments: true
  jackson:
    date-format: yyyy-MM-dd'T'HH:mm:ss
    time-zone: UTC
springdoc:
  packages-to-scan: com.ssafy.server.controller
  default-consumes-media-type: application/json;charset=UTF-8
  default-produces-media-type: application/json;charset=UTF-8
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /api/
    disable-swagger-default-url: true
    display-request-duration: true
    operations-sorter: alpha
logging:
  level:
    root: info
    org:
      hibernate:
        type:
          descriptor:
            sql: trace
```

application-{profile}.yml 내 환경변수 설정

```
secret-key: {key}
spring :
  data:
    redis:
      host: j10e202.p.ssafy.io
      port: 6379
  security:
    oauth2:
      client:
        registration:
          naver:
            client-id: {id}
            client-secret: {key}
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
    url: jdbc:postgresql://j10e202.p.ssafy.io:5432/{db_name}
    username: postgres
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
      bucket: ssafy-dororo
    stack:  # AWS CloudFormation 스택과 연동하여 리소스의 자동 감지 및 구성을 활성화 할 지 여부. false는 CloudFormation 스택을 통한 리소스 관리나 자동 감지를 사용하지 않겠다는 의미
      auto: false
    credentials:
        access-key: {key}
        secret-key: {key}
```

### Ignore 파일 및 생성파일 위치

---

### 2. 배포

---

### 3. 외부 서비스 정보

---

### 4. 시연 시나리오
