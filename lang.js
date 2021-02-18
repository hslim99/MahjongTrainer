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
}
