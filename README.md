## Usage

RESTful методы - GET, PUT, POST, DELETE :

### GET (Read)

**Чтение обращений**

`GET => {server}/claim`

`GET => {server}/claim/{id}`

`GET => {server}/claim?offset=0&limit=10&search=text&column=title&sort=desc`

##### Параметры

- offset `смещение от начала коллекции обращений`
- limit `лимит обращений`
- search `строка поиска`
- column `title | description | type | status`
- sort `asc | desc`

**Чтение пользователей**

`GET => {server}/user`

`GET => {server}/user/{id}`

`GET => {server}/user?offset=0&limit=10search=text&column=fullName&sort=desc`

##### Параметры

- offset `смещение от начала коллекции пользователей`
- limit `лимит пользователей`
- search `строка поиска`
- column `fullName | email`
- sort `asc | desc`

**Чтение типов обращений**

`GET => {server}/types`

**Чтение статусов обращений**

`GET => {server}/status`

**Чтение ролей пользователя**

`GET => {server}/roles`

### POST (Create)

**Создание обращения**

`POST => {server}/claim`

Пример отправляемых данных:

`{"title":"some title", "description":"some description", "type": type.slug, "status": status.slug}`

**Создание пользователя**

`POST => {server}/user`

Пример отправляемых данных:

`{"fullName": "some name","email": "some email","password": "some password", role: role.slug}`

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

`{"title":"some title","description":"some description","type": type.slug,"status": status.slug}`

Примечание:

`свойство "status" может изменить только пользователь с ролью "admin"`

**Обновление пользователя**

`PUT => {server}/user/{id}`

Пример отправляемых данных:

`{"fullName": "some name","email": "some email","password": "some password", role: role.slug}`

### DELETE (Delete)

**Удаление обращения**

`DELETE => {server}/claim/{id}`

**Удаление пользователя**

`DELETE => {server}/user/{id}`