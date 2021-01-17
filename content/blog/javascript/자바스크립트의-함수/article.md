---
title: "[Javascript] - 화살표 함수는 왜 쓰는걸까?"
date: 2021-01-14 12:21:13
category: "Javascript"
excerpt: "일반 함수와 화살표 함수의 차이 비교하기"
color: "#F0DB4F"
draft: false
---

Q. "화살표 함수와 function 키워드를 사용한 일반 함수의 차이가 무엇인가요?"  
A. "ES6에서 새로 등장한 화살표 함수는 `function` 키워드를 짧게 줄여줄 수 있다는 장점이 있습니다!"

```js
// 기존의 함수 표현식
function add(a, b) {
  return a + b
}

const add = (a, b) => a + b
```

Q. "어... 끝인가요?"

오늘은 `function` 키워드 함수와 화살표 함수의 차이를 다뤄 보도록 하겠습니다.

## 화살표 함수

일반 함수가 `this`가 가리키는 범위를 호출 시점에 결정하는 것과는 달리 화살표 함수에서 사용된 `this`는 언제나 상위 스코프를 가리킵니다.

```js
const student = {
  name: "Chanmin",
  // 일반 함수인 greeting()의 this는 greeting() 함수를 호출한 객체를 가리킨다.
  greeting: function () {
    console.log(`Hi, I'm ${this.name}!`)
  },
}

student.greeting() // `Hi, I'm Chanmin!`

//

const student = {
  name: "Chanmin",
  // 화살표 함수에서 사용된 this는 언제나 상위 스코프(여기서는 window 객체)를 가리키게 된다.
  greeting: () => {
    console.log(`Hi, I'm ${this.name}!`)
  },
}

student.greeting() // `Hi, I'm `
```

그럼 융통성없는 화살표 함수가 오히려 별로인 것 아닌가요?  
위의 예제에서도 화살표 함수를 사용하면 값을 제대로 출력하지 못하는데요?

제 생각은 조금 다른게, 화살표 함수를 사용하면 언제나 일관적인 상위 객체의 참조가 가능합니다.  
코드로 예를 들어 살펴보겠습니다.

```js
function Class() {
  this.value = 1
  this.increase = function () {
    this.value++
  }
}

const obj = new Class()
// ** 동적 바인딩 - 일반 함수는 호출 객체에 바인딩됩니다.
obj.increase() // increase() 의 this는 obj 객체를 가리킵니다.
console.log(obj.value) // 2
const increase = obj.increase
increase() // 이제 this는 window 객체를 가리킵니다.
console.log(obj.value) // 2
```

`increase` 함수는 일반 함수이므로 호출한 객체에 바인딩됩니다.  
따라서 다른 변수에 참조를 할당한 후 독립적으로 사용하게 되면 아무 기능도 하지 못하는데요, 이 코드를 화살표 함수를 사용해 고쳐보겠습니다.

```js
function Class() {
  this.value = 1
  this.increase = () => this.value++
}

const obj = new Class()
// ** 정적 바인딩 - 화살표 함수는 상위 스코프에 바인딩됩니다.
obj.increase() // increase() 의 this는 obj 객체를 가리킵니다.
console.log(obj.value)
const increase = obj.increase
increase()
console.log(obj.value) // 2 (효과 X)
```
