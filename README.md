## Usage

RESTful методы - GET, PUT, POST, DELETE :

### GET (Read)

**Чтение обращений**

`GET => {server}/claim`

`GET => {server}/claim/{id}`

`GET => {server}/claim?offset=0&limit&=10`

**Чтение пользователей**

`GET => {server}/user`

`GET => {server}/user/{id}`

`GET => {server}/user?offset=0&limit&=10`

### POST (Create)

**Создание обращения**

`POST => {server}/claim`

Пример отправляемых данных:

`{"title":"some title","description":"some description","type":"some type (Software)"}`

**Создание пользователя**

`POST => {server}/user`

Пример отправляемых данных:

`{"fullName": "some name","email": "some email","password": "some password", role: "some role (admin, work)"}`

**Регистрация пользователя**

`POST => {server}/auth/registration`

Пример отправляемых данных:

`{"fullName": "some name","email": "some email","password": "some password"}`

**Авторизация пользователя**

`POST => {server}/auth/login`

Пример отправляемых данных:

`{"email": "some email","password": "some password"}`

### PUT (Update)

**Обновление обращения**

`PUT => {server}/claim/{id}`

Пример отправляемых данных:

`{"title":"some title","description":"some description","type":"some type (Hardware)","status": "some status (NEW)"}`

Примечание:

`свойство "status" может изменить только пользователь с ролью "admin"`

**Обновление пользователя**

`PUT => {server}/user/{id}`

Пример отправляемых данных:

`{"fullName": "some name","email": "some email","password": "some password", role: "some role (admin, work)"}`

### DELETE (Delete)

**Удаление обращения**

`DELETE => {server}/claim/{id}`

**Удаление пользователя**

`DELETE => {server}/user/{id}`