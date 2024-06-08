import {StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../../theme/fonts';

const JoinMessage = props => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.noteText}>Please Note</Text>
      <Text style={styles.noteText}>
        Your account will be debited with the specified amount. Ensure you have
        sufficient funds and authorize this transaction to proceed
      </Text>
      <Text style={styles.termText}>View T&C</Text>
    </View>
  );
};

export default JoinMessage;

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#3B234C',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  noteText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
    marginBottom: 5,
  },
  paraText: {
    fontSize: 11,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
    marginBottom: 5,
  },
  termText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FBFBFB',
    marginBottom: 5,
  },
});
