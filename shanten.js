let tilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
let toitsuNum = 0;
let toitsuTile = [];
let mentsuNum = kan.length;
let taatsuNum = 0;
let shanten = 6;
let isolatedMentsuNum = 0;

const calculateShanten = (newHand) => {
    tilesNum = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
    toitsuNum = 0;
    toitsuTile.splice(0, toitsuTile.length);
    mentsuNum = kan.length;
    taatsuNum = 0;
    shanten = 6;

    // tilesNum에 현재 hand를 정리
    for (let i = 0; i < newHand.length; i++) {
        if (newHand[i].charAt(0) != 0) {
            tilesNum[types.indexOf(newHand[i].charAt(1))][newHand[i].charAt(0) - 1]++;
        }
        else {
            tilesNum[types.indexOf(newHand[i].charAt(1))][4]++;
        }
    }

    const _tilesNumForSpecialHand = [[...tilesNum[0]], [...tilesNum[1]], [...tilesNum[2]], [...tilesNum[3]]]; // 치또이쯔와 국사무쌍 계산에 씀

    isolatedMentsuNum = 0;
    checkIsolatedMentsu();

    const _tilesNum = [[...tilesNum[0]], [...tilesNum[1]], [...tilesNum[2]], [...tilesNum[3]]]; // 일반 패 계산에 씀

    // 머리가 있을 때: 머리를 뺌 -> 커쯔를 뺌 -> 슌쯔를 뺌 -> 타쯔 후보를 뺌
    for (let type = 0; type < 4; type++) {
        for (let num = 0; (type < 3 && num < 9) || (type == 3 && num < 7); num++) {
            for (let addend = 0; addend < 8; addend++) {
                tilesNum = [[..._tilesNum[0]], [..._tilesNum[1]], [..._tilesNum[2]], [..._tilesNum[3]]];
                toitsuNum = 0;
                toitsuTile.splice(0, toitsuTile.length);
                mentsuNum = kan.length;
                taatsuNum = 0;

                if (tilesNum[type][num] >= 2) { // (type, num)에 머리가 있다고 판단
                    tilesNum[type][num] -= 2; // (type, num)에서 머리를 뺀다
                    toitsuNum++;
                    toitsuTile.push(type, num);

                    checkMentsuTaatsu1(0, addend); // 만수의 멘쯔와 타쯔 체크
                    checkMentsuTaatsu1(1, addend); // 통수의 멘쯔와 타쯔 체크
                    checkMentsuTaatsu1(2, addend); // 삭수의 멘쯔와 타쯔 체크
                    checkCharactersMentsuTaatsu(); // 자패의 멘쯔와 타쯔 체크
                    shanten = shanten < shantenFormula() ? shanten : shantenFormula(); // 최소 샹텐 수 갱신
                }
            }
        }
    }

    // 머리가 있을 때: 머리를 뺌 -> 슌쯔를 뺌 -> 커쯔를 뺌 -> 타쯔 후보를 뺌
    for (let type = 0; type < 4; type++) {
        for (let num = 0; (type < 3 && num < 9) || (type == 3 && num < 7); num++) {
            for (let addend = 0; addend < 8; addend++) {
                tilesNum = [[..._tilesNum[0]], [..._tilesNum[1]], [..._tilesNum[2]], [..._tilesNum[3]]];
                toitsuNum = 0;
                toitsuTile.splice(0, toitsuTile.length);
                mentsuNum = kan.length;
                taatsuNum = 0;

                if (tilesNum[type][num] >= 2) { // (type, num)에 머리가 있다고 판단
                    tilesNum[type][num] -= 2; // (type, num)에서 머리를 뺀다
                    toitsuNum++;
                    toitsuTile.push(type, num);

                    checkMentsuTaatsu2(0, addend); // 만수의 멘쯔와 타쯔 체크
                    checkMentsuTaatsu2(1, addend); // 통수의 멘쯔와 타쯔 체크
                    checkMentsuTaatsu2(2, addend); // 삭수의 멘쯔와 타쯔 체크
                    checkCharactersMentsuTaatsu(); // 자패의 멘쯔와 타쯔 체크
                    shanten = shanten < shantenFormula() ? shanten : shantenFormula(); // 최소 샹텐 수 갱신
                }
            }
        }
    }

    // 머리가 없을 때: 커쯔를 뺌 -> 슌쯔를 뺌 -> 타쯔 후보를 뺌
    for (let type = 0; type < 4; type++) {
        for (let num = 0; (type < 3 && num < 9) || (type == 3 && num < 7); num++) {
            for (let addend = 0; addend < 8; addend++) {
                tilesNum = [[..._tilesNum[0]], [..._tilesNum[1]], [..._tilesNum[2]], [..._tilesNum[3]]];
                toitsuNum = 0;
                toitsuTile.splice(0, toitsuTile.length);
                mentsuNum = kan.length;
                taatsuNum = 0;

                checkMentsuTaatsu1(0, addend); // 만수의 멘쯔와 타쯔 체크
                checkMentsuTaatsu1(1, addend); // 통수의 멘쯔와 타쯔 체크
                checkMentsuTaatsu1(2, addend); // 삭수의 멘쯔와 타쯔 체크
                checkCharactersMentsuTaatsu(); // 자패의 멘쯔와 타쯔 체크

                // 5장째의 단기 대기를 하는 경우 방지
                for (let _type = 0; _type < 4; _type++) {
                    for (let _num = 0; (_type < 3 && _num < 9) || (_type == 3 && _num < 7); _num++) {
                        if (tilesNum[_type][_num] == 1 && _tilesNum[_type][_num] == 4) {
                            taatsuNum--;
                        }
                    }
                }

                shanten = shanten < shantenFormula() ? shanten : shantenFormula(); // 최소 샹텐 수 갱신
            }
        }
    }

    isolatedMentsuNum = 0;

    // 치또이쯔의 경우
    tilesNum = [[..._tilesNumForSpecialHand[0]], [..._tilesNumForSpecialHand[1]], [..._tilesNumForSpecialHand[2]], [..._tilesNumForSpecialHand[3]]];
    toitsuNum = 0;
    toitsuTile.splice(0, toitsuTile.length);
    mentsuNum = kan.length;
    taatsuNum = 0;
    for (let type = 0; type < 4; type++) {
        for (let num = 0; (type < 3 && num < 9) || (type == 3 && num < 7); num++) { 
            if (tilesNum[type][num] >= 2) { // (type, num)에 머리가 있다고 판단
                tilesNum[type][num] -= 2; // (type, num)에서 머리를 뺀다
                toitsuNum++;
            }
        }
    }
    shanten = shanten < 6 - toitsuNum ? shanten : 6 - toitsuNum; // 최소 샹텐 수 갱신

    // 국사무쌍의 경우
    tilesNum = [[..._tilesNumForSpecialHand[0]], [..._tilesNumForSpecialHand[1]], [..._tilesNumForSpecialHand[2]], [..._tilesNumForSpecialHand[3]]];
    toitsuNum = 0;
    toitsuTile.splice(0, toitsuTile.length);
    mentsuNum = kan.length;
    taatsuNum = 0;
    kokushiCount = 0;
    
    // 이하의 반복문에서 또이쯔를 찾으면 또이쯔의 카운트를 늘림
    for (let type = 0; type < 4; type++) {
        if (type < 3) { // 노두패를 셈
            if (tilesNum[type][0] == 1) { kokushiCount++; }
            else if (tilesNum[type][0] > 1) { toitsuNum++; }
            if (tilesNum[type][8] == 1) { kokushiCount++; }
            else if (tilesNum[type][8] > 1) { toitsuNum++; }
        }
        else { // 자패를 셈
            for (let num = 0; num < 7; num++) {
                if (tilesNum[type][num] == 1) { kokushiCount++; }
                else if (tilesNum[type][num] > 1) { toitsuNum++; }
            }
        }
    }
    if (toitsuNum) { kokushiCount++; } // 또이쯔가 있었다면 국사 카운트를 늘림
    shanten = shanten < 13 - kokushiCount ? shanten : 13 - kokushiCount; // 최소 샹텐 수 갱신

    /* const h1 = document.getElementById("shanten");
    h1.innerText = '';
    for (let i = 0; i < newHand.length; i++) { h1.innerText += newHand[i]; }
    for (let i = 0; i < kan.length; i++) { h1.innerText += ' ' + kan[i] + 'カン'; } */
    
    /* const textArea = document.createElement('textarea');
    textArea.value = h1.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea); */

    // h1.innerText += '\nシャンテン数: ' + shanten;

    //example(_tilesNum);

    tilesNum = [[..._tilesNumForSpecialHand[0]], [..._tilesNumForSpecialHand[1]], [..._tilesNumForSpecialHand[2]], [..._tilesNumForSpecialHand[3]]];

    return shanten;
}

