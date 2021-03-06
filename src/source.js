const tiles = [];
const hand = [];
const kawa = [];
const dora = [];
const kan = [];
const types = ['m', 'p', 's', 'z'];
const winds = ['東', '南', '西', '北'];
let openedTilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
let handTilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
let calculatedTile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let selected = -1; // for mobile devices
let numType = -1;
let myWind = '東';
let haitei = '南';
let leftTsumo = 18;

const detectMobile = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        return true;
    }

    if (/android/i.test(userAgent)) {
        return true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    {
        return true;
    } 
    
    return false;
}

const initialize = () => {
    numType = optionNum === 'random' ? Math.floor(Math.random() * 3) : optionNum === 'man' ? 0 : optionNum === 'pin' ? 1 : 2;

    for (let type = 0; type < 4; type++) {
        if (optionMode === 'numonly') {
            if (type == 3) { continue; }
        }
        else if (optionMode === 'honitu') {
            if (type != numType && type != 3) { continue; }
        }
        else if (optionMode === 'chinitu') {
            if (type != numType) { continue; };
        }

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
    
    for (let i = 0; i < tiles.length; i++) {
        let random = Math.floor(Math.random() * (tiles.length - i)) + i; // i 이상 tiles.length 미만의 난수 생성
        const temp = tiles[i];
        tiles[i] = tiles[random];
        tiles[random] = temp;
    }

    const leftTsumoTable = document.getElementById('left-tsumo');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let span = document.createElement('span');
    span.classList.add('left-tsumo-num');
    td.appendChild(getTermElement(0));
    td.appendChild(span);
    tr.appendChild(td);
    leftTsumoTable.appendChild(tr);
    myWind = winds[Math.floor(Math.random() * 4)];
    calculateLeftTsumo();

    const windTable = document.getElementById('wind');
    tr = document.createElement('tr');

    td = document.createElement('td');
    td.appendChild(getTermElement(1));
    td.innerHTML += '<br><span class="wind">' + myWind + '</span>';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.appendChild(getTermElement(2));
    td.innerHTML += '<br><span class="wind">' + winds[Math.floor(Math.random() * 2)] + '</span>';
    tr.appendChild(td);

    windTable.appendChild(tr);

    const kawaTable = document.getElementById('kawa');
    for (let i = 0; i < 3; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            const td = document.createElement('td');
            td.classList.add('tile-container');
            tr.appendChild(td);
        }
        kawaTable.appendChild(tr);
    }
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

    handTilesNum.splice(0, handTilesNum.length);
    handTilesNum.push([0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]);

    // 테이블의 구조: 정렬된 손패, 쯔모 표시, 쯔모 패, 깡 표시
    // 반복문 1: 손패
    for (let i = 0; i < hand.length; i++) {
        const td = document.createElement('td');

        if (i == hand.length - 1) {
            const space = document.createElement('td');
            space.appendChild(getTermElement(4));
            tr.appendChild(space);
        }

        const img = document.createElement('img');
        img.setAttribute('src', 'img/' + hand[i] + '.png');
        img.classList.add('selectable');
        if (detectMobile()) {
            img.addEventListener('click', function(e) {
                discardForMobile(i);
                removeAllHover();
                this.classList.add('hover');
                //e.stopPropagation();
            });
        }
        else {
            img.addEventListener('click', function() { discardTile(i); });
            img.addEventListener('mouseenter', function() { 
                this.classList.add('hover');
                showNextHandInfo(i, false);
            });
            img.addEventListener('mouseleave', function() { 
                this.classList.remove('hover');
            });
        }

        const span = document.createElement('span');
        span.classList.add('arrow-box');

        td.classList.add('arrow-container');
        td.classList.add('tile');
        if (detectMobile()) {
            td.addEventListener('click', function(e) {
                if (!optionShanten) { return; }

                const td = document.getElementsByClassName('arrow-container');
                for (let i = 0; i < td.length; i++) {
                    td[i].classList.remove('selected');
                }
                this.classList.add('selected');
                e.stopPropagation();
            });
        }
        else {
            td.addEventListener('mouseenter', function(e) {
                if (!optionShanten) { return; }

                const td = document.getElementsByClassName('arrow-container');
                for (let i = 0; i < td.length; i++) {
                    td[i].classList.remove('selected');
                }
                this.classList.add('selected');
                e.stopPropagation();
            });
            td.addEventListener('mouseleave', function() {
                this.classList.remove('selected');
            });
        }
        td.appendChild(img);
        td.appendChild(span);
        tr.appendChild(td);

        if (hand[i].charAt(0) != 0) {
            handTilesNum[types.indexOf(hand[i].charAt(1))][hand[i].charAt(0) - 1]++;
        }
        else {
            handTilesNum[types.indexOf(hand[i].charAt(1))][4]++;
        }
    }

    // 반복문 2: 깡 표시
    for (let i = 0; i < kan.length; i++) {
        const span = document.createElement('span');
        span.setAttribute('style', 'width: 10px; display: inline-block');
        tr.appendChild(span);

        let img = document.createElement('img');
        let td = document.createElement('td');
        img.setAttribute('src', 'img/back.png');
        td.classList.add('tile-container');
        td.appendChild(img);
        tr.appendChild(td);
        
        img = document.createElement('img');
        td = document.createElement('td');
        img.setAttribute('src', 'img/' + kan[i] + '.png');
        td.classList.add('tile-container');
        td.appendChild(img);
        tr.appendChild(td);

        img = document.createElement('img');
        td = document.createElement('td');
        if (kan[i].charAt(0) == '0') {
            img.setAttribute('src', 'img/5' + kan[i].charAt(1) + '.png');
        }
        else {
            img.setAttribute('src', 'img/' + kan[i] + '.png');
        }
        td.classList.add('tile-container');
        td.appendChild(img);
        tr.appendChild(td);
        
        img = document.createElement('img');
        td = document.createElement('td');
        img.setAttribute('src', 'img/back.png');
        td.classList.add('tile-container');
        td.appendChild(img);
        tr.appendChild(td);

        handTilesNum[types.indexOf(kan[i].charAt(1))][kan[i].charAt(0) - 1]++;
    }

    table.appendChild(tr);

    checkKan();
}

