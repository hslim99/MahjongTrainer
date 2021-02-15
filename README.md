# MahjongTrainer

이 코드는 마작의 기본적인 조패를 연습하기 위해 만들어졌습니다.

## How to use

[index.html](index.html)을 로드하면 도라 표시패와 배패가 주어집니다.

이때, 자신의 손패에서 버리고 싶은 패를 골라 클릭하면 버릴 수 있습니다.

클릭하지 않고 패에 마우스만 올려놓았을 경우에는 해당 패를 버렸을 경우의 샹텐 수<sup>[1](#footnote1)</sup>가 나타나게 됩니다.

## Known issues

* 남은 패의 수가 표시가 되지 않음
* ~~5장째 패로 대기하도록 샹텐 수가 계산되는 버그~~ (해결됨)
  
  ~~e.g., <img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"> 의 경우 실제로는 1샹텐이지만 0샹텐(텐파이)로 표기됨~~
* ~~깡을 쳤을 때 나머지 패로 치또이츠를 만들면 버그가 생김~~ (해결됨)

"[riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles)" by "[FluffyStuff](https://github.com/FluffyStuff)" is licensed by under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) / Modified from original

<a name="footnote1">1</a>: 텐파이까지 가장 빨리 도달하기 위해 필요한 패의 수
