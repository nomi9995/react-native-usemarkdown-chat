<!-- Title -->
<p align="center">
<img src="/assets/icon.png" alt="alt text" width="150" style="padding-top: 16px; padding-bottom: 16px;" />
</p>

<!-- Header -->

<p align="center">
  <b>use bold, italic and underline markdown for chat while typing</b>
  <br />
</p>

<p align="center">
  <img width="350" src="/assets/demo.gif">
</p>

# [Demo](https://614db906865efbc908490c6f--react-native-usemarkdown-chat-hook.netlify.app/)

## Installation

```sh
npm install react-native-usemarkdown-chat
```

## Usage

```js
import useMarkdown, { textToMarkdown } from 'react-native-usemarkdown-chat';

// ...

const [text, setText] = useMarkdown();
```

**textToMarkdown** function is not hook it is basically text to markdown converter. you can use this for making own custom useState.

## Example Code

```js
import * as React from 'react';

import { StyleSheet, View, TextInput } from 'react-native';
import useMarkdown from 'react-native-usemarkdown-chat';

export default function App() {
  const [text, setText] = useMarkdown();
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    backgroundColor: 'gray',
    fontSize: 30,
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
