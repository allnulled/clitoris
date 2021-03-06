/**
 *
 * # clitoris
 *
 *
 * ![](https://img.shields.io/badge/clitoris-v1.0.0-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/coverage-100%25-green.svg)  ![](https://img.shields.io/badge/stable-98%25-green.svg)
 *
 * Tool to bring complex parametrization to your CLI-based applications.
 * 
 * A simple utility that transforms (console-friendly) strings or (JavaScript) arrays of strings into complex JavaScript data: objects, arrays, numbers, strings, booleans (, null or undefined), nested or not.
 *
 * ## 1. Installation
 *
 * ~$ `npm install --save clitoris`
 * 
 * ## 2. Usage
 * 
 * This is a full example, and it could be written in 1 line, as the command-line interface usually requires:
 * 
 * ```js
 * var data = require("clitoris").Clitoris.parse(`
 * {
 *   @key1 [ :string:value1 ":s:value 2 with spaces" ]
 *   @key2 [ :boolean:true :b:false ]
 *   @key3 [ :number:100 :n:-100.99 ]
 *   @key4 :null:
 *   @key5 [ :undefined: :u: ]
 *   @key6 [ [ [ :n:1 ] ] ]
 *   @key7 { @key7.1 { @key7.1.1 { "@key7.1.1.1 with spaces" "simple string" } }
 * }
 * `);
 * 
 * console.log(data);
 * 
 * // 
 * // data is now:
 * // 
 * // {
 * //   key1: [ "value1", "value 2 with spaces" ],
 * //   key2: [ true, false ],
 * //   key3: [ 100, -100.99 ],
 * //   key4: null,
 * //   key5: [ undefined, undefined ],
 * //   key6: [ [ [ 1 ] ] ],
 * //   key7: {
 * //     "key7.1": {
 * //       "key7.1.1": {
 * //         "key7.1.1.1 with spaces": "simple string"
 * //       }
 * //     }
 * //   }
 * // }
 * // 
 * ```
 * 
 * ## 3. API Reference 
 * 
 */

const stringArgv = require("string-argv");

/**
 * 
 * 
 * ### **`Clitoris`**
 * @type `{Class}`
 * @description The main (and unique) class of the API.
 * 
 * It can be accessed like this:
 * 
 * ```js
 * const Clitoris = require("clitoris").Clitoris;
 * ```
 * 
 */
class Clitoris {

