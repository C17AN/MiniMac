---
title: "[Javascript] - 자바스크립트 파일을 비동기로 불러오기"
date: 2020-12-18 12:21:13
category: "Javascript"
excerpt: "async, defer 속성을 사용해 비동기로 스크립트 불러오기"
color: "#F0DB4F"
draft: false
---

아마 처음 HTML을 배우신 분들 중에서는 자바스크립트 파일을 추가할 때 `<body>` 태그를 닫기 전에 추가하라고 배운 분들도 계실 것입니다.  
물론 절대 틀린 방법은 아니지만, 브라우저는 HTML 코드를 위에서 아래로 읽어나가기 때문에 이렇게 파일을 불러오면 약간의 시간 손해를 보게 됩니다.

```js
// app.js
let div = document.getElementById("main")
let dummies = document.querySelectorAll(".dummies")
setTimeout(() => {
  div.innerHTML = "Hello, Chanmin!"
  for (dummy of dummies) {
    dummy.innerHTML = ""
  }
}, 5000)
```

```html
<!-- index.html -->
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
  </head>
  <body>
    <div id="main">Hello, world!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
    <script src="./app.js"></script>
  </body>
</html>
```

예를 들면 브라우저는 위 코드를 해석하면서 `<script>` 태그를 만나는 순간 자바스크립트 파일을 불러온 후 실행하는데요, 따라서 스크립트 파일을 실행하는데 걸리는 시간은 **HTML 파싱 시간 + 스크립트 로딩 시간 + 스크립트 실행 시간**이 됩니다.

따라서 지금처럼 HTML이 짧은 경우라면 몰라도 프로젝트가 커지면서 HTML과 스크립트 파일의 용량이 커지면 결국 스크립트를 로딩하기까지 더 많은 시간이 낭비되고, 더군다나 웹 서버에 배포될 경우에는 이보다 더 많은 시간을 낭비하게 됩니다.

```html
<!-- index.html -->
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
    <script src="./app.js"></script>
  </head>
  <body>
    <div id="main">Hello, world!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
  </body>
</html>
```

그럼 이렇게 `<head>` 태그 안에서 스크립트를 불러오면 어떨까요?  
브라우저는 스크립트 태그를 더 일찍 불러와 읽기 시작하겠지만 아쉽게도 스크립트가 실행되는 시점이 `<body>` 태그의 요소들을 읽기 전이기 때문에 오류가 출력됩니다.

```js
// app.js
let div = document.getElementById("main")
let dummies = document.querySelectorAll(".dummies")
setTimeout(() => {
  // HTML을 읽기 전에 스크립트를 실행했으므로 오류가 발생합니다.
  // Uncaught TypeError: Cannot set property 'innerHTML' of null
  div.innerHTML = "Hello, Chanmin!"
  for (dummy of dummies) {
    dummy.innerHTML = ""
  }
}, 5000)
```

다행히도 HTML을 개발할 때 이런 고민도 염두에 두었던 건지 스크립트 파일을 더 멋지게 불러오는 방법이 존재합니다.

## 1. defer 속성을 통해 자바스크립트 파일 불러오기

첫 번째 방법은 스크립트 태그의 `defer` 속성입니다.  
'미루다' 라는 단어의 뜻처럼 `defer` 속성을 사용하면 스크립트 실행을 뒤로 미루게 되는데요, 여기서 엄청난 일이 벌어집니다.

```html
<!-- index.html -->
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
    <script src="./app.js" defer></script>
  </head>
  <body>
    <div id="main">Hello, world!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
  </body>
</html>
```

바로 이전에 보았던 것처럼 `<head>` 영역에서 스크립트를 불러와 봅시다.  
`<body>` 부분의 HTML은 아직 읽지 않았으니 원래대로면 오류가 출력되는 코드지만, 여기서 `defer` 가 마법을 부리기 시작합니다.

브라우저가 HTML을 해석하는 중 `defer` 속성을 가진 스크립트 태그를 만나면 스크립트를 바로 불러오기 시작하지만 실제 실행은 HTML을 다 읽은 후에 이루어집니다.  
따라서 실제 스크립트의 실행 시간은 **max(HTML 파싱 시간, 스크립트 로딩 시간) + 스크립트 실행 시간** 이 되는데요, 이러면 시간적으로 이득일 뿐만 아니라 `<body>` 내에서 실제 마크업만을 신경쓸 수 있게 된다는 장점도 있습니다.

## 2. async 속성을 통해 자바스크립트 파일 불러오기

`defer` 처럼 비동기적으로 자바스크립트 파일을 불러오지만 동작 방식이 다른 `async` 라는 속성도 있습니다.

```html
<!-- index.html -->
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
    <script src="./app.js" async></script>
  </head>
  <body>
    <div id="main">Hello, world!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
    <div class="dummies">I am dummy!</div>
  </body>
</html>
```

`async` 속성은 `defer`와 마찬가지로 스크립트를 만나자마자 불러오기 시작하지만, 스크립트의 로딩이 끝난 즉시 실행된다는 점이 다릅니다.  
따라서 브라우저가 HTML을 모두 읽기 전에 스크립트가 실행될 수 있기 때문에 **DOM을 조작하는 코드에는 부적합하지만** 날짜나 시간 데이터를 불러오는 등 백그라운드 로직의 빠른 수행이 필요할 때 로딩 시간을 단축할 수 있습니다.
