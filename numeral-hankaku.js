function validateSentence(sentence) {
    // 数字は「半角」で表記する。

    var terms = [
        {
            'expected':'[0123456789]',
            'pattern':['[０１２３４５６７８９]']
        }
    ];

    var regex = new RegExp( terms[0]['pattern'], 'g');
    // 形態素解析するかどうか
    if ( sentence.content.match(regex) ) {
        addError('全角の算用数字が含まれています。半角に修正してください。', sentence);
    }
}
