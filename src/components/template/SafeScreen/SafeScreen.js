import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../../../theme';
function SafeScreen({ children, backgroundColor = 'white' }) {
    const { layout, variant, navigationTheme } = useTheme();
    return (<SafeAreaView style={[
            layout.flex_1,
            { backgroundColor: backgroundColor },
        ]}>
			<StatusBar barStyle={variant === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={navigationTheme.colors.background}/>
			{children}
		</SafeAreaView>);
}
export default SafeScreen;
