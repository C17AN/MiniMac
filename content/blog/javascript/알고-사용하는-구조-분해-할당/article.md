---
title: "[Javascript] - 해체하고 할당하는 구조 분해 할당"
date: 2020-08-23 12:21:13
category: "Javascript"
excerpt: "ES6에서 새로 추가된 비구조화 할당 문법 정리"
thumbnail: "./Velkoz.jpg"
color: "#F0DB4F"
draft: false
---

![velkoz](./Velkoz.jpg)

<div style = "text-align: center; margin-bottom: 1rem; font-size: 0.8rem">해체하고, 분해한다!</div>

구조 분해 할당*(destructuring assignment)* 은 ES6에서 가장 호평받는 기능들 중 하나로, 구조 분해 할당을 사용하면 객체나 배열에 담긴 요소들을 쉽게 변수로 추출해 사용할 수 있습니다.

그러나 구조 분해 할당은 객체에 사용될 때와 배열에 사용될 때 그 기능이 다른데요, 오늘은 두 동작의 차이를 알아보도록 하겠습니다.

## 1. 객체의 구조 분해 할당

객체의 구조 분해 할당을 사용한 예시 :

```javascript
const siteData = {
  author: "찬민",
  framework: "Gatsby",
  version: "3.1.2",
}

const { author, framework, version } = siteData
console.log(`Written By ${author}`) // "Written By 찬민"
```

`siteData` 의 프로퍼티 값들을 프로퍼티 이름과 동일한 변수에 담아 사용할 수 있게 된 모습입니다.

```javascript
const siteData = {
  author: "찬민",
  framework: "Gatsby",
  version: "3.1.2",
}

const { author: name, framework, version } = siteData
console.log(`Written By ${name}`) // "Written By 찬민"
```

만약 변수명을 프로퍼티와 다른 이름으로 하고 싶다면 `{프로퍼티명: 변수명} = 대입할 객체` 의 형태로 사용할 수도 있습니다.

```javascript
const siteData = {
  author: "찬민",
  framework: "Gatsby",
  version: "3.1.2",
  category: {
    web: true,
    javascript: true,
    git: true,
  },
}

const {
  author,
  framework,
  version,
  category: { web },
} = siteData
console.log(web) // true
```

또한 중첩된 객체 내 속성값을 추출하기 위해서는 대입 연산자 좌측의 객체와 대입하는 객체가 동일한 중첩 구조를 가져야 합니다.

## 2. 배열의 구조 분해 할당

배열의 구조 분해 할당은 객체와 다른 방식으로 동작합니다.

객체의 분해 할당에서는 속성명과 동일한 변수에 그 속성명에 대응하는 값을 대입했다면,  
배열의 분해 할당에서는 배열 내부에서 할당을 받는 변수의 인덱스에 대응하는 값을 대입합니다.

```js
const height = [178, 164, 182]

const [chanmin, heejin, junyeong] = height
console.log(chanmin) // 178
console.log(heejin) // 164
console.log(junyeong) // 182
```

위 코드에서도 `height`의 첫 번째 요소가 대입을 받는 익명 배열의 첫 번째 요소에 대입된 것을 확인할 수 있는데, 이런 특징 때문에 배열의 구조 분해 할당에서는 대입 순서가 매우 중요합니다.

잘못된 인덱스에 대입한 예시 :

```js
const infoList = ["찬민", "3.1.2", "즐겁게, 음악"]

const [title, version, author] = infoList
// 잘못된 대입 순서로 인해 제목과 저자가 바뀐 상황
console.log(author) // "즐겁게 음악" -> author = infoList[2]
console.log(title) // "찬민" -> -> author = infoList[0]
```

또한 대입 연산자 왼쪽의 할당을 받는 값이 반드시 독립된 변수일 필요는 없으며, 할당을 받을 수 있는 것이라면 무엇이든 대입 연산자의 왼쪽에 올 수 있습니다.

예시 :

```js
const height = [178, 164, 182]

const chanmin = {}
const heejin = {}
const junyeong = {}
;[chanmin.height, heejin.height, junyeong.height] = height

console.log(chanmin.height) // 178
console.log(heejin.height) // 164
console.log(junYeong.height) // 182
```

## 3. 구조 분해 할당과 나머지 연산자

`...` 를 붙인 매개변수를 사용하면 앞쪽에 위치한 요소 몇 개만 가져오고 나머지 요소는 한 변수에 통째로 저장할 수도 있습니다.

이번에도 배열인지 객체인지에 따라 동작이 달라지는데요, 먼저 객체의 분해 할당 예시를 살펴보겠습니다.

```js
const siteData = {
  author: "찬민",
  framework: "Gatsby",
  version: "3.1.2",
  visitor: 122,
  about: "tech",
}

const { author, ...metaData } = siteData
console.log(author) // "찬민"
console.log(metaData.about) // "tech"
```

위 코드에서는 `siteData` 객체의 프로퍼티 중 `author` 속성의 값만을 사용하고 나머지 프로퍼티는 `metaData` 라는 새로운 객체에 할당한 모습입니다.

---

다음은 배열의 구조 분해 할당에서 나머지 연산자를 사용하는 모습입니다.

```js
const height = [178, 164, 182, 194, 175, 162]

const chanmin = {}
const heejin = {}
const junyeong = {}
;[chanmin.height, heejin.height, junyeong.height, ...heights] = height
console.log(heights) // [194, 175, 162]
```

`chanmin`, `heejin`, `junyeong` 의 `height` 속성에만 값을 대입하고 나머지 값들은 `heights` 라는 새로운 배열에 저장합니다.

## 4. 요약

- #### 객체의 구조 분해 할당

```js
const { prop1: varName, prop2, ...rest } = object // object 는 대입하는 객체
```

1. `object` 의 프로퍼티 중 `prop1` 속성에 해당하는 값은 `varName` 이라는 이름의 변수에 할당됩니다.
2. `object` 의 프로퍼티 중 `prop2` 속성에 해당하는 값은 `prop2` 라는 이름의 변수에 할당됩니다.
3. `object` 의 프로퍼티 중 `prop1`, `prop2` 속성을 제외한 값은 `rest` 라는 이름의 객체에 할당됩니다.

---

- #### 배열의 구조 분해 할당

```js
let [item1, item2, ...rest] = array // array 는 대입하는 배열
```

1. `array` 의 첫 번째 요소는 `item1`, 두 번째 요소는 `item2` 변수에 할당됩니다.
2. 할당이 이루어지지 않은 나머지 요소들은 `rest` 라는 이름의 배열에 할당됩니다.

---

> 참고 : [모던 자바스크립트 튜토리얼](https://ko.javascript.info/destructuring-assignment)
