---
title: "[Javascript] - 비동기 정복하기"
date: 2020-12-23 12:21:13
category: "Javascript"
excerpt: "콜백과 프로미스, async를 사용해 비동기 동작 제어하기"
color: "#F0DB4F"
draft: false
---

자바스크립트에서 ajax 통신 코드를 작성하기 위해서는 반드시 비동기 동작에 대해 이해해야만 합니다.  
오늘은 샘플 코드를 통해 모던 자바스크립트에서 비동기 동작을 제어하는 방법을 정리해 보겠습니다.

## 1. 미니 블로그를 만들자!

```js
const posts = [
  {
    title: "첫 번째 포스트",
    body: "첫 번째 글 내용입니다.",
  },
  {
    title: "두 번째 포스트",
    body: "두 번째 글 내용입니다.",
  },
]

// 블로그 글을 모두 출력하는 데에는 1초가 걸립니다.
function getPosts() {
  // setTimeout 함수는 지정한 시간이 지나면 첫 번째 인자로 받은 함수를 실행합니다.
  setTimeout(() => {
    let output = ""
    posts.forEach((post, idx) => {
      output += `<li>${post.title}</li>`
    })
    document.body.innerHTML = output
  }, 1000)
}

// 블로그에 새로운 글을 추가하는 데에는 2초가 걸립니다.
function createPost(post) {
  setTimeout(() => {
    posts.push(post)
  }, 2000)
}

createPost({ title: "세 번째 포스트", body: "세 번째 글 내용입니다." })
getPosts()
```

미니 블로그 서비스를 만들어 본다고 가정하고 코드를 작성한 상태입니다.  
새로운 글을 작성하고 싶어 세 번째 포스트를 열심히 작성했지만, `createPost` 함수를 감싸는 비동기 동작의 타이머가 더 길어 새로운 글이 추가되지 못하고 있네요.  
어떻게 해야 새로운 글을 작성한 다음 글 목록을 불러오도록 코드를 수정할 수 있을까요?

## 2. 비동기 동작 제어하기 - 콜백 사용하기

```js
const posts = [
  {
    title: "첫 번째 포스트",
    body: "첫 번째 글 내용입니다.",
  },
  {
    title: "두 번째 포스트",
    body: "두 번째 글 내용입니다.",
  },
]

function getPosts() {
  setTimeout(() => {
    let output = ""
    posts.forEach((post, idx) => {
      output += `<li>${post.title}</li>`
    })
    document.body.innerHTML = output
  }, 1000)
}

// 새로운 글을 추가하면 callback 인자로 주어진 getPosts() 함수를 호출합니다.
function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post)
    callback()
  }, 2000)
}

// 초기 글 목록을 불러오기 위한 getPosts 호출
getPosts()

createPost(
  { title: "세 번째 포스트", body: "세 번째 글 내용입니다." },
  getPosts
)
```

첫 번째 방법은 바로 콜백(callback) 함수를 사용하는 방법입니다.  
콜백은 특정 비동기 작업을 수행한 후 실행할 함수를 인자로 넘겨 비동기 동작의 순서를 보장하는 기법으로, 위의 코드에서도 `createPost` 함수를 통해 글을 추가한 다음 인자로 주어진 `getPosts` 함수를 호출하고 있습니다.

하지만 비동기 동작이 여러번 중첩되면 코드가 읽기 난해해진다는 단점이 있고, 그래서 등장한 개념이 프라미스(promise)를 통한 제어입니다.

## 3. 비동기 동작 제어하기 - 프라미스 사용하기

- **프라미스 객체 사용법**

```js
new Promise((resolve, reject) => {
  // 함수 본문에서 비동기 작업을 수행합니다.
  try {
    // 작업 성공 시 첫 번째 인자 함수를 호출합니다.
    resolve()
  } catch (err) {
    // 작업 실패 시 두 번째 인자 함수를 호출합니다.
    reject()
  }
})
  // then 메서드에는 첫 번째 인자 함수의 인자가 전달됩니다.
  .then()
  // catch 메서드에는 두 번째 인자 함수의 인자가 전달됩니다.
  .catch()
```

