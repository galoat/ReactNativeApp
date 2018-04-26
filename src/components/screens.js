import { Navigation } from 'react-native-navigation';
import LoginScreen from './screens/Login';
import HomeTab from './screens/homeTab';

export default (store, Provider) =>  {
	Navigation.registerComponent('SkiUt.Login', () => LoginScreen, store, Provider);
	Navigation.registerComponent('SkiUt.HomeTab', () => HomeTab, store, Provider);
}
