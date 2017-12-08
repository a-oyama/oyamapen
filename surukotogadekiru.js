function validateSentence(sentence) {
	
    // することができる問題
    var terms = [
      {
          "pattern": "することができる",
          "message": "冗長な表現です。",
          "tokens": [
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "する"
              },
              {
                  "tags0": "名詞",
                  "tags1": "非自立",
                  "tags6": "こと"
              },
              {
                  "tags0": "助詞",
                  "tags1": "格助詞",
                  "tags6": "が"
              },
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "できる"
              }
          ]
      },
      {
          "pattern": "することが出来る",
          "message": "冗長な表現です。",
          "tokens": [
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "する"
              },
              {
                  "tags0": "名詞",
                  "tags1": "非自立",
                  "tags6": "こと"
              },
              {
                  "tags0": "助詞",
                  "tags1": "格助詞",
                  "tags6": "が"
              },
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "出来る"
              }
          ]
      },
      {
          "pattern": "する事ができる",
          "message": "冗長な表現です。",
          "tokens": [
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "する"
              },
              {
                  "tags0": "名詞",
                  "tags1": "非自立",
                  "tags6": "事"
              },
              {
                  "tags0": "助詞",
                  "tags1": "格助詞",
                  "tags6": "が"
              },
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "できる"
              }
          ]
      },
      {
          "pattern": "することが出来る",
          "message": "冗長な表現です。",
          "tokens": [
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "する"
              },
              {
                  "tags0": "名詞",
                  "tags1": "非自立",
                  "tags6": "事"
              },
              {
                  "tags0": "助詞",
                  "tags1": "格助詞",
                  "tags6": "が"
              },
              {
                  "tags0": "動詞",
                  "tags1": "自立",
                  "tags6": "出来る"
              }
          ]
      }
    ];

    var validateRegex = function(sentence,terms){
        var regex = new RegExp( terms.pattern );
        if ( regex.test(sentence) ) {
            return 'error';
        }
    }

    var validateToken = function(sentence,terms){
        var result = 0;
        for (var i = 0; i < sentence.tokens.length; i++) {
            // 検査できる＝今のＴｏｋｅｎの位置＋検査すべきＴｏｋｅｎの数が検査すべきＴｏｋｅｎの長さよりも小さい
            if ( i + terms.tokens.length - 1 < sentence.tokens.length ){
                // 判定用変数を初期化
                result = 0
                for (var j = 0; j < terms.tokens.length; j++){
                    if (
                        sentence.tokens[i+j].tags[0] === terms.tokens[j].tags0 &&
                        sentence.tokens[i+j].tags[1] === terms.tokens[j].tags1 &&
                        sentence.tokens[i+j].tags[6] === terms.tokens[j].tags6
                    ){
                        result++;
                    }
                }
                if (result === terms.tokens.length){
                    return 'error';
                }
            }
        }
    }

    var error = ''
    for (var j = 0; j < terms.length; j++) {
        if ( !terms[j].hasOwnProperty('tokens') ){
            error = validateRegex(sentence,terms[j]);
        }

        if ( terms[j].hasOwnProperty('tokens') ){
            error = validateToken(sentence,terms[j]);
        }

        if ( error ){
            addError( '「' + terms[j].pattern + '」は' + terms[j].message, sentence);
        }
    }
}