// 패를 버리면서 버림패를 출력하는 함수
const discardTile = (index) => {
    // 남은 패가 없거나 남은 쯔모가 없으면 계산하지 않음
    if (!leftTsumo || !tiles.length) { return; }

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

    calculateLeftTsumo();
    printCurrentHand();
}

const showNextHandInfo = (index, kanFlag) => {
    if (!optionShanten) { return; }

    const newHand = [...hand];

    if (!kanFlag) {
        if (calculatedTile[index] == 1 || calculatedTile[index] == 3) { return; }

        newHand.splice(index, 1);
    }
    else {
        if (calculatedTile[index] == 2 || calculatedTile[index] == 3) { return; }
        const tile = newHand[index];

        // 깡을 선언한 네 개의 패를 제거함
        if (tile.charAt(0) == '0') {
            newHand.splice(newHand.indexOf(tile), 1);
            newHand.splice(newHand.indexOf('5' + tile.charAt(1)), 1);
            newHand.splice(newHand.indexOf('5' + tile.charAt(1)), 1);
            newHand.splice(newHand.indexOf('5' + tile.charAt(1)), 1);
        }
        else {
            newHand.splice(newHand.indexOf(tile), 1);
            newHand.splice(newHand.indexOf(tile), 1);
            newHand.splice(newHand.indexOf(tile), 1);
            newHand.splice(newHand.indexOf(tile), 1);
        }
    
        kan.push(tile);
    }

    const shanten = calculateShanten(newHand);
    const validTiles = calculateTilesForNextShanten(newHand, shanten - 1).validTiles;
    /* const ryanmenTiles = calculateTilesForNextShanten(newHand, shanten - 1).ryanmenTiles; */

    // 기본 유효패
    const table = document.getElementById('hand');
    const tr = table.getElementsByTagName('tr')[!kanFlag ? 0 : 1];
    const td = tr.getElementsByTagName('td')[index < hand.length - 1 ? index : index + 1];
    const span = td.lastChild;
    let ukeireMaisuu1 = validTiles.length * 4; // 손패만을 고려했을 때의 유효패 개수
    let ukeireMaisuu2 = validTiles.length * 4; // 도라 표시패와 강까지 고려했을 때의 유효패 개수
    span.innerHTML = '';
    if (shanten) {
        span.innerHTML += shanten;
        span.appendChild(getTermElement(6));
    }
    else {
        span.appendChild(getTermElement(7));
    }
    span.appendChild(document.createElement('p'));
    for (let i = 0; i < validTiles.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', 'img/' + validTiles[i] + '.png');
        img.setAttribute('height', '40px');
        img.setAttribute('width', '30px');
        span.appendChild(img);
        ukeireMaisuu1 -= handTilesNum[types.indexOf(validTiles[i].charAt(1))][validTiles[i].charAt(0) - 1];
        ukeireMaisuu2 -= openedTilesNum[types.indexOf(validTiles[i].charAt(1))][validTiles[i].charAt(0) - 1];
    }
    span.appendChild(document.createElement('p'));
    span.appendChild(getTermElement(8));
    span.innerHTML += ': ' + ukeireMaisuu1;
    span.appendChild(getTermElement(10));
    span.appendChild(document.createElement('p'));
    span.appendChild(getTermElement(9));
    span.innerHTML += ': ' + ukeireMaisuu2;
    span.appendChild(getTermElement(10));

    /* // 이샹텐의 양면 유효패
    if (shanten == 1) {
        ukeireMaisuu1 = ryanmenTiles.length * 4; // 손패만을 고려했을 때의 유효패 개수
        ukeireMaisuu2 = ryanmenTiles.length * 4; // 도라 표시패와 강까지 고려했을 때의 유효패 개수
        span.appendChild(document.createElement('p'));
        for (let i = 0; i < ryanmenTiles.length; i++) {
            const img = document.createElement('img');
            img.setAttribute('src', 'img/' + ryanmenTiles[i] + '.png');
            img.setAttribute('height', '40px');
            img.setAttribute('width', '30px');
            span.appendChild(img);
            ukeireMaisuu1 -= handTilesNum[types.indexOf(ryanmenTiles[i].charAt(1))][ryanmenTiles[i].charAt(0) - 1];
            ukeireMaisuu2 -= openedTilesNum[types.indexOf(ryanmenTiles[i].charAt(1))][ryanmenTiles[i].charAt(0) - 1];
        }
        span.appendChild(document.createElement('p'));
        span.appendChild(getTermElement(8));
        span.innerHTML += ': ' + ukeireMaisuu1;
        span.appendChild(getTermElement(10));
        span.appendChild(document.createElement('p'));
        span.appendChild(getTermElement(9));
        span.innerHTML += ': ' + ukeireMaisuu2;
        span.appendChild(getTermElement(10));
    } */

    if (!kanFlag) {
        calculatedTile[index]++;
    }
    else {
        calculatedTile[index] += 2;
        kan.pop();
    }
}

