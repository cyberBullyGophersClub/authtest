# ���� ��� ������ jest + puppeteer

### ������ ���� ������:
```sh
$ cd authtest
$ npm test
```

### ������ ������ �����:
- jest auth.test.js

### ��� �������� �������:

- UI
`browser = await puppeteer.launch({headless: false});`
- headless �����
`browser = await puppeteer.launch({})`

## ���������� ���������
������������� ����
[Node.js](https://nodejs.org/en/download/)

������������� jest � puppeteer
```sh
$ npm i jest puppeter
```