  /**
   * 
   * ----
   * 
   * ### **`Clitoris.parse(input:string|array)`**
   *
   * @type `{Function}`
   *
   * @parameter `input {String | Array}`. Data to be parsed. It can be a string, or an array of strings.
   *
   * @syntax The Clitoris.parse(~) parameter accepts a very specific syntax, but it will be enough to
   * create rich JSON data for command-line applications. 
   * 
   * First, the method will tokenize the string as a normal command-line interface from a console would do.
   * 
   * Then, the resulting array (which can be directly provided, instead of a `String`), which is simply the 
   * provided text but tokenized, will be parsed following the next syntax.
   * 
   * **Syntax:**
   * 
   * ----
   * 
   * ##### `1. Strings = :string:~ | :s:~ | default`
   * 
   * `Strings` can be generated with `:string:someText` or `:s:whatever`.
   * 
   * For spaced texts, one can wrap the token with `"`, like so: `":string:some spaced text"` or `":s:some spaced text"`.
   *
   * By default, any token that does not fit other type, will be automatically converted into `String` too.
   * 
   * That means that, for example, the token `"This is some text"` will be converted into `String` directly.
   * 
   * ----
   * 
   * ##### `2. Numbers = :number:~ | :n:~`
   * 
   * `Numbers` can be generated with `:number:1` or `:n:-1.55`.
   * 
   * Negative and decimal numbers are also valid values.
   * 
   * ----
   * 
   * ##### `3. Booleans = :boolean:true | :b:true | :boolean:false | :b:false`
   * 
   * `Booleans` can only be generated by these 4 tokens: 
   * 
   * `:boolean:true`
   * 
   * `:b:true`
   * 
   * `:boolean:false`
   * 
   * `:b:false`
   * 
   * ----
   * 
   * ##### `4. Null = :null:`
   * 
   * `Null` value can only be generated by this token: `:null:`.
   * 
   * ----
   * 
   * ##### `5. Undefined = :undefined: | :u:`
   * 
   * `Undefined` value can only be generated by these 2 tokens:
   * 
   * `:undefined:`
   * 
   * `:u:`
   * 
   * ----
   * 
   * ##### `6. Arrays = [ value value ... ]`
   * 
   * `Arrays` can be generated when a `[` and later and coherently a `]` are provided.
   * 
   * By "coherently", it means that if you open an array, you have to close it, and if you open 2 arrays, you have to close 2 arrays, and so on.
   * 
   * This implies that you can nest arrays.
   *
   * The values of the array are directly specified inside of the `[` and `]`. Here, you can provide any type of value, so nested arrays are also valid, or mixing arrays and objects.
   * 
   * ----
   * 
   * ##### `7. Objects = { @key value @key value ... }`
   * 
   * `Object` can be generated when a `{` and later and coherently a `}` are provided.
   * 
   * By "coherently", it means that if you open an object, you have to close it, and if you open 2 objects, you have to close 2 objects, and so on.
   * 
   * This implies that you can nest objects.
   * 
   * The values of the object follow this simple syntax:
   * 
   * `{ @key value @key value @key value ... }` 
   * 
   * Through `@key` we define the next property we want to set in the object. To provide spaced keys, wrap the key in `"`, like so: `"@This is a spaced key"`.
   * 
   * Through `value` we define the next value *of the previously specified property* we want to put in the object. Here, you can provide any type of value, so nested objects are also valid, or mixing arrays and objects.
   * 
   * @returns `{Any}`. Returns the input, but parsed.
   *
   * @description Takes a string (or an array of strings, like the one found at `process.argv` by default 
   * in Node.js), and returns the same, but transformed into real JavaScript data.
   *
   *
   *
   */
  static parse(inputParam) {
    var input = undefined;
    if (typeof inputParam === "string") {
      input = stringArgv(inputParam);
    } else if (inputParam instanceof Array) {
      input = inputParam;
    } else throw {
      name: `Clitoris:InvalidParseParameters`,
      message: `Clitoris#parse(~) parameter type is not correct (${typeof inputParam}).`
    };
    return Clitoris.tipifyValues(input);
  }

  /**
   * 
   * ----
   * 
   * ### **`Clitoris#parse(input:string|array)`**
   *
   * @type `{Function}`
   *
   * @description This method does the same as the static `Clitoris.parse`.
   *
   */
  parse() {
    return Clitoris.parse.apply(null, Array.prototype.slice.call(arguments));
  }

  /**
   * 
   * ----
   * 
   * ### **`Clitoris.tipifyValues(input:array)`**
   *
   * @accessibility `**Internals**`
   *
   */
  static tipifyValues(input) {
    return Clitoris.changeValue(input[0],0,input).tokenChanged;
  }