const discardForMobile = (index) => {
    if (selected != index) {
        selected = index;
        showNextHandInfo(index, false);
    }
    else {
        discardTile(index);
        selected = -1;
        
        const selectable = document.getElementsByClassName('selectable');
        for (let i = 0; i < selected.length; i++) {
            selectable[i].classList.remove('hover');
        }
    }
}

const kanForMobile = (index) => {
    if (selected != (100 + index)) {
        showNextHandInfo(index, true);
        selected = 100 + index;
    }
    else {
        callKan(index);
        selected = -1;
        removeAllHover();
    }
}

const removeAllHover = () => {
    const selectable = document.getElementsByClassName('selectable');
    for (let i = 0; i < selectable.length; i++) {
        selectable[i].classList.remove('hover');
    }
}

// 유효패 계산 함수
const calculateTilesForNextShanten = (newHand, nextShanten) => {
    const validTiles = [];
    const ryanmenTiles = [];

    for (let type = 0; type < 4; type++) {
        for (let num = 0; (type < 3 && num < 9) || (type == 3 && num < 7); num++) {
            //if (openedTilesNum[type][num] >= 4) { continue; } // 이미 4장을 뽑은 패는 유효패를 계산하지 않음
            if (handTilesNum[type][num] >= 4 || kan.indexOf((num + 1) + types[type]) >= 0) { continue; } // 두 가지의 유효패 계산식이 있어서 위 한 줄 대신 이것으로 대체

            newHand.push((num + 1) + types[type]);
            if (calculateShanten(newHand) == nextShanten) { // 유효패일 때
                validTiles.push(newHand.pop());
                /* if (isLastTaatsuRyanmen) {
                    ryanmenTiles.push(validTiles[validTiles.length - 1]);
                } */
            }
            else { // 유효패가 아닐 때
                newHand.pop();
            }
        }
    }
    
    return { validTiles: validTiles, ryanmenTiles: ryanmenTiles };
}

