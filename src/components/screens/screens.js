import { Navigation } from 'react-native-navigation';
import Login from './Login';
import HomeTab from './homeTab';

export default (store, Provider) =>  {
	Navigation.registerComponent('SkiUt.Login', () => Login, store, Provider);
	Navigation.registerComponent('SkiUt.HomeTab', () => HomeTab, store, Provider);
}
