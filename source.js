const tiles = [];
const hand = [];
const kawa = [];
const dora = [];
const kan = [];
const types = ['m', 'p', 's', 'z'];
let openedTilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
let handTilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
let calculatedTile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const initialize = () => {
    for (let type = 0; type < 4; type++) {
        for (let num = 1; num <= 9; num++) {
            if (type != 3 && num != 5) {
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
            }
            else if (type != 3 && num == 5) {
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
                tiles.push('0' + types[type]);
            }
            else if (type == 3 && num < 8) {
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
                tiles.push(num + types[type]);
            }
        }
    }
    
    /* for (let i = 0; i < tiles.length; i++) {
        let random = Math.floor(Math.random() * (tiles.length - i)) + i; // i 이상 tiles.length 미만의 난수 생성
        const temp = tiles[i];
        tiles[i] = tiles[random];
        tiles[random] = temp;
    } */

    tiles.push('1m','1m','5m','5m','4p','4p','4p','4p','2s','2s','3s','3s','4z','4z');
}

// 쯔모한 패를 제외하고 정렬하도록 하는 함수
const sortHand = () => {
    const bucket = [[], [], [], [], []];
    const order = ['1', '2', '3', '4', '0', '5', '6', '7', '8', '9'];

    for (let i = 0; i < 4; i++) {
        // 깡으로 인한 변수가 있기에 j < hand.length - 1을 조건으로 삼음
        for (let j = 0; j < hand.length - 1; j++) {
            if (hand[j].charAt(1) == types[i]) {
                bucket[i].push(hand[j]);
            }
        }

        bucket[i].sort((a, b) => order.indexOf(a.charAt(0)) - order.indexOf(b.charAt(0)));
    }

    bucket[4].push(hand[hand.length - 1]);
    
    hand.splice(0, hand.length);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < bucket[i].length; j++) {
            hand.push(bucket[i][j]);
        }
    }
}

const countOpenedTiles = (open) => {
    if (open.charAt(0) == '0') {
        openedTilesNum[types.indexOf(open.charAt(1))][4]++;
    }
    else {
        openedTilesNum[types.indexOf(open.charAt(1))][open.charAt(0) - 1]++;
    }
}

const getFirstHand = () => {
    let open = tiles.pop();
    dora.push(open);
    countOpenedTiles(open);

    for (let i = 0; i < 14; i++) {
        open = tiles.pop();
        hand.push(open);
        countOpenedTiles(open);
    }
}