const printDora = () => {
    const table = document.getElementById('dora');
    table.innerHTML = '';
    
    const tr = document.createElement('tr');

    let td = document.createElement('td');
    td.appendChild(getTermElement(3));
    tr.appendChild(td);

    // 표시된 도라 표시패
    for (let i = 0; i < dora.length; i++) {
        const img = document.createElement('img');
        const td = document.createElement('td');
        img.setAttribute('src', 'img/' + dora[i] + '.png');
        td.classList.add('tile.container');
        td.appendChild(img);
        tr.appendChild(td);
    }

    // 표시되지 않은 도라 표시패 = 5 - 표시된 도라 표시패
    for (let i = dora.length; i < 5; i++) {
        const img = document.createElement('img');
        const td = document.createElement('td');
        img.setAttribute('src', 'img/back.png');
        td.appendChild(img);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

const checkKan = () => {
    // 남은 패가 없거나 남은 쯔모가 없다면 계산하지 않고 테이블만 작성
    if ((!leftTsumo && myWind === haitei) || !tiles.length) { 
        const table = document.getElementById('hand');
        const tr = document.createElement('tr');
        tr.appendChild(document.createElement('td'));
        table.appendChild(tr);
        return;
    }

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
            const div = document.createElement('div');
            div.classList.add('selectable');
            div.appendChild(getTermElement(5));

            if (detectMobile()) {
                div.addEventListener('click', function(e) {
                    kanForMobile(i);
                    removeAllHover();
                    this.classList.add('hover');
                    //e.stopPropagation();
                });
            }
            else {
                div.addEventListener('click', function() { callKan(i); });
                div.addEventListener('mouseenter', function() {
                    showNextHandInfo(i, true);
                    this.classList.add('hover');
                });
                div.addEventListener('mouseleave', function() {
                    this.classList.remove('hover');
                })
            }

            const span = document.createElement('span');
            span.classList.add('arrow-box');

            td[i].classList.add('arrow-container');
            td[i].classList.add('kan');
            if (detectMobile()) {
                td[i].addEventListener('click', function(e) {
                    if (!optionShanten) { return; }

                    const td = document.getElementsByClassName('arrow-container');
                    for (let i = 0; i < td.length; i++) {
                        td[i].classList.remove('selected');
                    }
                    this.classList.add('selected');
                    e.stopPropagation();
                });
            }
            else {
                td[i].addEventListener('mouseenter', function(e) {
                    if (!optionShanten) { return; }

                    const td = document.getElementsByClassName('arrow-container');
                    for (let i = 0; i < td.length; i++) {
                        td[i].classList.remove('selected');
                    }
                    this.classList.add('selected');
                    e.stopPropagation();
                });
                div.addEventListener('mouseleave', function() {
                    this.classList.remove('selected');
                });
            }

            td[i].appendChild(div);
            td[i].appendChild(span);
            //i += 3;
        }
    }

    // 이미 정렬된 패에 안커가 있을 때 남은 한 장을 쯔모한 경우
    for (let i = 0; i < kanCheckHand.length - 3; i++) {
        // 정렬된 패이므로 양 끝 두 장만 체크하면 됨
        if (kanCheckHand[i] == kanCheckHand[i + 2] && kanCheckHand[i] == kanCheckHand[kanCheckHand.length - 1]) {
            const div = document.createElement('div');
            div.classList.add('selectable');
            div.appendChild(getTermElement(5));

            if (detectMobile()) {
                div.addEventListener('click', function(e) {
                    kanForMobile(i);
                    removeAllHover();
                    this.classList.add('hover');
                    //e.stopPropagation();
                });
            }
            else {
                div.addEventListener('click', function() { callKan(i); });
                div.addEventListener('mouseenter', function() {
                    showNextHandInfo(i, true);
                    this.classList.add('hover');
                });
                div.addEventListener('mouseleave', function() {
                    this.classList.remove('hover');
                })
            }

            const span = document.createElement('span');
            span.classList.add('arrow-box');

            td[i].classList.add('arrow-container');
            td[i].classList.add('kan');
            if (detectMobile()) {
                div.addEventListener('click', function(e) {
                    if (!optionShanten) { return; }

                    const td = document.getElementsByClassName('arrow-container');
                    for (let i = 0; i < td.length; i++) {
                        td[i].classList.remove('selected');
                    }
                    this.classList.add('selected');
                    e.stopPropagation();
                });
            }
            else {
                div.addEventListener('mouseenter', function(e) {
                    if (!optionShanten) { return; }

                    const td = document.getElementsByClassName('arrow-container');
                    for (let i = 0; i < td.length; i++) {
                        td[i].classList.remove('selected');
                    }
                    this.classList.add('selected');
                    e.stopPropagation();
                });
                div.addEventListener('mouseleave', function() {
                    this.classList.remove('selected');
                });
            }

            td[i].appendChild(div);
            td[i].appendChild(span);
            break;
        }
    }

    for (let i = 0; i < hand.length - 3; i++) {
        tr.appendChild(td[i]);
    }
    table.appendChild(tr);
}

