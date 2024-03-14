# Ticket Reservation System

## 구현 사항

  - [x] 회원 가입 
    - POST /auth/login
      ```json
      {
        "email":"",
        "password": "",
        "role":"",
        "nickname":""
      }
      ```
  - [x] 로그인 
    - POST /users
      ```json
      {
        "email": "",
        "password": ""
      }
      ```
  - [x] 프로필 보기 
    - GET /users/:id
      ```json
      {}
      ```
  - [x] 공연 생성 
    - POST /users
      ```json
      {
        "title": "공연1",
        "startDate": "2020-04-16T08:15:00+00:00",
        "endDate": "2020-04-16T11:15:00+00:00",
        "price": 20000
      }
      ```
  - [x] 공연 목록 조회 
    - GET /performances
      ```json
      {}
      ```
  - [x] 공연 검색 
    - GET /performances?search=
      ```json
      {}
      ```
  - [x] 공연 상세 조회 
    - GET /performances/:id
      ```json
      {}
      ```
  - [x] 공연 예매 (좌석 선택 제외) 
    - POST /reservations/
      ```json
      {
        "performanceId": 0
      }
      ```
  - [x] 유저 예매 조회 
    - GET /reservations
      ```json
      {}
      ```