const shantenFormula = () => {
    let newShanten = 0;

    if (isolatedMentsuNum + mentsuNum + taatsuNum <= 4) { // 타쯔 오버가 아닌 경우
        newShanten = 8 - (isolatedMentsuNum + mentsuNum) * 2 - taatsuNum - toitsuNum;
    }
    else { // 타쯔 오버인 경우
        newShanten = 8 - (isolatedMentsuNum + mentsuNum) * 2 - (4 - (isolatedMentsuNum + mentsuNum)) - toitsuNum;
    }

    return newShanten;
}

// 커쯔를 먼저 체크함
const checkMentsuTaatsu1 = (type, addend) => {
    // 커쯔 체크
    for (let i = 0; i < 9; i++) {
        if (tilesNum[type][i] >= 3) { 
            tilesNum[type][i] -= 3;
            mentsuNum++;
        }
    }

    // 슌쯔 체크 1
    for (let i = 0; i < 7; i++) {
        while (tilesNum[type][i + addend] * tilesNum[type][i + 1 + addend] * tilesNum[type][i + 2 + addend]) {
            tilesNum[type][i + addend]--;
            tilesNum[type][i + 1 + addend]--;
            tilesNum[type][i + 2 + addend]--;
            mentsuNum++;
        }
    }

    // 슌쯔 체크 2
    if (addend > 2) {
        for (let i = 0; i < 7; i++) {
            while (tilesNum[type][i] * tilesNum[type][i + 1] * tilesNum[type][i + 2]) {
                tilesNum[type][i]--;
                tilesNum[type][i + 1]--;
                tilesNum[type][i + 2]--;
                mentsuNum++;
            }
        }
    }

    // 타쯔 체크
    for (let i = 0; i < 9; i++) {
        // 또이쯔 체크
        if (tilesNum[type][i] >= 2 && !(type == toitsuTile[0] && i == toitsuTile[1])) {
            tilesNum[type][i] -= 2;
            taatsuNum++;
        }

        if (i == 8) { continue; }

        // 양면과 변짱 타쯔 체크
        if (tilesNum[type][i] * tilesNum[type][i + 1]) {
            tilesNum[type][i]--;
            tilesNum[type][i + 1]--;
            taatsuNum++;
        }

        if (i == 7) { continue; }

        // 간짱 타쯔 체크
        if (tilesNum[type][i] * tilesNum[type][i + 2]) {
            tilesNum[type][i]--;
            tilesNum[type][i + 2]--;
            taatsuNum++;
        }
    }
}

