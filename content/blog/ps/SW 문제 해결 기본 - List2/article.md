---
title: "[SWEA] - SW 문제 해결 기본 : List2"
date: 2020-10-06 12:21:13
category: "알고리즘"
excerpt: "파이썬으로 리스트 자료구조를 활용하는 문제 해결하기"
thumbnail: "./thumbnail.PNG"
color: "#ea4c89"
draft: false
---

![thumbnail](./thumbnail.PNG)

- 모든 문제의 저작권은 SW Expert Academy에 있습니다.

## 문제 목록

> [D2] No. 4836 색칠하기  
> [D2] No. 4839 이진탐색

## 풀이 코드 (Python)

### 1. 4836번 - 색칠하기

- 1이 빨강, 2가 파랑이니 합이 3만 넘으면 보라겠지? 라는 생각이 함정입니다.
- 빨강 영역만 셋이 겹칠때도 합이 3이 된다는 사실을 잊지 마세요.

```python
T = int(input())
for i in range(1, T + 1):
    N = int(input())
    cnt = 0
    canvas = [[0] * 10 for _ in range(10)]
    for j in range(N):
        top, left, bottom, right, color = map(int, input().split())
        for row in range(top, bottom+1):
            for col in range(left, right+1):
                if canvas[row][col] is color:
                    continue
                else:
                    canvas[row][col] += color
    for row in range(10):
        for col in range(10):
            if canvas[row][col] >= 3:
                cnt += 1

    print("#{} {}".format(i, cnt))
```

---

### 2. 4836번 - 이진탐색

- 파이썬의 기본 나눗셈 연산은 소숫점까지 계산합니다. (Ex. 5 나누기 2 의 결과는 2.5)

```python
T = int(input())

def binSearch(mid, left, right, cnt, find):
    while True:
        if find == mid:
            return cnt
        if find > mid:
            return binSearch(int((mid + right) / 2), mid, right, cnt+1, find)
        elif find < mid:
            return binSearch(int((mid + left) / 2), left, mid, cnt+1, find)


for i in range(1, T+1):
    P, Pa, Pb = map(int, input().split())
    cntA, cntB = 0, 0
    cntA = binSearch(int((1 + P) / 2), 1, P, 0, Pa)
    cntB = binSearch(int((1 + P) / 2), 1, P, 0, Pb)

    if cntA == cntB:
        print("#{} {}".format(i, '0'))
    elif cntA < cntB:
        print("#{} {}".format(i, 'A'))
    else:
        print("#{} {}".format(i, 'B'))
```
