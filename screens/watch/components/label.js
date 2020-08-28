import React from 'react';
import { View, Text, } from 'react-native';

import { colors } from '../../../styles/colors';

export default ({ color, label, value}) => (
    <View style={{flexDirection:'row', paddingBottom:10, justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{fontSize: 17, fontWeight:'bold', color}}>{label}</Text>
        <Text
             style={{color: colors.dark, fontSize: 15,}}
        >{value === '' ? 'Unknown' : value.length > 20 ? value.slice(0,20).concat('...') : value}</Text>
    </View>
);