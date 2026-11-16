# REST API Backend

Простой REST API на Express и Sequelize.

## Установка

```bash
npm install
```

## Запуск

### Продакшн
```bash
npm start
```

### Разработка (с автоперезагрузкой)
```bash
npm run dev
```

Сервер будет доступен на `http://localhost:3000`

## API Endpoints

### Items

- **GET** `/api/items` - Получить все элементы
- **GET** `/api/items/:id` - Получить элемент по ID
- **POST** `/api/items` - Создать новый элемент
  ```json
  {
    "name": "Item Name",
    "description": "Description",
    "price": 99.99
  }
  ```
- **PUT** `/api/items/:id` - Обновить элемент
  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description",
    "price": 149.99
  }
  ```
- **DELETE** `/api/items/:id` - Удалить элемент
- **DELETE** `/api/items` - Удалить все элементы

### Health Check

- **GET** `/health` - Проверка статуса сервера

## База данных

Используется SQLite, файл базы данных: `database.db`

## Примеры запросов

### Создание элемента
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1299.99}'
```

### Получение всех элементов
```bash
curl http://localhost:3000/api/items
```

### Обновление элемента
```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Laptop","price":1399.99}'
```

### Удаление элемента
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

### Удалить все элементы
```bash
curl -X DELETE http://localhost:3000/api/items
```
