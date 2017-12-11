function validateSentence(sentence) {

    // アルファベットは「半角」で表記します。用途によっては全角を許容します。ただし、表記をできるだけ統一するため、特別な理由がない限り半角での表記を原則とします。

    var terms = [
        {
            'expected':'[a-zA-Z]',
            'pattern':['[ａ-ｚＡ-Ｚ]']
        }
    ];

    var regex = new RegExp( terms[0]['pattern'], 'g');
    // 形態素解析するかどうか・・・
    if ( sentence.content.match(regex) ) {
        addError('全角のアルファベットが含まれています。半角に修正してください。', sentence);
    }
}