// 슌쯔를 먼저 체크함
const checkMentsuTaatsu2 = (type, addend) => {
    // 슌쯔 체크 1
    for (let i = 0; i < 7; i++) {
        while (tilesNum[type][i + addend] * tilesNum[type][i + 1 + addend] * tilesNum[type][i + 2 + addend]) {
            tilesNum[type][i + addend]--;
            tilesNum[type][i + 1 + addend]--;
            tilesNum[type][i + 2 + addend]--;
            mentsuNum++;
        }
    }

    // 슌쯔 체크 2
    if (addend > 2) {
        for (let i = 0; i < 7; i++) {
            while (tilesNum[type][i] * tilesNum[type][i + 1] * tilesNum[type][i + 2]) {
                tilesNum[type][i]--;
                tilesNum[type][i + 1]--;
                tilesNum[type][i + 2]--;
                mentsuNum++;
            }
        }
    }

    // 커쯔 체크
    for (let i = 0; i < 9; i++) {
        if (tilesNum[type][i] >= 3) { 
            tilesNum[type][i] -= 3;
            mentsuNum++;
        }
    }

    // 타쯔 체크
    for (let i = 0; i < 9; i++) {
        // 또이쯔 체크
        if (tilesNum[type][i] >= 2 && !(type == toitsuTile[0] && i == toitsuTile[1])) {
            tilesNum[type][i] -= 2;
            taatsuNum++;
        }

        if (i == 8) { continue; }

        // 양면과 변짱 타쯔 체크
        if (tilesNum[type][i] * tilesNum[type][i + 1]) {
            tilesNum[type][i]--;
            tilesNum[type][i + 1]--;
            taatsuNum++;
        }

        if (i == 7) { continue; }

        // 간짱 타쯔 체크
        if (tilesNum[type][i] * tilesNum[type][i + 2]) {
            tilesNum[type][i]--;
            tilesNum[type][i + 2]--;
            taatsuNum++;
        }
    }
}

