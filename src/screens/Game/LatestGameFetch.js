import {useMutation} from '@tanstack/react-query';
import { useEffect } from 'react';
import {goBack, navigate} from '../../navigators/utils';
import {gameList} from '../../services/game/game';
import {customToastMessage} from '../../utils/UtilityHelper';

const LatestGameFetch = () => {
  const mutation = useMutation({
    mutationFn: payload => {
      return gameList(payload);
    },
    onSuccess: data => {
      console.log('---success latest gameList', data);
      if (data.games?.length > 0) {
        navigate('GameJoin', {game: data.games[0]});
      } else {
        customToastMessage('No Upcoming Game Found', 'error');
        goBack();
      }
      //   setGameListData(data.games);
      //   setUserGameHistory(data.user_details);
    },
    onError: error => {
      console.log('------ERROR gameList -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
      goBack();
    },
  });
  useEffect(() => {
    const payload = {
      type: 'upcoming',
    };
    mutation.mutate(payload);
  }, []);
  return null;
};
export default LatestGameFetch;
