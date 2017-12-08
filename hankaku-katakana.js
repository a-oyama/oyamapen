function validateSentence(sentence) {

    // カタカナ
    // カタカナは「全角」で表記します。
    var terms = [
        {
            'expected':'[ァ-ンヲ]',
            'pattern':['[ｧ-ﾝｦ]']
        }
    ];

    var regex = new RegExp( terms[0]['pattern'], 'g');
    // 形態素解析するかどうか
    if ( sentence.content.match(regex) ) {
        addError('半角のカタカナが含まれています。全角に修正してください', sentence);
    }
}
