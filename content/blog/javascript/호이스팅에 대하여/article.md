---
title: "[Javascript] - 변수의 호이스팅"
date: 2020-12-19 12:21:13
category: "Javascript"
excerpt: "호이스팅이란 무엇일까? - let과 var의 동작 방식 이해하기"
color: "#F0DB4F"
draft: false
---

자바스크립트가 흔히 '모던 자바스크립트' 라고 불리기 시작한 ES6 버전에 들어오면서 겪은 변화 중 하나는 변수를 `let` 이라는 키워드로 선언하기 시작했다는 점이다.  
그런데 이전에도 `var` 이라는 키워드로 변수를 잘 선언해 왔는데 왜 새로운 키워드가 등장했고 둘의 차이는 무엇일까?  
그 이유중 하나가 오늘 다룰 호이스팅으로, 기술 면접에도 자주 등장하는 내용이라고 하니 정리하면 좋을 것 같다.

## 호이스팅이란?

호이스팅(Hoisting) 이라는 단어가 생소할 수도 있는데, 바로 끌어올린다는 뜻이다.  
자바스크립트는 그럼 뭘 끌어올릴까?

```js
// Cannot access 'name' before initialization
console.log("Her name : ", name)

let name = "alice"
```

변수를 선언하기도 전에 출력하려 했으니 당연히 오류가 발생한다.  
여기까지는 상식적으로 이해할 수 있지만, `var` 키워드로 변수를 선언하면 오류가 출력되지 않는다.

```js
console.log("Her name : ", name) // undefined

var name = "alice"
```

왓? 둘에 무슨 차이가 있길래 `let`을 사용한 코드에서만 오류가 나타나는 것일까?  
바로 `var`을 사용했을 때는 호이스팅이 일어났기 때문인데, `var` 키워드로 선언된 변수는 언제나 선언된 영역(함수)의 맨 위로 끌어올려진다.

```js
var name
console.log("Her name : ", name)

name = "alice"
```

즉 위의 코드는 자바스크립트 엔진에서 이렇게 해석된 것이다.  
그럼 이렇게 생각할 수도 있을 것이다. "아니 그럼 오류를 줄일 수 있고 오히려 `var`로 변수를 선언하는게 좋은거 아닌가요?"  
물론 오류를 띄우지 않는다는 점을 장점으로 생각하는 사람도 있겠지만, 하나의 예시를 들어 보겠다.

```js
console.log("Her name : ", name)

var defaultValue = "23"
var currentAge = defaultValue
var nameList = []

function getUserAge() {
  return parseInt(defaultValue)
}

// ... 이 외에도 수백여 줄의 코드가 더 있다면?

var name = "alice"
```

물론 name 변수는 호이스팅에 의해 위로 끌어올려지므로 오류는 출력되지 않을 것이다.  
다만, 이 코드를 받아보는 사람은 name 변수가 어디 있는지 한참 헤맨 후에 코드를 짠 사람의 코딩 센스를 의심할 것이다.  
그러니 ES6을 사용하지 못하는 (암울한) 상황이 아니라면 `let`과 `const` 키워드로 변수를 선언하도록 하자.
