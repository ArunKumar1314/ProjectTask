import * as React from 'react';
import { ActivityIndicator} from 'react-native-paper';

const Loading= () => (
  <ActivityIndicator animating={true} color={"pink"} />
);

export default Loading;