// 자패에 대해 체크하는 경우
const checkCharactersMentsuTaatsu = () => {
    // 커쯔 체크
    // 마작은 한 종류의 패가 4장밖에 없으므로
    // 한 종류의 패에서 커쯔와 또이쯔가 동시에 나올 수 없음
    for (let i = 0; i < 7; i++) {
        if (tilesNum[3][i] >= 3) { // 3개 이상이면 커쯔
            tilesNum[3][i] -= 3;
            mentsuNum++;
        }
        else if (tilesNum[3][i] >= 2 && !(3 == toitsuTile[0] && i == toitsuTile[1])) { // 2개면 타쯔(또이쯔)
            tilesNum[3][i] -= 2;
            taatsuNum++;
        }
    }
}

// 고립된 멘쯔를 찾는다
// 치또이쯔와는 별개로 일반적인 형태의 패에서만 다룰 예정
const checkIsolatedMentsu = () => {
    // 고립된 수패 커쯔 체크
    for (let type = 0; type < 3; type++) {
        for (let num = 0; num < 9; num++) {
            if (num == 0) { // 111 커쯔
                if (tilesNum[type][num] == 3 && !tilesNum[type][num + 1]) {
                    tilesNum[type][num] -= 3;
                    isolatedMentsuNum++;
                }
            }
            else if (0 < num && num <= 7) { // 222~888 커쯔
                if (!tilesNum[type][num - 1] && tilesNum[type][num] == 3 && !tilesNum[type][num + 1]) {
                    tilesNum[type][num] -= 3;
                    isolatedMentsuNum++;
                }
            }
            else { // 999 커쯔
                if (!tilesNum[type][num - 1] && tilesNum[type][num] == 3) {
                    tilesNum[type][num] -= 3;
                    isolatedMentsuNum++;
                }
            }
        }
    }

    // 고립된 자패 커쯔 체크
    for (let num = 0; num < 7; num++) {
        if (tilesNum[3][num] == 3) {
            tilesNum[3][num] -= 3;
            isolatedMentsuNum++;
        }
    }

    // 고립된 수패 슌쯔 체크 (두 개)
    for (let type = 0; type < 3; type++) {
        for (let num = 0; num < 7; num++) {
            if (num == 0) { // 123XX
                if (tilesNum[type][num] == 2 && tilesNum[type][num + 1] == 2 && tilesNum[type][num + 2] == 2 && !tilesNum[type][num + 3] && !tilesNum[type][num + 4]) {
                    tilesNum[type][num] -= 2;
                    tilesNum[type][num + 1] -= 2;
                    tilesNum[type][num + 2] -= 2;
                    isolatedMentsuNum += 2;
                }
            }
            else if (num == 1) { // X234XX
                if (!tilesNum[type][num - 1] && tilesNum[type][num] == 2 && tilesNum[type][num + 1] == 2 && tilesNum[type][num + 2] == 2 && !tilesNum[type][num + 3] && !tilesNum[type][num + 4]) {
                    tilesNum[type][num] -= 2;
                    tilesNum[type][num + 1] -= 2;
                    tilesNum[type][num + 2] -= 2;
                    isolatedMentsuNum += 2;
                }
            }
            else if (1 < num && num <= 4) { // XX345XX ~ XX567XX
                if (!tilesNum[type][num - 2] && !tilesNum[type][num - 1] && tilesNum[type][num] == 2 && tilesNum[type][num + 1] == 2 && tilesNum[type][num + 2] == 2 && !tilesNum[type][num + 3] && !tilesNum[type][num + 4]) {
                    tilesNum[type][num] -= 2;
                    tilesNum[type][num + 1] -= 2;
                    tilesNum[type][num + 2] -= 2;
                    isolatedMentsuNum += 2;
                }
            }
            else if (num == 5) { // XX678X
                if (!tilesNum[type][num - 2] && !tilesNum[type][num - 1] && tilesNum[type][num] == 2 && tilesNum[type][num + 1] == 2 && tilesNum[type][num + 2] == 2 && !tilesNum[type][num + 3]) {
                    tilesNum[type][num] -= 2;
                    tilesNum[type][num + 1] -= 2;
                    tilesNum[type][num + 2] -= 2;
                    isolatedMentsuNum += 2;
                }
            }
            else { // XX789
                if (!tilesNum[type][num - 2] && !tilesNum[type][num - 1] && tilesNum[type][num] == 2 && tilesNum[type][num + 1] == 2 && tilesNum[type][num + 2] == 2) {
                    tilesNum[type][num] -= 2;
                    tilesNum[type][num + 1] -= 2;
                    tilesNum[type][num + 2] -= 2;
                    isolatedMentsuNum += 2;
                }
            }
        }
    }

    // 고립된 수패 슌쯔 체크 (한 개)
    for (let type = 0; type < 3; type++) {
        for (let num = 0; num < 7; num++) {
            if (num == 0) { // 123XX
                if (tilesNum[type][num] == 1 && tilesNum[type][num + 1] == 1 && tilesNum[type][num + 2] == 1 && !tilesNum[type][num + 3] && !tilesNum[type][num + 4]) {
                    tilesNum[type][num]--;
                    tilesNum[type][num + 1]--;
                    tilesNum[type][num + 2]--;
                    isolatedMentsuNum++;
                }
            }
            else if (num == 1) { // X234XX
                if (!tilesNum[type][num - 1] && tilesNum[type][num] == 1 && tilesNum[type][num + 1] == 1 && tilesNum[type][num + 2] == 1 && !tilesNum[type][num + 3] && !tilesNum[type][num + 4]) {
                    tilesNum[type][num]--;
                    tilesNum[type][num + 1]--;
                    tilesNum[type][num + 2]--;
                    isolatedMentsuNum++;
                }
            }
            else if (1 < num && num <= 4) { // XX345XX ~ XX567XX
                if (!tilesNum[type][num - 2] && !tilesNum[type][num - 1] && tilesNum[type][num] == 1 && tilesNum[type][num + 1] == 1 && tilesNum[type][num + 2] == 1 && !tilesNum[type][num + 3] && !tilesNum[type][num + 4]) {
                    tilesNum[type][num]--;
                    tilesNum[type][num + 1]--;
                    tilesNum[type][num + 2]--;
                    isolatedMentsuNum++;
                }
            }
            else if (num == 5) { // XX678X
                if (!tilesNum[type][num - 2] && !tilesNum[type][num - 1] && tilesNum[type][num] == 1 && tilesNum[type][num + 1] == 1 && tilesNum[type][num + 2] == 1 && !tilesNum[type][num + 3]) {
                    tilesNum[type][num]--;
                    tilesNum[type][num + 1]--;
                    tilesNum[type][num + 2]--;
                    isolatedMentsuNum++;
                }
            }
            else { // XX789
                if (!tilesNum[type][num - 2] && !tilesNum[type][num - 1] && tilesNum[type][num] == 1 && tilesNum[type][num + 1] == 1 && tilesNum[type][num + 2] == 1) {
                    tilesNum[type][num]--;
                    tilesNum[type][num + 1]--;
                    tilesNum[type][num + 2]--;
                    isolatedMentsuNum++;
                }
            }
        }
    }
}