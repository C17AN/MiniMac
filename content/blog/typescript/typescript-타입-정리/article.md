---
title: "[Typescript] - 타입 소개하기 : 1편"
date: 2020-10-26 14:21:13
category: "Typescript"
thumbnail: "./thumbnail.PNG"
color: "#007acc"
excerpt: "타입스크립트 기본 타입 정리하기"
draft: false
---

![thumbnail](./thumbnail.PNG)

## 타입 소개하기

타입스크립트의 핵심은 이름 그대로 "타입" 인데요, 오늘은 타입스크립트가 제공하는 여러 타입을 소개합니다.  
시작하기 전 팁이 있다면, 타입스크립트에서 사용하는 모든 자료형은 **소문자** 를 사용합니다.

## 1. 핵심 타입 소개

### 1. number 타입

먼저 숫자를 표기하기 위한 `number` 타입이 존재합니다.  
타입스크립트는 정수와 실수, 부호를 구분하지 않고 모두 `number` 타입을 사용합니다.

```typescript
const age: number = 24
const celsius: number = 36.7
const minusAccount: number = -1000
```

<hr style = "background-color: #dedede; margin: 1.5rem 0">

### 2. string 타입

다음은 `string` 타입입니다.  
타입스크립트는 문자와 문자열을 구분하지 않고 모두 `string` 타입을 사용합니다.

```typescript
const name: string = "찬민"
const text: string = "A"
```

<hr style = "background-color: #dedede; margin: 1.5rem 0">

### 3. boolean 타입

`boolean` 타입 변수는 `true` 또는 `false`[^1] 값만을 대입할 수 있으며, 이외의 값을 대입할 시 오류를 출력합니다.

```typescript
const isLoading: boolean = false
const isComplete: boolean = true
```

<hr style = "background-color: #dedede; margin: 1.5rem 0">

### 4. object 타입

먼저 간단한 예시로 `object` 타입을 만나봅시다.

```js
const person = {
  name: "chanmin",
  age: 24,
}

console.log(person.nickname)
// javascript : undefined
// typescript : Error! - Property 'nickname' does not exist on type ...'
```

<hr>

위 자바스크립트 코드는 person 객체에서 `nickname` 속성을 찾을 수 없으니 `undefined` 를 출력합니다.  
하지만, 타입스크립트에서는 이를 명백한 오류로 표시합니다.

왜 이렇게 됐냐 하면 person 변수에 객체를 할당하면서 타입 추론이 발생했기 때문인데요, 타입 추론의 결과 person 변수는 이런 **키 - 타입** 쌍의 객체 타입을 갖게 됩니다.

```ts
{
  name: string
  age: number
}
```

따라서 객체 타입에 존재하지 않는 키 `nickname` 에 접근을 시도했으니 오류가 발생합니다.  
예시에서는 타입 추론을 통해 객체 타입을 사용했는데, 객체 타입을 명시적으로 선언할 수도 있습니다.

```ts
let person: {
  name: string
  age: number
}

person = {
  name: "chanmin",
  age: 24,
}
```

이렇게 객체에 특정 키와 키의 타입을 정해줄 수 있는데요, 주로 API 호출 결과 등을 다룰 때 유용하게 사용됩니다.

<hr style = "background-color: #dedede; margin: 1.5rem 0">

### 5. array 타입

객체도 타입이 있는데, 배열이 빠지면 섭섭하겠죠?  
타입스크립트에서는 마치 자바나 C++ 등 언어에서 표현하는 방법처럼 배열을 나타낼 수 있습니다.

```ts
let playList: string[] = ["Jasmine", "Martinie Blue", "Nike Shoes"]
let lottoNumbers: number[] = [1, 13, 24, 27, 30, 35, 42]
```

<hr style = "background-color: #dedede; margin: 1.5rem 0">

### 6. tuple 타입

`tuple` 타입은 기본 자바스크립트에서는 찾아볼 수 없는 타입인데요, 일반적인 배열과는 다르게 길이가 가변적이지 않고 한 가지 이상의 타입을 보관할 때 사용합니다.

```ts
let randomData: string[] = ["wow", 24, false, "hello"]
// Error! - Type ~~ is not assignable to type 'string'
```

이렇게 여러 타입을 담으려 하면 타입스크립트에서는 위처럼 오류를 출력하는데요, 이럴 때 튜플을 사용합니다.

튜플형을 사용할 때 유의할 점은 두 가지가 있습니다.

```ts
let randomData: [string, number] = ["wow", 24];
1. let randomData: [number, string] = ["wow", 24]; // Error!
2. let randomData: [number, string] = [24, "wow", false]; // Error!
```

1. 정의한 튜플형의 타입은 실제 배열의 대응하는 원소 타입과 일치해야 한다.
2. 정의한 튜플형의 원소 수는 실제 배열의 원소 수와 일치해야 한다.

## 2. 타입 추론

타입스크립트는 할당받은 값에 따라 변수의 타입을 자동으로 추론합니다.

```typescript
let number1 = 24 // number 변수는 number 타입이라고 추론함.
number1 = "twenty four" // Error! - Type 'string' is not assignable to type 'number'
```

따라서 변수를 선언과 즉시 초기화하는 경우라면 타입을 명시적으로 표기할 필요는 없습니다.

```typescript
let number1: number
number1 = 24
```

다만, 위처럼 변수를 선언한 후 곧바로 값을 대입하지 않는 경우에는 명시적으로 타입을 명시해야 합니다.  
(명시하지 않으면 `any` 타입으로 취급됩니다!)

[^1]: true, false 역시 모두 소문자를 사용합니다.
