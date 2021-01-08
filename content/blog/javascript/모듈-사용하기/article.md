---
title: "[Javascript] - 내보내고, 불러오기!"
date: 2020-09-01 12:21:13
category: "Javascript"
thumbnail: "./thumbnail.PNG"
color: "#F0DB4F"
excerpt: "ES6에서 추가된 새로운 방식의 모듈 사용법 소개"
draft: false
---

![thumbnail](./thumbnail.PNG)

## 1. 모듈 사용하기

재사용이 필요한 함수나 변수는 한번만 만들어놓고 여러 파일로 내보내서 사용할 수도 있는데요,  
오늘은 외부 파일로 함수나 변수를 내보내는 방법인 `export / import` 문법에 대해 알아보겠습니다.

## 2. export 사용하기

어떤 함수나 변수를 다른 파일에서도 사용해야 할 때가 자주 있습니다.

```javascript
// validation.js
const validator = {
  setValidMessage: command => `${command} 는 올바른 명령입니다.`,
  setInvalidMessage: command => `${command} 는 올바른 명령이 아닙니다.`,
}
```

위 **validator** 객체를 다른 파일에서도 사용하고 싶다면, `export` 선언을 추가해주면 됩니다.

```javascript
// validation.js
const validator = {
  // ... 위와 동일
}

// export 선언 추가
export { validator }
```

이렇게 객체나 변수에 `export` 선언을 붙여주면 해당 요소는 다른 파일에서 사용할 수 있다는 뜻으로, 이제 다른 파일에서도 `validator` 객체를 사용할 수 있습니다.

[예시]

```javascript
// validation.js
const validator = {
  setValidMessage: command => `${command} 는 올바른 명령입니다.`,
  setInvalidMessage: command => `${command} 는 올바른 명령이 아닙니다.`,
}

export { validator }
```

```javascript
// index.js
import { validator } from "./validation.js"

console.log(validator.setInvalidMessage("삭제"))
// 삭제 는 올바른 명령이 아닙니다.
```

> - 정리 : export { (내보낼 변수/함수명) } 을 사용하면 이를 다른 파일에서도 사용할 수 있다.

## 2. 1. 여러 값 내보내기

`export` 를 통해 내보내고자 하는 요소가 여럿이라면 요소를 선택적으로 내보내는 것도 가능합니다.

```javascript
function getName(name) {
  return `학생의 이름 : ${name}`
}

function getMajor(major) {
  return `학생의 전공 : ${major}`
}

function getGrade(grade, score) {
  return grade * score
}
```

위 모듈에서 `getName` 함수와 `getMajor` 함수만을 내보내고 싶다면, `export` 문을 이렇게 사용할 수 있습니다.

```javascript
function getName(name) {
  return `학생의 이름 : ${name}`
}

function getMajor(major) {
  return `학생의 전공 : ${major}`
}

function getGrade(grade, score) {
  return grade * score
}

// getName 과 getMajor 에 대해서만 내보내기를 수행함.
export { getName, getMajor }
```

간단하죠? 함수의 참조를 객체에 넣은 뒤 `export` 시켜주는 모습입니다.

> - 정리 : export { } 안에 여러 요소를 넣으면 여러 값을 내보낼 수도 있다.

## 2. 2. export default 선언

기본적인 `export` 에 대해 배웠으니 "내보내기 기본값" 에 대해 알아보겠습니다.

```js
import React, { useEffect } from "react"
```

리액트를 경험해보신 분이라면 이런 코드를 여러번 보셨을 텐데, 왜 `React` 는 `useEffect` 와 달리 중괄호로 감싸지 않고 사용할 수 있는 걸까요?

이는 "react" 라는 모듈에 내보내기 **기본값** 이 존재하기 때문인데요, 내보내기 기본값은 모듈에서 내보낼 개체가 하나만 존재하거나 내보내야 하는 가장 중요한 개체가 존재할 때 사용할 수 있습니다.

```javascript
function getName(name) {
  return `학생의 이름 : ${name}`
}

function getMajor(major) {
  return `학생의 전공 : ${major}`
}

function getGrade(grade, score) {
  return grade * score
}

// getName, getMajor 함수를 내보냄.
export { getName, getMajor }
// getGrade 함수는 내보내기 기본값임.
export default getGrade
```

`export default` 와 `export` 의 차이는 `import` 과정에서 제대로 드러납니다.

[예시]

```js
function getName(name) {
  return `학생의 이름 : ${name}`
}

function getMajor(major) {
  return `학생의 전공 : ${major}`
}

function getGrade(grade, score) {
  return `학생의 평점 : ${grade * score}`
}

// getName, getMajor 함수를 내보냄.
export { getName, getMajor }
// getGrade 함수는 내보내기 기본값임.
export default getGrade
```

```js
// index.js
import whatever, { getName, getMajor } from "./student.js"
// import getGrade, { getName, getMajor } from "./student.js";

console.log(getName("찬민")) // 학생의 이름 : 찬민
console.log(getMajor("소프트웨어")) // 학생의 전공 : 소프트웨어
console.log(whatever(3.0, 50)) // 학생의 평점 : 150
```

`export default` 로 내보낸 기본값은 우선 중괄호 안에 포함되지 않고, 어떤 이름으로든 사용될 수 있기 때문에 이렇게 요상한 이름으로 사용할 수도 있습니다. (물론 좋은 컨벤션이라고는 할 수 없겠죠?)