const calculateLeftTsumo = () => {
    let _leftTsumo = 18;

    switch (myWind) {
        case "東":
            _leftTsumo -= kan.length < 2 ? kawa.length : kawa.length + 1;
            break;
        case "南":
            _leftTsumo -= kan.length < 1 ? kawa.length : kawa.length + 1;
            break;
        case "西":
            _leftTsumo -= kan.length < 4 ? kawa.length + 1 : kawa.length + 2;
            break;
        case "北":
            _leftTsumo -= kan.length < 3 ? kawa.length + 1: kawa.length + 2;
            break;
    }

    haitei = winds[(5 - kan.length) % 4];

    const leftTsumoTable = document.getElementById('left-tsumo');
    const span = leftTsumoTable.getElementsByClassName('left-tsumo-num')[0];
    span.innerHTML = _leftTsumo;
    leftTsumo = _leftTsumo;
}

const callKan = (index) => {
    const tile = hand[index];
    // 깡을 선언한 네 개의 패를 제거함
    if (tile.charAt(0) == '0') {
        hand.splice(hand.indexOf(tile), 1);
        hand.splice(hand.indexOf('5' + tile.charAt(1)), 1);
        hand.splice(hand.indexOf('5' + tile.charAt(1)), 1);
        hand.splice(hand.indexOf('5' + tile.charAt(1)), 1);
    }
    else {
        hand.splice(hand.indexOf(tile), 1);
        hand.splice(hand.indexOf(tile), 1);
        hand.splice(hand.indexOf(tile), 1);
        hand.splice(hand.indexOf(tile), 1);
    }

    kan.push(tile);
    let open = tiles.pop();
    dora.push(open);
    countOpenedTiles(open);
    open = tiles.pop();
    hand.push(open);
    countOpenedTiles(open);

    calculatedTile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    calculateLeftTsumo();
    printCurrentHand();
    printDora();
}

const newGame = () => {
    const leftTsumoTable = document.getElementById('left-tsumo');
    leftTsumoTable.innerHTML = '';
    const windTable = document.getElementById('wind');
    windTable.innerHTML = '';
    const kawaTable = document.getElementById('kawa');
    kawaTable.innerHTML = '';

    tiles.splice(0);
    hand.splice(0);
    kawa.splice(0);
    dora.splice(0);
    kan.splice(0);
    openedTilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
    handTilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
    calculatedTile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    if (detectMobile()) {
        document.body.addEventListener('click', function() {
            const td = document.getElementsByClassName('arrow-container');
            for (let i = 0; i < td.length; i++) {
                td[i].classList.add('arrow-container');
                td[i].classList.add('tile');
            }
            selected = -1;
        });
    }

    initialize();
    getFirstHand();
    printCurrentHand();
    printDora();
}

window.onload = function() {
    optionInitialize();
    newGame();
}
