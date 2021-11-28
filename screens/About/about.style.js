import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleTranslated: {
    fontSize: 20,
  },
  descriptionWrapper: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginVertical: 20,
  },
  titleDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  description: {
    fontSize: 19,
    padding: 10,
    lineHeight: 24,
  },
  labelWrapper: {},
  labelTitle: {
    paddingRight: 3,
  },
  titleLabel: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
