# Pokemon API

REST API для управления покемонами с использованием Express и Sequelize.

## Установка

```bash
npm install
```

## Создание базы данных и заполнение примерами

```bash
node seeds.js
```

## Запуск сервера

**Разработка:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Сервер будет доступен на `http://localhost:3000`

## API Endpoints

### Получить всех покемонов
```
GET /api/pokemons
```

**Пример ответа:**
```json
[
  {
    "id": 1,
    "name": "Pikachu",
    "type": "Electric",
    "power": 85,
    "hp": 35,
    "createdAt": "2026-11-16T05:23:07.437Z",
    "updatedAt": "2026-11-16T05:23:07.437Z"
  }
]
```

### Получить одного покемона
```
GET /api/pokemons/:id
```

**Пример:** `GET /api/pokemons/1`

### Создать нового покемона
```
POST /api/pokemons
```

**Body:**
```json
{
  "name": "Mewtwo",
  "type": "Psychic",
  "power": 100,
  "hp": 106
}
```

**Требуемые поля:** name, type, power, hp

### Обновить покемона
```
PUT /api/pokemons/:id
```

**Body (все поля опциональны):**
```json
{
  "name": "Pikachu",
  "type": "Electric",
  "power": 90,
  "hp": 40
}
```

### Удалить покемона
```
DELETE /api/pokemons/:id
```

**Пример:** `DELETE /api/pokemons/1`

### Удалить всех покемонов
```
DELETE /api/pokemons
```

## Структура проекта

```
backend/
├── models/
│   └── Pokemon.js        # Модель покемона в БД
├── routes/
│   └── pokemons.js       # API маршруты
├── database.js           # Конфигурация Sequelize
├── server.js             # Запуск Express сервера
├── seeds.js              # Скрипт заполнения БД
└── package.json
```

## Поля покемона

- **id** (Integer) - Уникальный идентификатор
- **name** (String) - Название покемона (обязательно)
- **type** (String) - Тип покемона, например "Fire", "Water", "Electric" (обязательно)
- **power** (Integer) - Сила атаки (0-100, обязательно)
- **hp** (Integer) - Здоровье (1-500, обязательно)
- **createdAt** (DateTime) - Дата создания
- **updatedAt** (DateTime) - Дата последнего обновления

## Health Check

```
GET /health
```

**Ответ:**
```json
{
  "status": "OK"
}
```

## Примеры использования с curl

**Получить всех покемонов:**
```bash
curl http://localhost:3000/api/pokemons
```

**Создать покемона:**
```bash
curl -X POST http://localhost:3000/api/pokemons \
  -H "Content-Type: application/json" \
  -d '{"name":"Blastoise","type":"Water","power":92,"hp":79}'
```

**Обновить покемона:**
```bash
curl -X PUT http://localhost:3000/api/pokemons/1 \
  -H "Content-Type: application/json" \
  -d '{"power":90}'
```

**Удалить покемона:**
```bash
curl -X DELETE http://localhost:3000/api/pokemons/1
```
