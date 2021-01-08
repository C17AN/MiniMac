---
title: "[React] - 리액트 훅 한방에 정리하기 : 1편"
date: 2020-12-24 12:21:13
category: "React"
color: "#61DBFB"
thumbnail: "./thumbnail.PNG"
excerpt: "자주 사용하는 훅 사용법 정리 1편 : useState로 상태 관리하기"
draft: false
---

리액트로 컴포넌트를 만들때 함수 컴포넌트를 사용하는 것이 대세가 된 지금 함수 컴포넌트에서 클래스 컴포넌트의 동작을 구현하는 훅(Hook)에 대한 이해는 필수적입니다.

```js
import React, { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  function decrementCount() {
    // count 가 들어간 부분을 재렌더링함.
    setCount(prevCnt => prevCnt - 1)
  }

  function incrementCount() {
    // count 가 들어간 부분을 재렌더링함.
    setCount(prevCnt => prevCnt + 1)
  }

  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </>
  )
}

export default App
```

위는 클래스 컴포넌트의 상태와 `setState` 함수를 `useState` 훅으로 구현한 예제로, 이렇게 훅을 사용하면 함수 컴포넌트에서 클래스 컴포넌트의 기능을 구현할 수 있습니다.

먼저 기본적인 특징을 소개하자면 훅은 클래스 컴포넌트의 동작을 함수 컴포넌트에 구현하는 것이 목적이므로 당연히 함수 컴포넌트에서만 사용이 가능합니다.  
또, 훅은 함수 컴포넌트를 마운트할때마다 언제나 동일한 순서의 동작을 보장해야만 합니다.

```js
import React, { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  if (count > 10) {
    const [bonus, setBonus] = useState(true)
  }

  function incrementCount() {
    setCount(prevCnt => prevCnt + 1)
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </>
  )
}

export default App
```

<div style = "text-align: center; margin-bottom: 1.5rem; font-size: 0.8rem; color: red">[위 코드는 실제로는 에러를 출력합니다.]</div>

이게 무슨 뜻인가 하면 조건문이나 반복문을 통해 새로운 훅을 임의로 생성하거나 제거할 수 없다는 뜻인데, 예를 들면 위 코드에서 카운터를 조작해 10점을 달성하면 bonus 라는 상태를 새로 생성하는 것처럼 보일 수도 있으나 실제로는 오류가 동작해 실행조차 불가능합니다.

다양한 훅 중에서 처음 만나볼 리액트 훅은 `useState`입니다.  
`useState`는 클래스 컴포넌트에서 사용하는 상태와 `setState`를 거의 완벽하게 대체하는데, 쉬운 훅임에도 불구하고 종종 헷갈리곤 합니다.

```js
import React, { useState } from "react"

// 배열의 분해 할당 문법을 기억하자.
const [state, setState] = useState(0)
```

`useState` 훅에 인자로 넘기는 값이 상태의 초깃값이 되고 언제나 초기 상태값과 업데이트 함수가 담긴 배열을 리턴합니다.  
즉 위의 코드에서는 state 라는 변수에 초기 상태값 0을 저장하며 setState 함수를 통해 state 변수에 담긴 상태값을 변경할 수 있게 됩니다.

```js
import React, { useState } from "react"

function App() {
  let [count, setCount] = useState(0)

  function incrementWithSelf() {
    // 업데이트 함수를 사용하지 않을 때
    count += 1
  }

  function incrementWithHook() {
    // 업데이트 함수를 사용할 때
    setCount(count + 1)
  }

  return (
    <>
      <div>{count}</div>
      <span>업데이트 함수 X </span>
      <button onClick={incrementWithSelf}>+</button>
      <br />
      <span>업데이트 함수 O </span>
      <button onClick={incrementWithHook}>+</button>
    </>
  )
}

export default App
```

리액트는 가장 큰 특징 중 하나로 상태값이 변경되면 가상 돔을 활용해 해당 상태값이 사용된 부분만을 다시 렌더링합니다.  
그러나 업데이트 함수가 아닌 사용자가 임의로 상태값을 변경하면 리액트는 변경사항을 인식하지 못하므로 상태값을 변경할 때는 반드시 업데이트 함수를 사용해야만 합니다.

이번에는 수수께끼를 한번 풀어봅시다.

```js
import React, { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  function incrementCount() {
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </>
  )
}

export default App
```

이렇게 카운터 코드가 있을 때 + 버튼을 누르면 count 상태값은 2씩 증가할까요? 물론 이런 문제가 으레 그렇듯 답은 "아니오" 입니다.  
리액트는 불필요한 재렌더링을 최대한 줄이기 위해 여러 개의 업데이트 함수를 한번에 처리하는데[^1], 이 때 동일한 업데이트 함수가 존재할 때는 나중에 사용된 업데이트 함수의 인자로 상태를 변경합니다.

만약 부득이하게 한 블럭 안에서 업데이트 함수가 여러 번 작동해야 한다면 다음과 같이 인자에 함수를 넣어줍니다.

```js
import React, { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  function incrementCount() {
    setCount(count => count + 1)
    setCount(count => count + 1)
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </>
  )
}

export default App
```

이렇게 인자로 주어진 함수의 인자는 언제나 직전 상태값이 되어 버튼을 누르면 의도한 대로 2씩 숫자가 증가합니다.  
이는 자주 사용하게 될 테크닉이니 익혀 두시면 좋습니다!

[^1]: 이 부분이 useState를 사용할 때 가장 헷갈리는 부분인데, 업데이트 함수가 일괄적으로 상태를 업데이트하는 과정은 두 글에 자세히 나와 있습니다. [(글 1)](https://medium.com/swlh/react-state-batch-update-b1b61bd28cd2) [(글 2)](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks)
