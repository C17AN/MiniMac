---
title: "[React] - defaultProps에 대한 짧은 고찰"
date: 2021-01-21 12:21:13
category: "React"
color: "#61DBFB"
thumbnail: "./thumbnail.PNG"
excerpt: "분해 할당의 기본값 문법과 defaultProps의 차이"
draft: false
---

리액트를 다룰 때 함수 컴포넌트에서 속성(prop)을 받아오는 방법은 아마 익숙할 것입니다.

```js
const App = ({ name, age }) => {
  return (
    <>
      <h1>이름 : {name}</h1>
      <h3>나이 : {age}</h3>
    </>
  )
}
```

<figcaption>* 편의상 export default 구문은 따로 표기하지 않았습니다.</figcaption>

`App` 컴포넌트에서 name과 age 라는 속성을 구조 분해 할당 문법으로 받아오는 모습인데요, 만약 상위 컴포넌트로부터 name과 age 속성을 전달받지 못하면 해당 값은 `undefined` 가 됩니다.

이런 경우를 방지하기 위해 리액트에서는 `defaultProps` 라는 특수한 프로퍼티를 사용해 속성의 기본값을 정해줄 수 있습니다.

```js
const App = ({ name, age }) => {
  return (
    <>
      <h1>이름 : {name}</h1>
      <h3>나이 : {age}</h3>
    </>
  )
}

App.defaultProps = {
  name: "Chanmin",
  age: 25,
}
```

이제 이름과 나이가 `undefined` 라고 나타나는 일은 막을 수 있게 되었습니다.

그런데 뭔가 이상하지 않나요?  
객체의 구조 분해 할당을 수행할 때도 비슷한 작업을 수행할 수 있습니다.

```js
const person = {
  name: "Heejin",
  age: 25,
}

const { name, age, gender = "female" } = person
```

이렇게 구조 분해 할당 중 `변수 = "기본값"` 문법을 수행하면 할당받은 결과가 `undefined`라도 기본값을 사용할 수 있게 되는데요, 리액트에서도 똑같이 사용할 수 있지 않을까요?

```js
const App = ({ name = "Chanmin", age = 25 }) => {
  return (
    <>
      <h1>이름 : {name}</h1>
      <h3>나이 : {age}</h3>
    </>
  )
}
```

맞습니다! 정확히 동일한 동작을 수행합니다.  
`defaultProps`과 분해 할당의 기본값 문법을 비교했을 때 더 나을것이 없어 보이는데, 과연 `defaultProps`는 왜 남아 있는 걸까요?

## 클래스 컴포넌트

아마 예상치 못했던 답변이겠지만 바로 클래스 컴포넌트의 존재 때문입니다.  
함수 컴포넌트로 작성하는 것이 대세가 되어버린 지금, 잠시 저 한켠에 놓여 있는 클래스 컴포넌트를 확인해 봅시다.

```js
class App extends React.Component {
  render() {
    const { name = "Chanmin", age = 25 } = this.props
    return (
      <>
        <h1>이름 : {name}</h1>
        <h3>나이 : {age}</h3>
      </>
    )
  }
}
```

오랜만에 보는 클래스 컴포넌트의 모습이네요. (물론 반갑지는 않습니다...)  
이 코드에 무슨 문제가 있는 걸까요? 답은 여러 메서드들과 관련되어 있습니다.

```js
class App extends React.Component {
  componentDidMount() {
    const { name = "Chanmin", age = 25 } = this.props
  }

  componentDidUpdate() {
    const { name = "Chanmin", age = 25 } = this.props
  }

  render() {
    const { name = "Chanmin", age = 25 } = this.props
    return (
      <>
        <h1>이름 : {name}</h1>
        <h3>나이 : {age}</h3>
      </>
    )
  }
}
```

<figcaption>* 이해를 돕기 위한 예시입니다. 실제로 이런 식으로 짜지는 않아요!</figcaption>

하나의 커다란 함수 안에서 모든 작업이 이루어지는 함수 컴포넌트와는 다르게, 클래스 컴포넌트에서는 `render`, `componentDidMount` 등 여러 생명주기 함수가 각자 다른 스코프를 가지고 있습니다.

따라서 구조 분해 할당의 기본값을 사용하려면 위 예제처럼 각 생명주기 함수별로 작업을 수행해야 하는데요, 아무리 봐도 이건 그렇게 예쁜 코드가 아니죠?  
그래서 등장한 것이 `defaultProps`인 것입니다.

```js
class App extends React.Component {
  componentDidMount() {
    const { name, age } = this.props
  }

  componentDidUpdate() {
    const { name, age } = this.props
  }

  render() {
    const { name, age } = this.props
    return (
      <>
        <h1>이름 : {name}</h1>
        <h3>나이 : {age}</h3>
      </>
    )
  }
}

App.defaultProps = {
  name: "Chanmin",
  age: 25,
}
```

이렇게 `defaultProps`를 사용해 컴포넌트 내부의 모든 `this.props`의 기본값을 지정해줄 수 있게 된 것이죠.

아무튼 클래스 컴포넌트의 시대가 저물고 있는 만큼 이제 `defaultProps`가 사용되는 코드는 점점 찾아보기 힘들어질 예정입니다.  
게다가 함수 컴포넌트에서는 \*<code class = "language-text" style = "color: red">deprecate</code> 판정까지 기다리고 있다고 하니 만나면 미리 작별인사를 해 주기로 해요! 🤣

[[\*stackoverflow 링크]](https://stackoverflow.com/questions/47774695/react-functional-component-default-props-vs-default-parameters/56443098#56443098)
