import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { View } from 'react-native';
import LoaderOverlay from '../../components/molecules/LoaderOverlay';
import { navigate, navigateAndSimpleReset } from '../../navigators/utils';
import { walletRecharge } from '../../services/game/game';

const WalletPaymentPage = props => {
  const { amount } = props.route.params;
  const mutation = useMutation({
    mutationFn: payload => {
      return walletRecharge(payload);
    },
    onSuccess: data => {
      const { pop } = props.navigation;
      pop(2)
      // queryClient.invalidateQueries("movies");
    },
    onError: error => {
      console.log('------ERRORq123-----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      const payload = {
        amount: parseInt(amount)
      };
      mutation.mutate(payload);
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
export default WalletPaymentPage;
