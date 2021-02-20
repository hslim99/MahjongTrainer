let language = 'kr';

const terms = [
    {
        kr: "자풍",
        jp: "自風"
    },
    {
        kr: "장풍",
        jp: "場風"
    },
    {
        kr: "도라<br>표시패",
        jp: "ドラ<br>表示牌"
    },
    {
        kr: "쯔모",
        jp: "ツモ"
    },
    {
        kr: "깡",
        jp: "カン"
    },
    {
        kr: "샹텐",
        jp: "シャンテン"
    },
    {
        kr: "텐파이",
        jp: "テンパイ"
    },
    {
        kr: "유효패 매수",
        jp: "受け入れ枚数"
    },
    {
        kr: "유효패 매수(전체)",
        jp: "受け入れ枚数(場況含む)"
    },
    {
        kr: "장",
        jp: "枚"
    },
];

const optionTerms = [
    {
        kr: "언어",
        jp: "言語"
    },
    {
        kr: "모드",
        jp: "モード"
    },
    {
        kr: "일반",
        jp: "ノーマル"
    },
    {
        kr: "혼일색",
        jp: "ホンイツ"
    },
    {
        kr: "청일색",
        jp: "チンイツ"
    },
    {
        kr: "사용 수패",
        jp: "数牌のタイプ"
    },
    {
        kr: "무작위",
        jp: "ランダム"
    },
    {
        kr: "만수",
        jp: "萬子"
    },
    {
        kr: "통수",
        jp: "筒子"
    },
    {
        kr: "삭수",
        jp: "索子"
    }
]

const switchLanguage = (lang) => {
    if (lang === language) { return; }

    const oldLang = language;
    language = lang;

    const termStrings = document.getElementsByClassName('term');

    for (let i = 0; i < termStrings.length; i++) {
        const newTerm = terms.find(function(element) {
            return element[oldLang] === termStrings[i].innerHTML;
        })[language];

        termStrings[i].innerHTML = newTerm;
    }

    const optionTermStrings = document.getElementsByClassName('option-term');

    for (let i = 0; i < optionTermStrings.length; i++) {
        const newTerm = optionTerms.find(function(element) {
            return element[oldLang] === optionTermStrings[i].innerHTML;
        })[language];

        optionTermStrings[i].innerHTML = newTerm;
    }
}

const getTermElement = (index) => {
    const span = document.createElement('span');
    span.classList.add('term');
    span.innerHTML = terms[index][language];
    
    return span;
}

const getOptionTermElement = (index) => {
    const span = document.createElement('span');
    span.classList.add('option-term');
    span.innerHTML = optionTerms[index][language];
    
    return span;
}