```js
const posts = [
  {
    title: "첫 번째 포스트",
    body: "첫 번째 글 내용입니다.",
  },
  {
    title: "두 번째 포스트",
    body: "두 번째 글 내용입니다.",
  },
]

function getPosts() {
  setTimeout(() => {
    let output = ""
    posts.forEach((post, idx) => {
      output += `<li>${post.title}</li>`
    })
    document.body.innerHTML = output
  }, 1000)
}

function createPost(post) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        posts.push(post)
        resolve()
      } catch (err) {
        reject("에러가 발생했습니다.")
      }
    }, 2000)
  )
}

getPosts()

createPost({
  title: "세 번째 포스트",
  body: "세 번째 글 내용입니다.",
})
  .then(() => getPosts())
  .catch(err => console.log(err))
```

프라미스를 통해 비동기 동작을 제어하는 모습입니다.  
프라미스는 간결한 예외처리가 가능하다는 장점과 콜백에서 나타났던 복잡한 코드 구조를 비교적 간결하게 줄여줄 수 있다는 장점이 있습니다.

## 잠깐 : 콜백 vs 프라미스

얼핏 봐서는 프라미스를 사용한 코드가 더 어렵게 느껴질 수도 있습니다.  
하지만 코드를 다른 사람에게 넘겨주거나 장기적으로 관리할 필요가 있다면 프라미스를 사용하는 것이 더 나은 선택입니다.

```js
// 콜백을 사용한 중첩 비동기 동작 제어
function callback1(callback2) {
    (비동기 작업 1 수행)
    callback2(callback3) {
        (비동기 작업 2 수행)
        callback3(callback4) {
            (비동기 작업 3 수행)
            callback4(callback5) {
                ...
            }
        }
    }
}
```

```js
// 프라미스를 사용한 중첩 비동기 동작 제어
function promise1() {
  return new Promise((resolve, reject) => {
    (비동기 작업 1 수행)
    resolve()
  })
}

function promise2() {
  return new Promise((resolve, reject) => {
    (비동기 작업 2 수행)
    resolve()
  })
}

function promise3() {
  return new Promise((resolve, reject) => {
    (비동기 작업 3 수행)
    resolve()
  })
}

promise1()
    .then(() => promise2())
    .then(() => promise3())
```

## 4. 비동기 동작 제어하기 - async / await 사용하기

- **async / await 사용법**

```js
// 수행할 비동기 동작들을 하나의 async 함수로 감쌉니다.
async function (함수명) () {
    await (수행할 비동기 동작 1);
    await (수행할 비동기 동작 2);
    await (수행할 비동기 동작 3);
    // await이 붙은 비동기 동작은 코드 순서 = 실행 순서가 보장됩니다.
}
```

async / await은 프라미스를 더 직관적으로 사용하기 위한 문법입니다.  
`async` 함수 내 비동기 동작에 `await`을 붙이면 해당 동작이 끝날 때까지 대기하게 되며, 그 결과 비동기 동작들이 마치 동기적으로 실행되는 것처럼 보이게 됩니다.

```js
const posts = [
  {
    title: "첫 번째 포스트",
    body: "첫 번째 글 내용입니다.",
  },
  {
    title: "두 번째 포스트",
    body: "두 번째 글 내용입니다.",
  },
]

function getPosts() {
  setTimeout(() => {
    let output = ""
    posts.forEach((post, idx) => {
      output += `<li>${post.title}</li>`
    })
    document.body.innerHTML = output
  }, 1000)
}

function createPost(post) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        posts.push(post)
        resolve()
      } catch (err) {
        reject("에러가 발생했습니다.")
      }
    }, 2000)
  )
}

async function create() {
  await createPost({
    title: "세 번째 포스트",
    body: "세 번째 글 내용입니다.",
  })
  getPosts()
}

getPosts()
create()
```

`async` 함수 내에서 실행되는 비동기 동작에 `await`을 사용하게 되면 해당 동작이 끝날 때까지 대기하게 됩니다.  
따라서 `then` 보다도 더 직관적인 비동기 동작의 제어가 가능합니다.
