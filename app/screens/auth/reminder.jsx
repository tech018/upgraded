import {StyleSheet, ScrollView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AccordionItem from '../../components/accordion';
import {useState} from 'react';
import {Box, Checkbox, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_NAME} from '../../navigation/auth/config';

const data = [
  '1.This document outlines the terms and conditions for using the Online Gate Pass ID application at Tarlac Agricultural University.By using the platform, you consent to the collection, processing, and storage of your personal information for the purpose of accessing services, improving them, and receiving relevant updates. Your information may be shared with trusted third parties, and security measures are in place to protect it. You are responsible for safeguarding your account credentials, and withdrawal of consent is possible but may impact service features. The terms can be amended, and the document is governed by applicable laws. For inquiries, contact the provided information. Using the services implies agreement with these terms.',
  `2.To further strengthen the University's control in the identification of the entry and exit of vehicles in theUniversity, and to support the mechanism of the Security Force on traffic control and peace and order.The University shall implement the "No Gate , No Entry Policy".`,
  `3.All TAU employees, students and other stakeholders with vehicle's entering the campus including tricycle drivers and operators are advised to apply for issuance of gate pass at the Business and Auxilliary Services.`,
  '4.The owners of vehicle who fail to apply and secure gatepass shall not be permitted to enter the campus.',
  '5.For the information and guidance all concerned.',
];

export default function Reminder() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(0);
  const [check, setCheck] = useState(false);

  function toggleItem(id) {
    setExpanded(id);
  }

  function CheckButtonPress() {
    if (!check) return setCheck(true);
    return setCheck(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        {data.map((item, index) => (
          <AccordionItem
            toggle={toggleItem}
            id={index}
            key={index}
            expanded={expanded}
            title={item}
          />
        ))}

        <Box style={styles.checkBoxArea}>
          <Checkbox
            shadow={2}
            isChecked={check}
            onChange={CheckButtonPress}
            accessibilityLabel="This is a dummy checkbox">
            I accept the terms & conditions
          </Checkbox>
          <Button
            disabled={check ? false : true}
            marginTop={5}
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: NAVIGATION_NAME.REGISTER,
              })
            }
            colorScheme="success">
            Proceed
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },

  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
  checkBoxArea: {paddingTop: 20, margin: 'auto'},
});
