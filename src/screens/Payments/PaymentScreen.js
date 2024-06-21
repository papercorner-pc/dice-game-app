import { useEffect } from 'react';
import { View } from 'react-native';
import LoaderOverlay from '../../components/molecules/LoaderOverlay';
import { navigate, navigateAndSimpleReset } from '../../navigators/utils';

const PaymentsScreen = props => {
  const { selectedCard } = props.route.params;
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('ResultGameScreen', {
        selectedCard: selectedCard,
        isFromResult: false
      });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <LoaderOverlay show={true} />
    </View>
  );
};
export default PaymentsScreen;
