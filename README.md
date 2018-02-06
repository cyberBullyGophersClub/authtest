# Тест для связки jest + puppeteer

### Запуск всех тестов:
```sh
$ cd authtest
$ npm test
```

### Запуск одного теста:
- jest auth.test.js

### Два варианта запуска:

- UI
`browser = await puppeteer.launch({headless: false});`
- headless режим
`browser = await puppeteer.launch({})`

## Подготовка окружения
Устанавливаем ноду
[Node.js](https://nodejs.org/en/download/)

Устанавливаем jest и puppeteer
```sh
$ npm i jest puppeter
```
