---
title: "[Javascript] - 문자형으로 변환하기"
category: "Javascript"
excerpt: "문자형 변환에 사용되는 String 함수와 toString 함수 비교하기"
color: "#F0DB4F"
date: 2021-01-18 12:21:13
---

[모던 자바스크립트 튜토리얼](https://ko.javascript.info/type-conversions#ref-2358)에서 타입 변환 글을 읽던 중 의문이 생긴 부분이 있었습니다.

> 만약, 다른 형의 값을 전달받으면 이 값은 문자형으로 자동 변환됩니다.  
> String(value) 함수를 호출해 전달받은 값을 문자열로 변환 할 수도 있습니다. - 모던 자바스크립트 튜토리얼 중

바로 `String` 함수를 사용해 문자형 형변환을 수행한다는 대목이었는데, 문자형으로 변환하는 익숙한 함수가 하나 있죠. 바로 `toString` 함수입니다.  
그럼 String 함수와 `toString` 함수는 어떤 차이가 있는 걸까요?

## String 함수

`String` 함수는 주어진 인자를 문자열로 변환할 뿐만 아니라 `new` 키워드와 함께 새로운 문자열 **객체**의 생성자가 될 수도 있습니다.

```js
let num1 = 25
console.log(typeof num1) // number
let str1 = String(num1)
console.log(typeof str1) // string
```

```js
let newString1 = String(400) // "400"
let newString2 = new String(400) // String {"400"}
```

문자열 객체를 사용할 일은 흔치 않겠지만<span style = "font-size: 0.88rem">(저도 한 번도 사용해본적 없습니다...)</span>, 문자열 객체와 원시형 문자열을 `eval` 함수에 대입하면 다른 결과를 얻는다는 점에 유의해야 합니다.

```js
let newString1 = eval(String("2 + 2")) // 4
let newString2 = eval(new String("2 + 2")) // String {"2 + 2"}
```

## toString 함수

`toString` 함수는 숫자 또는 문자열의 메서드로 사용할 수 있는데요, 먼저 문자열의 메서드로 사용될 경우 `valueOf` 와 동일한 역할을 수행합니다.

```js
let newString1 = String(400).toString() // "400"
let newString2 = new String(400).toString() // "400"
```

또 숫자의 메서드로 사용될 경우에는 인자로 2 ~ 36 사이의 값을 대입하면 숫자를 해당 진수로 변환한 문자열을 얻을 수 있습니다.

```js
let num1 = 25
let str1 = num1.toString() // "25"
let bin_str1 = num1.toString(2) // "11001"
```

이렇게 단순히 숫자형을 문자형으로 변경할 때는 `String` 함수와 `toString` 함수의 동작이 동일하지만, 목적에 따라 다른 기능을 수행할 수도 있음을 알 수 있었습니다. 😆
