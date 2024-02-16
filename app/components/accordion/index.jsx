import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AccordionItem({title, id, toggle, expanded}) {
  return (
    <View style={styles.accordContainer}>
      <View>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => toggle(id)}>
          <Text style={styles.accordTitle}>{`Reminder ${id + 1}`}</Text>
          <Icon
            name={
              expanded === id
                ? 'chevron-up-circle-outline'
                : 'chevron-down-circle-outline'
            }
            size={20}
            color="#bbb"
          />
        </TouchableOpacity>
        {expanded === id && (
          <Text style={{marginTop: 10, marginBottom: 10}}>{title}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#02851f',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  accordBody: {
    padding: 12,
  },
});