const printCurrentHand = () => {
    // 현재 내가 가진 패 중 쯔모 패를 제외하고 정렬함
    sortHand();

    const table = document.getElementById('hand');
    table.innerHTML = ''
    const tr = document.createElement('tr');
    const td = [];

    handTilesNum.splice(0, handTilesNum.length);
    handTilesNum.push([0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]);

    // 테이블의 구조: 정렬된 손패, 쯔모 표시, 쯔모 패, 깡 표시
    // 반복문 1: 손패
    for (let i = 0; i < hand.length; i++) {
        td.push(document.createElement('td'));

        if (i == hand.length - 1) {
            const space = document.createElement('td');
            space.innerHTML = 'ツモ';
            tr.appendChild(space);
        }

        const img = document.createElement('img');
        img.setAttribute('src', 'img/' + hand[i] + '.png');
        img.setAttribute('class', 'selectable');
        img.setAttribute('onclick', 'discardTile(this)');
        img.setAttribute('onmouseenter', 'showNextHandInfo(' + i + ')');
        img.setAttribute('index', i);

        const span = document.createElement('span');
        span.setAttribute('class', 'arrow-box');

        td[i].setAttribute('class', 'arrow-container');
        td[i].appendChild(img);
        td[i].appendChild(span);
        tr.appendChild(td[i]);

        if (hand[i].charAt(0) != 0) {
            handTilesNum[types.indexOf(hand[i].charAt(1))][hand[i].charAt(0) - 1]++;
        }
        else {
            handTilesNum[types.indexOf(hand[i].charAt(1))][4]++;
        }
    }

    // 반복문 2: 깡 표시
    for (let i = 0; i < kan.length; i++) {
        const img = [];

        img.push(document.createElement('img'));
        td.push(document.createElement('td'));
        img[0].setAttribute('src', 'img/back.png');
        td[td.length - 1].appendChild(img[0]);
        tr.appendChild(td[td.length - 1]);

        img.push(document.createElement('img'));
        td.push(document.createElement('td'));
        if (kan[i].charAt(0) == '5' && kan[i] != '5z') {
            img[1].setAttribute('src', 'img/0' + kan[i].charAt(1) + '.png');
        }
        else {
            img[1].setAttribute('src', 'img/' + kan[i] + '.png');
        }
        td[td.length - 1].appendChild(img[1]);
        tr.appendChild(td[td.length - 1]);

        img.push(document.createElement('img'));
        td.push(document.createElement('td'));
        img[2].setAttribute('src', 'img/' + kan[i] + '.png');
        td[td.length - 1].appendChild(img[2]);
        tr.appendChild(td[td.length - 1]);

        img.push(document.createElement('img'));
        td.push(document.createElement('td'));
        img[3].setAttribute('src', 'img/back.png');
        td[td.length - 1].appendChild(img[3]);
        tr.appendChild(td[td.length - 1]);

        handTilesNum[types.indexOf(kan[i].charAt(1))][kan[i].charAt(0) - 1]++;
    }

    table.appendChild(tr);

    checkKan();
}

const discardTile = (a) => {
    if (kawa.length >= 18) { return; }

    const index = a.getAttribute('index');
    const table = document.getElementById('kawa');
    const td = table.getElementsByTagName('td');
    const img = document.createElement('img');

    calculatedTile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    img.setAttribute('src', 'img/' + hand[index] + '.png');
    kawa.push(hand[index]);
    td[kawa.length - 1].appendChild(img);
    
    const open = tiles.pop();
    hand[index] = hand[hand.length - 1];
    hand[hand.length - 1] = open; // 쯔모
    countOpenedTiles(open);

    printCurrentHand();
    /* for (let i = 0; i < hand.length; i++) {
        showNextHandInfo(i);
    } */
}

const showNextHandInfo = (index) => {
    if (calculatedTile[index]) { return; }
    const newHand = [...hand];

    newHand.splice(index, 1);
    const shanten = calculateShanten(newHand);
    const validTiles = calculateTilesForNextShanten(newHand, shanten - 1);

    const span = document.getElementsByClassName('arrow-box')[index];
    let ukeireMaisuu1 = validTiles.length * 4; // 손패만을 고려했을 때의 유효패 개수
    let ukeireMaisuu2 = validTiles.length * 4; // 도라 표시패와 강까지 고려했을 때의 유효패 개수
    span.innerHTML = '';
    span.innerHTML += shanten + 'シャンテン';
    span.innerHTML += '<p>';
    for (let i = 0; i < validTiles.length; i++) {
        span.innerHTML += '<img src="img/' + validTiles[i] + '.png" height="40px" width="30px" />';
        ukeireMaisuu1 -= handTilesNum[types.indexOf(validTiles[i].charAt(1))][validTiles[i].charAt(0) - 1];
        ukeireMaisuu2 -= openedTilesNum[types.indexOf(validTiles[i].charAt(1))][validTiles[i].charAt(0) - 1];
    }
    span.innerHTML += '<p>';
    span.innerHTML += '受け入れ枚数: ' + ukeireMaisuu1 + '枚';
    span.innerHTML += '<p>';
    span.innerHTML += '受け入れ枚数(場況含め): ' + ukeireMaisuu2 + '枚';

    calculatedTile[index] = 1;
}