  /**
   * 
   * ----
   * 
   * ### **`Clitoris.changeValue(token:string, currentIndex:number, tokenList:array)`**
   *
   * @accessibility `**Internals**`
   *
   */
  static changeValue(token, currentIndex, tokenList) {
    if (token === "[") {
      var arrayClosedPosition = currentIndex;
      var tempLevel = 0;
      var tempIndex = 0;
      SearchArrayClosedPosition: 
      for(tempIndex = currentIndex + 1; tempIndex < tokenList.length; tempIndex++) {
        var tokenItem = tokenList[tempIndex];
        if (tokenItem === "[") {
          tempLevel++;
        } else if (tokenItem === "]" && tempLevel !== 0) {
          tempLevel--;
        } else if (tokenItem === "]" && tempLevel === 0) {
          arrayClosedPosition = tempIndex;
          break SearchArrayClosedPosition;
        }
      }
      if((arrayClosedPosition === currentIndex) || (tempLevel !== 0)) {
        throw {
          name: "Clitoris:UnclosedArrayArgumentError",
          message: "Array unclosed approx. to: " +
            tokenList.slice(currentIndex, tokenList.length) +
            " (from position " + currentIndex + " and left with a deepness of " + tempLevel + ")" 
        };
      }
      var elementsArray = tokenList.slice(
        currentIndex + 1,
        arrayClosedPosition
      );
      var elementsOutput = [];
      for (var a = 0; a < elementsArray.length; a++) {
        var element = elementsArray[a];
        var {
          tokenChanged,
          indexProgress
        } = Clitoris.changeValue(
          element,
          a,
          elementsArray
        );
        elementsOutput.push(tokenChanged);
        if (typeof indexProgress === "number" && indexProgress !== 0) {
          a += indexProgress;
        }
      }
      return {
        tokenChanged: elementsOutput,
        indexProgress: arrayClosedPosition - currentIndex
      };
    } else if (token === "{") {
      var arrayClosedPosition = currentIndex;
      var tempLevel = 0;
      var tempIndex = 0;
      SearchArrayClosedPosition: for (
        tempIndex = currentIndex + 1; tempIndex < tokenList.length; tempIndex++
      ) {
        var tokenItem = tokenList[tempIndex];
        if (tokenItem === "{") {
          tempLevel++;
        } else if (tokenItem === "}" && tempLevel !== 0) {
          tempLevel--;
        } else if (tokenItem === "}" && tempLevel === 0) {
          arrayClosedPosition = tempIndex;
          break SearchArrayClosedPosition;
        }
      }
      if (arrayClosedPosition === currentIndex) {
        throw {
          name: "Clitoris:UnclosedObjectArgumentError",
          message: "Object unclosed approx. to: " +
            tokenList.slice(currentIndex, tokenList.length)
        };
      }
      var elementsArray = tokenList.slice(
        currentIndex + 1,
        arrayClosedPosition
      );
      var elementsOutput = {};
      var elementsOutputKey = undefined;
      for (var a = 0; a < elementsArray.length; a++) {
        var element = elementsArray[a];
        if (element.startsWith("@")) {
          elementsOutputKey = element.substr(1);
        } else {
          var {
            tokenChanged,
            indexProgress
          } = Clitoris.changeValue(
            element,
            a,
            elementsArray
          );
          if (!(elementsOutputKey in elementsOutput)) {
            elementsOutput[elementsOutputKey] = tokenChanged;
          } else {
            elementsOutput[elementsOutputKey] = [].concat(elementsOutput[elementsOutputKey]).concat(tokenChanged);
          }
          if (typeof indexProgress === "number" && indexProgress !== 0) {
            a += indexProgress;
          }
        }
      }
      return {
        tokenChanged: elementsOutput,
        indexProgress: arrayClosedPosition - currentIndex
      };
    } else if (token.startsWith(":string:") || token.startsWith(":s:")) {
      return {
        tokenChanged: token.replace(/^(\:string\:|\:s\:)/g, ""),
        indexProgress: 0
      };
    } else if (token.startsWith(":number:") || token.startsWith(":n:")) {
      var numb = token.replace(/^(\:number\:|\:n\:)/g, "");
      try {
        numb = parseFloat(numb);
      } catch (exc) {}
      return {
        tokenChanged: numb,
        indexProgress: 0
      };
    } else if (token.startsWith(":boolean:") || token.startsWith(":b:")) {
      var b = token.replace(/^(\:boolean\:|\:b\:)/g, "");
      if (b === "false") {
        b = false;
      } else {
        b = true;
      }
      return {
        tokenChanged: b,
        indexProgress: 0
      };
    } else if (token === ":null:") {
    	return {
    		tokenChanged: null,
    		indexProgress: 0
    	};
    } else if ((token === ":undefined:") || (token === ":u:")) {
			return {
				tokenChanged: undefined,
				indexProgress: 0
			};
    } else {
      return {
        tokenChanged: token,
        indexProgress: 0
      };
    }
  }

}

module.exports = {
  Clitoris
};

/**
 *
 * ## 4. Tests and documentation
 *
 * To run the tests and generate the corresponding code coverage analysis, you can:
 * 
 * ~$ `npm run test` 
 * 
 * To generate the new documentation, you can:
 * 
 * ~$ `npm run docs`
 * 
 * 
 * 
 * ## 5. Conclusion
 * 
 * If you want to have a flexible command-line-interface based application, with rich parametrization, 
 * and based on minimalistic approaches, this is a great tool for you. 
 * 
 *
 */