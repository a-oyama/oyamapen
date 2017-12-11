function validateSentence(sentence) {
    var tmp = ''
    for (var k = 0; k < sentence.tokens.length; k++) {

        if ( k + 3 < sentence.tokens.length ) {
            if (
                sentence.tokens[k].tags[6].match(/[一二三四五六七八九十百千]/) &&
                sentence.tokens[k+1].tags[6].match(/[\u4E00-\u9FFF]/) &&
                sentence.tokens[k+2].tags[6].match(/[一二三四五六七八九十百千]/) &&
                sentence.tokens[k+3].tags[6].match(/[\u4E00-\u9FFF]/)
            ) return null;
        }

        if ( k + 2 < sentence.tokens.length ) {
            tmp = sentence.tokens[k].surface + sentence.tokens[k+1].surface + sentence.tokens[k+2].surface;
            if ( tmp.match(/[一二三四五六七八九十百千][\u4E00-\u9FFF][一二三四五六七八九十百千][\u4E00-\u9FFF]/) ) return null;
        }

        if ( k + 1 < sentence.tokens.length ){
            tmp = sentence.tokens[k].surface + sentence.tokens[k+1].surface;
            if ( tmp.match(/[一二三四五六七八九十百千][\u4E00-\u9FFF][一二三四五六七八九十百千][\u4E00-\u9FFF]/) ) return null;
        }

        if ( k + 1 < sentence.tokens.length ){
            if (
                sentence.tokens[k].tags[6] === '数' &&
                sentence.tokens[k+1].tags[6].match(/[十百千万]/)
            ) return null;
        }

        // [漢数字]次[名詞]
        if (k + 2 < sentence.tokens.length){
            if (
                sentence.tokens[k].tags[6].match(new RegExp(/[一二三四五六七八九十百千]/)) &&
                sentence.tokens[k+1].tags[6] === '次' &&
                sentence.tokens[k+2].tags[0] === '名詞'
            ) return null;
        }

        if( k + 1 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface === '五' &&
                sentence.tokens[k+1].tags[6] ==='大陸'
            ) return null;
        }

        if ( sentence.tokens[k].tags[6].match(/十進法|二進法|十六進法/) ) return addError('数を数えられるものは算用数字を利用します' , sentence );

        if (
             sentence.tokens[k].tags[0] === "名詞" &&
             sentence.tokens[k].tags[1] === "一般" &&
             sentence.tokens[k].tags[6].match(new RegExp(/[一二三四五六七八九]つ/))
        ){
            addError('数を数えられるものは算用数字を利用します' , sentence );
        }

        if (
             sentence.tokens[k].tags[0] === "名詞" &&
             sentence.tokens[k].tags[1] === "数" &&
             sentence.tokens[k].tags[6].match(new RegExp(/[一二三四五六七八九十百千]/))
        ){
            addError('数を数えられるものは算用数字を利用します' , sentence );
        }

        if ( k + 1 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface === '5' &&
                sentence.tokens[k+1].tags[6] ==='大陸'
            ) addError('慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。' , sentence );
        }

        // [算用数字]次[名詞]
        if (  k + 2 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface.match(new RegExp(/[1-9]/)) &&
                sentence.tokens[k+1].tags[6] === '次' &&
                sentence.tokens[k+2].tags[0] === '名詞'
            ) addError('慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。' , sentence );
        }

        // [算用数字]時的
        if ( k + 2 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface.match(new RegExp(/[1-9]/)) &&
                sentence.tokens[k+1].tags[6] === '時' &&
                sentence.tokens[k+2].tags[6] === '的'
            ) addError('慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。' , sentence );
        }
    }
}
