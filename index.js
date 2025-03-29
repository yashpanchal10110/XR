/**
 * @format
 */
import 'react-native-reanimated'; // 👈 Import first
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
