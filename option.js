let optionMode = 'normal';
let optionNum = 'random';

const optionInitialize = () => {
    document.getElementById('settings').addEventListener('click', function(e) {
        document.getElementsByClassName('option-container')[0].classList.add('show');
        e.stopPropagation();
    });

    document.getElementsByClassName('option-dialog')[0].addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.getElementsByClassName('option-container')[0].addEventListener('click', function() {
        this.classList.remove('show');
    })

    const table = document.getElementsByClassName('option-content')[0];
    const tr = table.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
        for (let j = 1; j < td.length; j++) {
            td[j].classList.add('option-element');
            if (j == 1) { td[j].classList.add('option-selected'); }
            td[j].addEventListener('click', function() {
                const td = this.parentNode.getElementsByTagName('td');
                for (let i = 1; i < td.length; i++) {
                    td[i].classList.remove('option-selected');
                }
                this.classList.add('option-selected');
            });
        }
    }

    // 언어별 텍스트 추가
    document.getElementById('opt-lang').appendChild(getOptionTermElement(0));
    document.getElementById('opt-mode').appendChild(getOptionTermElement(1));
    document.getElementById('opt-mode-normal').appendChild(getOptionTermElement(2));
    document.getElementById('opt-mode-honitu').appendChild(getOptionTermElement(3));
    document.getElementById('opt-mode-chinitu').appendChild(getOptionTermElement(4));
    document.getElementById('opt-num').appendChild(getOptionTermElement(5));
    document.getElementById('opt-num-random').appendChild(getOptionTermElement(6));
    document.getElementById('opt-num-man').appendChild(getOptionTermElement(7));
    document.getElementById('opt-num-pin').appendChild(getOptionTermElement(8));
    document.getElementById('opt-num-sou').appendChild(getOptionTermElement(9));
    
    // 이벤트 리스너 추가
    document.getElementById('opt-lang-kr').addEventListener('click', function() { switchLanguage('kr'); });
    document.getElementById('opt-lang-jp').addEventListener('click', function() { switchLanguage('jp'); });
    document.getElementById('opt-mode-normal').addEventListener('click', function() { switchMode('normal'); });
    document.getElementById('opt-mode-honitu').addEventListener('click', function() { switchMode('honitu'); });
    document.getElementById('opt-mode-chinitu').addEventListener('click', function() { switchMode('chinitu'); });
    document.getElementById('opt-num-random').addEventListener('click', function() { switchNum('random'); });
    document.getElementById('opt-num-man').addEventListener('click', function() { switchNum('man'); });
    document.getElementById('opt-num-pin').addEventListener('click', function() { switchNum('pin'); });
    document.getElementById('opt-num-sou').addEventListener('click', function() { switchNum('sou'); });
}

const switchMode = (mode) => {
    optionMode = mode;
    if (mode == 'normal') {
        document.getElementById('opt-num-row').classList.remove('show');
    }
    else {
        document.getElementById('opt-num-row').classList.add('show');
    }
}

const switchNum = (num) => {
    optionNum = num;
}
