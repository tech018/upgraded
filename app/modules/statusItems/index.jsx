import {Text, Box} from 'native-base';
import {StyleSheet} from 'react-native';

export default function StatusItems({items}) {
  return (
    <Box
      borderColor="green.300"
      borderStyle="solid"
      borderWidth={2}
      padding={2}
      backgroundColor="green.200"
      mt={4}
      borderRadius={20}>
      <Text mx={1} mb={6}>
        You have {items.length}{' '}
        {items.length > 1 ? 'applications' : 'application'}
      </Text>
      <Box style={styles.container}>
        {items.map(item => (
          <Box key={item.id} style={styles.boxImage}>
            {item.image}
            <Text textTransform="capitalize" textAlign="center">
              {item.name} {item.data}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  boxImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
