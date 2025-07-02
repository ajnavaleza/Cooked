import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A9BEE8', alignItems: 'center', paddingTop: 40 },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: { flexDirection: 'row', width: '80%', height: 6, borderRadius: 3, marginBottom: 24, overflow: 'hidden' },
  progressBar: { height: 6 },
  header: { fontSize: 48, fontWeight: 'bold', color: '#FFF', marginBottom: 12, fontFamily: 'Obviously Narrow Semibold' },
  subheader: { color: '#FFF', fontSize: 20, textAlign: 'center', marginBottom: 24, fontFamily: 'Obviously Narrow Medium' },
  quizBox: { backgroundColor: '#FFF6ED', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, width: '100%', alignItems: 'center', flex: 1, paddingHorizontal: 20 },
  quizTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A3531', marginBottom: 16 },
  optionsContainer: { width: '100%' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 8, borderRadius: 8 },
  selectedRow: { backgroundColor: '#E0E6F6' },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: '#4A3531', borderRadius: 6, marginRight: 8, backgroundColor: '#FFF' },
  checkedBox: { backgroundColor: '#A9BEE8', borderColor: '#A9BEE8' },
  optionText: { fontSize: 16, color: '#4A3531', fontFamily: 'Obviously Narrow Medium' },
  otherInput: { backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E6F6', padding: 8, marginLeft: 32, marginBottom: 8, width: '80%' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 16 },
  backButton: { paddingVertical: 10, paddingHorizontal: 16 },
  backText: { color: '#A9BEE8', fontSize: 16, textDecorationLine: 'underline' },
  submitButton: { backgroundColor: '#A9BEE8', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 32, marginBottom: 20},
  submitText: { color: '#FFF', fontSize: 18, fontWeight: 'bold'},
  skipButton: { paddingVertical: 10, paddingHorizontal: 16 },
  skipText: { color: '#A9BEE8', fontSize: 16, textDecorationLine: 'underline' },
});

export default styles; 