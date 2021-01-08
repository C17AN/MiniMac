---
title: "[Typescript] - 나의 타입스크립트 입문기"
date: 2020-09-07 12:21:13
category: "Typescript"
thumbnail: "./thumbnail.PNG"
color: "#007acc"
excerpt: "타입스크립트 소개 및 처음 써본 소감"
draft: false
---

![thumbnail](./thumbnail.PNG)

## 1. 타입스크립트는 자바스크립트의 "확장팩"

타입스크립트는 자바스크립트와 다른 새로운 언어가 아니라, 자바스크립트를 보다 쉽고 안전하게 다루도록 도와주는 **Superset** 입니다.

타입스크립트는 왜 쉽고 안전하다는 걸까요?  
여기 간단한 코드가 있습니다.

```js
function add(num1, num2) {
  return num1 + num2
}
```

입력받은 두 수를 더하는 간단한 함수네요.  
그런데 여기에 언제나 숫자가 들어간다는 보장이 없다면 이런 골치아픈 일이 생길 수도 있습니다.

```js
function add(num1, num2) {
  return num1 + num2
}

console.log(add("2", "3")) // "23"
```

물론 예외처리를 위한 코드를 추가로 작성해 이 문제를 해결할 수 있습니다.

```js
function add(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2
  } else {
    return +num1 + +num2
  }
}

console.log(add("2", "3")) // 5
```

하지만 고작 두 수의 합을 구하기 위해 이런 코드를 작성하는건 필요하면서도 비효율적인 작업입니다.  
게다가 "123" 처럼 숫자 형태의 문자열이 아니라 "가나다" 같은 문자열을 만난다면 또다른 예외를 처리해야 하고요.

위처럼 타입과 관련된 끝도 없는 예외처리와 에러가 지긋지긋하다면, 이제 타입스크립트를 배울 때가 된겁니다.

## 2. 타입스크립트 설치 & 사용하기

1. `$ npm install -g typescript` 명령어로 타입스크립트 **컴파일러** 를 시스템 환경에 설치해 주세요.
2. 타입스크립트 코드를 작성한 후 `$ tsc 파일명` 을 실행하면, 컴파일된 자바스크립트 코드를 얻을 수 있습니다.

간단하죠?

한번 빈 폴더에 `index.ts` 라는 파일을 만든 후, `add` 함수를 똑같이 만들어보세요.

```js
function add(num1, num2) {
  return num1 + num2
}
console.log(add("2", "3"))
```

똑같은 코드지만 인자 `num1`과 `num2` 밑에 <span style = "color:red;">빨간 줄</span>이 그어진걸 확인할 수 있을 것입니다.  
오류를 제거하기 위해서는 매개변수의 타입이 필요한데요, 이 함수가 숫자의 합을 구하도록 숫자형을 붙여봅시다.

```js
function add(num1: number, num2: number) {
  return num1 + num2
}
console.log(add("2", "3"))
```

이제는 `add()` 함수의 매개변수 "2" 와 "3" 에 빨간 줄이 그어졌을 것입니다.

"2"와 "3"에 빨간 줄이 그어진 이유는 매개변수를 `number` 형으로 받도록 타입을 지정해주었기 때문인데요, 이 상태에서 컴파일을 시도하면 아래의 타입 오류 메시지를 출력합니다.

> index.ts:5:17 - error TS2345: Argument of type '"2"' is not assignable to parameter of type 'number'.

오류를 제거하려면 매개변수를 숫자 타입으로 바꿔야만 하는데요, 오류를 해결해준 다음 `$ tsc index.ts` 명령어를 통해 컴파일을 마치면 `index.js` 라는 자바스크립트 코드를 얻게 됩니다.

그리고 이 코드에는 이렇게 적혀 있습니다.

```js
function add(num1, num2) {
  return num1 + num2
}
console.log(add(2, 3))
```

어디서 많이 본, 우리의 `add` 함수네요.

## 3. 정리 및 감상

저는 타입스크립트를 일종의 실험실과 비슷하다고 느꼈습니다.

그 실험실 안에서 변수에 올바른 타입이 들어가 있는지, 이 객체는 정해진 속성만을 가지고 있는지, 이 함수의 매개변수 타입은 어떻게 되는지를 모두 테스트한 후에 문제가 없으면 자바스크립트 파일로 내보내는 거죠.

한때는 느슨한 타입 검사를 장점으로 내세웠던 자바스크립트가 타입을 사용하는 언어로 돌아오려는 모습이 낯설긴 하지만, 그래도 계속해서 시장을 장악해나가고 있는 자바스크립트 기반 소프트웨어들의 미래를 생각하면 옳은 판단이라고 생각합니다.