> - 정리 : 기본 내보내기는 중괄호를 사용하지 않으며, 어떤 이름으로든 불러올 수 있다.

## 2. 3. export 시 약간의 팁

함수를 내보낼 때는 `export` 선언을 함수 앞에 붙일 수도 있는데 이러면 코드 길이가 조금 짧아지는 효과가 있습니다.

```javascript
export function getName(name) {
  return `학생의 이름 : ${name}`
}

export const getMajor = major => {
  return `학생의 전공 : ${major}`
}

function getGrade(grade, score) {
  return grade * score
}

// 코드 하단에서 export 객체를 생성할 필요가 없다.
// export { getName, getMajor };
```

`export default` 를 사용할 때 역시 가능합니다.

```javascript
// student.js
export function getName(name) {
  return `학생의 이름 : ${name}`
}

export const getMajor = major => {
  return `학생의 전공 : ${major}`
}

export default function getGrade(grade, score) {
  return grade * score
}

// export { getName, getMajor };
// export default getGrade;
```

이렇게 `export` 를 함수 선언과 함께 사용하면 내보낼 함수를 하단에 따로 명시할 필요가 없어 코드 길이가 짧아지고 선언과 함께 내보낼 함수를 지정할 수 있다는 장점이 있습니다.

단, 이러면 어떤 함수가 `export` 될지 한번에 파악하기 어렵다는 단점이 있으므로 신중히 사용해야 합니다.

> - 정리 : 함수 선언과 동시에 `export` 를 붙여 사용하는 것도 가능하다.

## 3. import 사용하기

`export` 를 사용해 내보낸 값을 사용하기 위해 `import` 를 사용합니다.

```js
// index.js
import { validator } from "./validation.js"
```

`export` 를 통해 내보낸 함수나 변수는 위처럼 `import` 문을 통해 사용할 수 있습니다.  
하지만 몇 가지 규칙이 있는데요, 내보내는 파일에 있는 함수(변수)명과 불러오는 이름이 동일해야 하며 `export default` 를 제외한 나머지 요소를 불러올 때는 중괄호로 감싸야만 합니다.

## 3. 1. import 별칭 사용하기

원래 `export { 내보낼 값의 이름 }` 과 `import { 불러올 값의 이름 }`은 같아야 하지만, `as` 라는 키워드를 통해 불러올 값에 다른 이름을 붙일 수도 있습니다.

```js
// validation.js
const validator = {
  setValidMessage: command => `${command} 는 올바른 명령입니다.`,
  setInvalidMessage: command => `${command} 는 올바른 명령이 아닙니다.`,
}

export { validator }
```

```js
// index.js
import { validator as myModule } from "./validation.js"

console.log(myModule.setInvalidMessage("삭제"))
// 삭제 는 올바른 명령이 아닙니다.
```

## 3. 2. export default 값 불러오기

`export default` 를 통해 내보낸 값은 중괄호로 감싸지 않아도 되며, 어떤 이름으로 내보냈든 원하는 이름으로 불러올 수 있다는 특징이 있습니다.

```js
// validation.js
const validator = {
  setValidMessage: command => `${command} 는 올바른 명령입니다.`,
  setInvalidMessage: command => `${command} 는 올바른 명령이 아닙니다.`,
}

export default validator
```

```js
// index.js
import hello from "./validation.js"

console.log(hello.setInvalidMessage("삭제"))
// 삭제 는 올바른 명령이 아닙니다.
```

물론, 위에서도 한번 언급한 내용이지만 좋은 코딩 습관은 아닙니다!  
특별한 이유가 있는 경우가 아니라면 내보내는 이름과 불러오는 이름을 맞춰 주세요 :)

## 4. HTML의 &lt script &gt 태그에서 import 사용하기

HTML의 스크립트 태그 안에서 모듈을 사용하려 하면 이런 에러 메시지가 나타날 수 있습니다.

> <p style = "color : red; font-style:italic">Uncaught SyntaxError: Cannot use import statement outside a module</p>

원인은 `<script>` 가 참조하는 파일을 모듈로 인식하지 못하기 때문인데요, 해결법은 아주 간단합니다.

```javascript
// validation.js
const validator = {
  setValidMessage: command => `${command} 는 올바른 명령입니다.`,
  setInvalidMessage: command => `${command} 는 올바른 명령이 아닙니다.`,
}

export { validator }
```

```javascript
// index.js
import { validator } from "./validation.js"

console.log(validator.setInvalidMessage("삭제"))
```

```html
<!DOCTYPE html>
<head>
  <title>sample page</title>
</head>
<body>
    <script type = "module" src = "./index.js"></script>
</body>
</html>
```

위의 코드처럼 스크립트 태그에 `type` 이라는 속성을 추가하고 `module` 값을 부여하면 `<script>` 에서 참조하는 파일이 모듈임을 인식하게 되고, 이제 `import / export` 를 오류 없이 사용할 수 있게 됩니다.

> - 정리 : HTML 내에서 모듈을 사용할 때는 script 태그에 type = "module" 속성값을 추가해야 한다.

---

> 📖 참고

- [**모던 자바스크립트 튜토리얼**](https://ko.javascript.info/modules-intro#ref-296)
- 조 모건, 자바스크립트 코딩의 기술 (2019), 길벗
