# MahjongTrainer

이 코드는 마작의 기본적인 조패를 연습하기 위해 만들어졌습니다.

## How to use

[index.html](index.html)을 로드하면 도라 표시패와 배패가 주어집니다.

이때, 자신의 손패에서 버리고 싶은 패를 골라 클릭하면 버릴 수 있습니다.

클릭하지 않고 패 혹은 깡 버튼에 마우스만 올려놓았을 경우에는 해당 패를 버리거나 깡을 선언한 경우의 샹텐 수<sup>[1](#footnote1)</sup>가 나타나게 됩니다.

남은 쯔모 수가 0이 되었을 경우 그대로 조패가 끝나며, 왕패 우측의 다시하기 버튼으로 새로이 시작할 수 있습니다.

## Update Log

### 21-02-23
* 모바일 기기에서 샹텐 수를 표시하지 않을 때 타패가 되지 않는 버그를 수정
* 선택된 패를 어둡게 하는 코드를 수정
* 모바일 기기에서 타패 후 타패한 자리에 있던 패가 어두운 채로 남아있는 버그를 수정

### 21-02-21
* 타패 후 손패의 정보를 보여주는 기능을 끄고 켤 수 있게 됨
* 남은 쯔모 수를 보여 줌

|깡|동가|남가|서가|북가|
|---|---|---|---|---|
|0회|18|18|17|17|
|1회|18|17|17|17|
|2회|17|17|17|17|
|3회|17|17|17|16|
|4회|17|17|16|16|

▲ 깡 선언 수에 따른 쯔모 횟수

* 더 이상 타패하거나 깡을 선언할 수 없는 경우:
1. 남은 쯔모 수가 0일 때 (하이떼이가 아니라면 깡은 가능)
2. 청일색 모드에서 패산에 남은 패가 부족할 때
* 자패 없이 플레이할 수 있는 모드를 추가함 (1인 조패 연습의 특성 상 울 수 없어 상황을 막론하고 자패부터 버리게 되는 경우를 고려함)

### 21-02-20
* 혼일색, 청일색 모드가 추가됨
* 깡을 선언했을 때 쯔모한 패와 간격을 두도록 수정
* 아카도라를 포함한 깡을 선언했을 때 제대로 표시되지 않는 버그 수정
* 청일색 모드에서 깡을 선언해서 마지막에 패가 부족해지는 상황을 처리하도록 함

## Known issues / to-do list

* 버리고 나면 패 정보를 표시하는 말풍선이 사라지도록(모바일에선 됨)

## Resolved issues

* ~~5장째 패로 대기하도록 샹텐 수가 계산되지 않고 이때 유효패가 제대로 계산되지 않는 버그~~ (해결됨)
  
  ~~e.g., <img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"> 의 경우 실제로는 1샹텐이지만 텐파이로 표기됨~~
  
  ~~e.g., <img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/1z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/2z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/3z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"><img src="/img/4z.png" width="24px" height="32px"> 의 경우 타 <img src="/img/1z.png" width="24px" height="32px">과 타 <img src="/img/2z.png" width="24px" height="32px">이 1샹텐, 타 <img src="/img/3z.png" width="24px" height="32px">와 타 <img src="/img/4z.png" width="24px" height="32px">는 2샹텐이지만 각각 텐파이, 1샹텐으로 표기되며 유효패가 제대로 계산되지 않음~~

  ~~e.g., <img src="/img/1m.png" width="24px" height="32px"><img src="/img/1m.png" width="24px" height="32px"><img src="/img/1m.png" width="24px" height="32px"><img src="/img/1m.png" width="24px" height="32px"><img src="/img/9m.png" width="24px" height="32px"><img src="/img/9m.png" width="24px" height="32px"><img src="/img/9m.png" width="24px" height="32px"><img src="/img/9m.png" width="24px" height="32px"><img src="/img/1p.png" width="24px" height="32px"><img src="/img/1p.png" width="24px" height="32px"><img src="/img/1p.png" width="24px" height="32px"><img src="/img/9p.png" width="24px" height="32px"><img src="/img/9p.png" width="24px" height="32px"><img src="/img/9p.png" width="24px" height="32px"> 의 경우 4가지의 타패 경우에 모두 유효패가 제대로 계산되지 않음~~

* ~~깡을 쳤을 때 나머지 패로 치또이츠를 만들면 버그~~ (해결됨)
* ~~깡을 선언하고 영상패를 쯔모한 손패에서 샹텐 수가 계산되지 않는 버그~~ (해결됨)
* ~~똑같은 머리가 두 쌍인 치또이쯔가 계산되는 버그~~ (해결됨)
* ~~국사무쌍의 샹텐 수가 제대로 계산되지 않는 버그~~ (해결됨)
* ~~남은 패의 수가 표시가 되지 않음~~ (해결됨)
* ~~깡을 선언했을 때 버림패의 수가 달라져야 함~~ (해결됨)
* ~~깡을 선언한 패가 유효패 계산에 포함되는 버그~~ (해결됨)
* ~~모바일 기기에서 샹텐 수를 표시하지 않을 때 타패가 되지 않는 버그를 수정~~

"[riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles)" by "[FluffyStuff](https://github.com/FluffyStuff)" is licensed by under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) / Modified from original

<a name="footnote1">1</a>: 텐파이까지 가장 빨리 도달하기 위해 필요한 패의 수
