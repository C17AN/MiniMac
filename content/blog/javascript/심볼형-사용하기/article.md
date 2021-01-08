---
title: "[Javascript] - 비밀을 지켜라! 심볼형 프로퍼티 사용하기"
date: 2021-01-07 12:21:13
category: "Javascript"
excerpt: "고유값을 생성하는 심볼형 사용하기"
thumbnail: "./thumbnail.PNG"
color: "#F0DB4F"
draft: false
---

자바스크립트의 객체의 속성은 문자형과 심볼형을 허용하는데, 심볼형이란 무엇일까?  
심볼(**Symbol**)은 ES6에서 새롭게 추가된 타입으로 심볼로 생성되는 값은 언제나 고유하다는 특징이 있다.

**\[심볼 사용법\]**

```js
// new 키워드 없이 선언함에 유의한다.
const symbol1 = Symbol()
// 심볼의 인자는 심볼을 설명하는 역할에 불과하다.
const symbol2 = Symbol("name")
```

심볼은 인자를 해시화하는 개념이 아니라 심볼마다 완전히 고유한 값이 할당되는데 코드를 통해 살펴보자.

```js
Symbol("name") == Symbol("name") // false
```

동일한 "name" 인자를 받았다 하더라도 인자는 심볼값의 고유 여부를 결정할때 영향을 미치지 않으며, 심볼은 언제나 고유한 값을 가지므로 비교 결과가 거짓이 되는 모습이다.  
심볼값은 이렇게 언제나 고유하다는 특징을 살려 주로 객체의 프로퍼티로 활용된다.

#### \[심볼값 프로퍼티 생성하기\]

```js
const symbol = Symbol("")

const account = {
  name: "찬민",
  age: 25,
  // 심볼값 프로퍼티명은 대괄호로 감싸준다.
  [symbol]: "Symbol Value",
}
```

심볼형 프로퍼티를 생성할 때는 프로퍼티로 활용할 변수명을 대괄호로 감싸는 **computed property name** 문법을 활용한다.  
그럼 심볼은 언제 & 어떻게 사용할까? 심볼값은 언제나 고유하다는 특성을 살려 객체의 프로퍼티 중 **다른 파일의 접근을 허용하지 않는 프로퍼티**를 만들 수 있다.

```js
// account.js
const account = {
  secret: "123abc456def",
  name: "찬민",
  age: 25,
}

export { account }
```

```js
// index.js
import { account } from "./account.js"

console.log(account.secret) // 이러면 비밀이 홀랑 털린다.
```

위와 같이 계정 정보가 담긴 객체에 민감한 비밀 키가 포함되어 있다.  
이러면 다른 파일에서 `account.secret` 으로 프로퍼티에 접근해 비밀 키가 무엇인지 쉽게 알아낼 수 있는데, 이럴 때 심볼형 프로퍼티를 사용하면 절대로 그 값을 알아낼 수 없게 되는 것이다.

```js
// account.js
const secret = Symbol("secretKey")

const account = {
  [secret]: "123abc456def",
  name: "찬민",
  age: 25,
}

export { account }
```

```js
// index.js
import { account } from "./account.js"

const secret = Symbol("secretKey")
console.log(account[secret]) // undefined, Symbol 타입 프로퍼티에 절대 접근할 수 없다.
```

사실 아직까지 정말 여러 번의 클론코딩이나 예제를 만들어보면서도 심볼을 활용하는 것을 딱 한번밖에 보지 못했다.  
아무래도 사용될 수 있는 상황이 제한적이니 어쩔 수 없겠지만, 그래도 특정 상황에서는 분명 유용한 기능이라 생각된다. (아마도..?)
