import { Navigation } from 'react-native-navigation';
import Login from './screens/Login';
import HomeTab from './screens/homeTab';

export default (store, Provider) =>  {
	Navigation.registerComponent('SkiUt.Login', () => Login, store, Provider);
	Navigation.registerComponent('SkiUt.HomeTab', () => HomeTab, store, Provider);
}
