declare var TextDecoder: any;
import { useState, useCallback } from 'react';

import 'text-encoding-polyfill';
const utf8decoder = new TextDecoder();

const BOLD = [240, 157, 144];
const ITELIC = [240, 157, 152];
const UNDERLINE_SMALL = [204, 178];

const getCharArray = (
  type: 'b' | 'i' | 'u' = 'b',
  asciiCode: number,
  isSmall: boolean = true
) => {
  if (type === 'b') {
    if (isSmall) {
      return BOLD.concat(asciiCode + getOffet(type, isSmall));
    } else {
      return BOLD.concat(asciiCode + getOffet(type, isSmall));
    }
  } else if (type === 'i') {
    if (isSmall) {
      return ITELIC.concat(asciiCode + getOffet(type, isSmall));
    } else {
      return ITELIC.concat(asciiCode + getOffet(type, isSmall));
    }
  }

  if (isSmall) {
    return [asciiCode].concat(UNDERLINE_SMALL);
  } else {
    return [asciiCode].concat(UNDERLINE_SMALL);
  }
};

const getOffet = (type: 'b' | 'i' | 'u' = 'b', isSmall: boolean) => {
  if (type === 'b') {
    return isSmall ? 57 : 63;
  } else if (type === 'i') {
    return isSmall ? 65 : 71;
  }

  return 0;
};

const convertUint8 = (text: string, type: 'b' | 'i' | 'u' = 'b') => {
  let convertedStr = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    const asciiCode = char.charCodeAt(0);
    if (asciiCode >= 97 && asciiCode <= 122) {
      //small letters
      char = utf8decoder.decode(
        new Uint8Array(getCharArray(type, asciiCode, true))
      );
    } else if (asciiCode >= 65 && asciiCode <= 90) {
      // capital letter
      char = utf8decoder.decode(
        new Uint8Array(getCharArray(type, asciiCode, false))
      );
    }

    convertedStr += char;
  }
  return convertedStr;
};

function boldText(text: string) {
  return text.replace(
    /\*\*(\S(.*?\S)?)\*\*/gm,
    (_matchString: string, matchGroup: string) => {
      return convertUint8(matchGroup, 'b');
    }
  );
}

function italicText(text: string) {
  return text.replace(
    /_([^_]+)_/gm,
    (_matchString: string, matchGroup: string) => {
      return convertUint8(matchGroup, 'i');
    }
  );
}

function underlineText(text: string) {
  return text.replace(
    /(--|—)(\w+)(--|—)/gm,
    (_matchString: string, _matchGroup: string, matchGrou1: string) => {
      return convertUint8(matchGrou1, 'u');
    }
  );
}

const textToMarkdown = (text: string) => {
  return underlineText(italicText(boldText(text)));
};

const useMarkdown = (): [string, (data: string) => void] => {
  const [textValue, setTextValue] = useState<string>('');

  const setTextValueHandler = useCallback((txt) => {
    const previewText = textToMarkdown(txt);
    setTextValue(previewText);
  }, []);

  return [textValue, setTextValueHandler];
};
export default useMarkdown;
export { textToMarkdown };
