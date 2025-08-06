# Page Parser

## 📝 Краткое описание

Этот проект — простой HTML-парсер, который извлекает метаинформацию и пользовательские отзывы с веб-страницы. Результатом является структурированный JSON-объект, пригодный для анализа, тестирования или импорта в другие приложения.

## ✨ Функциональность

- Извлечение мета-тегов:
  - `title`, `description`, `keywords`
  - `lang`, `charset`
  - Open Graph (`og:title`, `og:image`, `og:type`)
- Сбор отзывов с данными:
  - Рейтинг (по заполненным звёздочкам)
  - Автор (имя и аватар)
  - Заголовок отзыва, текст и дата
- Обработка данных с очисткой и нормализацией
- Поддержка автотестов для проверки соответствия структуры

## ✅ Пример результата

```json
{
  "title": "About Vite",
  "description": "...",
  "keywords": ["Vite", "web development", "..."],
  "language": "en",
  "charset": "UTF-8",
  "opengraph": {
    "title": "About Vite",
    "image": "./assets/logo.svg",
    "type": "website"
  },
  "reviews": [
    {
      "rating": 2,
      "author": {
        "avatar": "https://placehold.co/48/424242/white.svg?text=1",
        "name": "author"
      },
      "title": "title",
      "description": "desc",
      "date": "15.09.2024"
    }
    // ...
  ]
}
```

## 🛠️ Используемые технологии

- HTML5 (разметка страницы)
- JavaScript (парсинг и логика)
- [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- Тестирование через консоль браузера

## 🚀 Установка и запуск

1. Клонируй репозиторий:
   ```bash
   git clone https://github.com/your-username/meta-reviews-parser.git
   ```
2. Запусти Live Server или открой index.html в браузере.
3. Посмотри результат в консоле.
