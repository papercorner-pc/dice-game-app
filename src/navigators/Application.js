import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './utils';
import {MMKV} from 'react-native-mmkv';
import {AddressDetailScreen} from '../screens';
import OtpVerify from '../screens/Login/OtpVerify';
import CreateAccount from '../screens/Login/CreateAccount';
import SignIn from '../screens/Login/Signin';
import ForgotPassword from '../screens/Login/ForgotPassword';
import SplashScreen from '../screens/SplashScreen';
import CustomTabBars from '../components/molecules/BottomTabs';
import {useTheme} from '../theme';
import HomeScreen from '../screens/Home';
import WalletScreen from '../screens/Wallet';
import GameScreen from '../screens/Game';
import HistoryScreen from '../screens/History';
import ProfileScreen from '../screens/Profile';
import WalletPaymentScreen from '../screens/Wallet/WalletPaymentScreen';
import LeaderBoard from '../screens/LeaderBoard';
import OtpVerifiedScreen from '../screens/Login/OtpVerifiedScreen';
import SelectedCardScreen from '../screens/GameJoin/SelectedCardScreen';
import EditProfile from '../screens/Profile/EditProfile';
import UpdatePassword from '../screens/Profile/UpdatePassword';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';
import GameJoin from '../screens/GameJoin';
import PaymentsScreen from '../screens/Payments/PaymentScreen';
import AdminHomeScreen from '../screens/Admin/Home';
import AddContest from '../screens/Admin/AddContest';
import ContestantList from '../screens/LeaderBoard/ContestantList';
import AnnounceResult from '../screens/Admin/AnnounceResult';
import ResultGameScreen from '../screens/GameJoin/ResultGameScreen';
import LatestGameFetch from '../screens/Game/LatestGameFetch';
import GameJoinedList from '../screens/LeaderBoard/GameJoinedList';
import WalletPaymentPage from '../screens/Payments/WalletPaymentPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const storage = new MMKV();

function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="OtpVerify" component={OtpVerify} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpVerified" component={OtpVerifiedScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  const isLogin = storage.getString('auth_token');
  const isAdmin = storage.getBoolean('is_admin');
  return (
    <Stack.Navigator
      initialRouteName={
        !!isLogin ? (!!isAdmin ? 'AdminRoot' : 'HomeRoot') : 'LoginRoot'
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeRoot" component={HomeTabs} />
      <Stack.Screen name="AdminRoot" component={AdminTabs} />
      <Stack.Screen name="LoginRoot" component={LoginStack} />
      <Stack.Screen name="WalletPayment" component={WalletPaymentScreen} />
      <Stack.Screen name="WalletPaymentPage" component={WalletPaymentPage} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
      <Stack.Screen name="GameJoinedList" component={GameJoinedList} />
      <Stack.Screen name="JoinSelectedCard" component={SelectedCardScreen} />
      <Stack.Screen name="GameJoin" component={GameJoin} />
      <Stack.Screen name="ResultGameScreen" component={ResultGameScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentsScreen} />
      <Stack.Screen name="AddContest" component={AddContest} />
      <Stack.Screen name="ContestantList" component={ContestantList} />
      <Stack.Screen name="AnnounceResult" component={AnnounceResult} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
      })}
      initialRouteName="Home"
      tabBar={props => <CustomTabBars {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home', title: 'Home'}}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{tabBarLabel: 'Wallet', title: 'Wallet'}}
      />
      <Tab.Screen
        name="Game"
        component={LatestGameFetch}
        options={{tabBarLabel: 'Game', title: 'Game'}}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{tabBarLabel: 'History', title: 'History'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: 'Profile', title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
      })}
      initialRouteName="AdminHome"
      tabBar={props => <CustomTabBars {...props} />}>
      <Tab.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{tabBarLabel: 'Home', title: 'Home'}}
      />
      <Tab.Screen
        name="AdminWallet"
        component={WalletScreen}
        options={{tabBarLabel: 'Wallet', title: 'Wallet'}}
      />
      <Tab.Screen
        name="AdminContest"
        component={AddContest}
        options={{tabBarLabel: 'Game', title: 'Game'}}
      />
      <Tab.Screen
        name="AdminHistory"
        component={HistoryScreen}
        options={{tabBarLabel: 'History', title: 'History'}}
      />
      <Tab.Screen
        name="AdminProfile"
        component={ProfileScreen}
        options={{tabBarLabel: 'Profile', title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

function ApplicationNavigator() {
  const {variant, navigationTheme} = useTheme();
  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default ApplicationNavigator;