const calculateTilesForNextShanten = (newHand, nextShanten) => {
    const validTiles = [];

    for (let type = 0; type < 4; type++) {
        for (let num = 0; (type < 3 && num < 9) || (type == 3 && num < 7); num++) {
            if (openedTilesNum[type][num] >= 4) { continue; } // 이미 4장을 뽑은 패는 유효패를 계산하지 않음

            newHand.push((num + 1) + types[type]);
            if (calculateShanten(newHand) == nextShanten) { // 유효패일 때
                validTiles.push(newHand.pop());
            }
            else { // 유효패가 아닐 때
                newHand.pop();
            }
        }
    }

    return validTiles;
}

const printDora = () => {
    const table = document.getElementById('dora');
    const td = table.getElementsByTagName('td');

    table.innerHTML = '<tr><td>ドラ<br>表示牌</td><td /><td /><td /><td /><td /></tr>';

    for (let i = 0; i < dora.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', 'img/' + dora[i] + '.png');
        td[i + 1].appendChild(img);
    }

    for (let i = dora.length; i < 5; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', 'img/back.png');
        td[i + 1].appendChild(img);
    }
}

const checkKan = () => {
    let kanCheckHand = [];
    
    // 아카도라를 제거함
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].charAt(0) != '0') {
            kanCheckHand.push(hand[i]);
        }
        else {
            kanCheckHand.push('5' + hand[i].charAt(1));
        }
    }

    // 정렬하고 하면 하나만 짜도 되는데 귀찮음
    const table = document.getElementById('hand');
    const tr = document.createElement('tr');
    const td = [];

    for (let i = 0; i < kanCheckHand.length - 3; i++) {
        td.push(document.createElement('td'));
    }

    // 이미 정렬된 패들로 깡을 선언할 수 있는 경우
    for (let i = 0; i < kanCheckHand.length - 4; i++) {
        // 정렬된 패이므로 양 끝 두 장만 체크하면 됨
        if (kanCheckHand[i] == kanCheckHand[i + 3]) {
            td[i].innerText = 'カン';
            td[i].setAttribute('class', 'kan selectable');
            td[i].setAttribute('onclick', 'callKan(\'' + kanCheckHand[i] + '\')');
            i += 3;
        }
    }

    // 이미 정렬된 패에 안커가 있을 때 남은 한 장을 쯔모한 경우
    for (let i = 0; i < kanCheckHand.length - 3; i++) {
        // 정렬된 패이므로 양 끝 두 장만 체크하면 됨
        if (kanCheckHand[i] == kanCheckHand[i + 2] && kanCheckHand[i] == kanCheckHand[kanCheckHand.length - 1]) {
            td[i].innerText = 'カン';
            td[i].setAttribute('class', 'kan selectable');
            td[i].setAttribute('onclick', 'callKan(\'' + kanCheckHand[i] + '\')');
            break;
        }
    }

    for (let i = 0; i < hand.length - 3; i++) {
        tr.appendChild(td[i]);
    }
    table.appendChild(tr);
}

const callKan = (tile) => {
    // 깡을 선언한 네 개의 패를 제거함
    if (tile.charAt(0) == '5' && tile != '5z') {
        hand.splice(hand.indexOf('0' + tile.charAt(1)), 1);
    }
    else {
        hand.splice(hand.indexOf(tile), 1);
    }
    hand.splice(hand.indexOf(tile), 1);
    hand.splice(hand.indexOf(tile), 1);
    hand.splice(hand.indexOf(tile), 1);

    kan.push(tile);
    let open = tiles.pop();
    dora.push(open);
    countOpenedTiles(open);
    open = tiles.pop();
    hand.push(open);
    countOpenedTiles(open);

    printCurrentHand();
    printDora();
}

window.onload = function() {
    initialize();
    getFirstHand();
    printCurrentHand();
    printDora();
    /* for (let i = 0; i < hand.length; i++) {
        showNextHandInfo(i);
    } */
}