# ECHO

master
[![pipeline status](https://git.dimigo.in/echo/echo-backend/badges/master/pipeline.svg)](https://git.dimigo.in/echo/echo-backend/commits/master)
[![coverage report](https://git.dimigo.in/echo/echo-backend/badges/master/coverage.svg)](https://git.dimigo.in/echo/echo-backend/commits/master)

develop
[![pipeline status](https://git.dimigo.in/echo/echo-backend/badges/develop/pipeline.svg)](https://git.dimigo.in/echo/echo-backend/commits/develop)
[![coverage report](https://git.dimigo.in/echo/echo-backend/badges/develop/coverage.svg)](https://git.dimigo.in/echo/echo-backend/commits/develop)

code formatter
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

# 에코 백엔드

> ## info
>
> node.js
>
> - express
>
> ## 계획
>
> master : 배포된 마지막 버전
>
> develop : 개발 최신버전 (테스트 빌드)

---

## 돌아가고 있는 거 확인하기

> ```
> docker ps
> docker logs dev
> docker logs dev-api.echo.dimigo.in
> ```

## 도커에 접속해 보기

> ```
> docker exec -it dev-api.echo.dimigo.in /bin/bash
> ```

---

참고

```
jwt에 rs256알고리즘을 사용할건데 키 잘 못만들겠으면 example 쓰셈(로컬에서만)
```
