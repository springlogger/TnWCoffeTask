# TnWCoffeTask 

## Описание проекта  
TnWCoffeTask — это веб-приложение на **Nuxt 3 + TypeScript**, разработанное для управления задачами.  

---

## **Почему TypeScript?**  
1. **Безопасность типов** – помогает предотвратить ошибки во время разработки.  
2. **Улучшенный автокомплит** – повышает продуктивность.  
3. **Легкость рефакторинга** – код становится более поддерживаемым.  
4. **Строгая типизация API** – предотвращает некорректные запросы и ответы.  

---

## Развёртывание на PROD  
```sh
git clone <URL_репозитория>
cd <название_проекта>
npm install
```

## Сборка и запуск
```sh
npm run build
pm2 start .output/server/index.mjs --name tnw-coffee
pm2 save
pm2 startup
```

---

## (Опционально) Настройка NGINX
```sh
server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

```sh
sudo systemctl restart nginx
```

---

## Функции

- Фильтрация по статусу, приоритету и тегам

- Загрузка задач из API через $fetch (Pinia store)

- Динамическое изменение стилей (цвета, иконки)

- Выход из аккаунта

---

## Улучшения

- Подключение базы данных

- Авторизация через куки

- Адаптивный UI
