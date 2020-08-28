import React from 'react';
import { View, Text, Linking, TouchableOpacity} from 'react-native';

import { colors } from '../../../styles/colors';

export default ({ color, label, value, url}) => (
    <View style={{flexDirection:'row', paddingBottom:10, justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{fontSize: 17, fontWeight:'bold', color}}>{label}</Text>
        <TouchableOpacity onPress={url ? ()=> Linking.openURL(url) : null}>
            <Text 
                style={{color: colors.dark, fontSize: 15, textDecorationLine:'underline',}}
            >{value.length > 20 ? value.slice(0,20).concat('...') : value}</Text>
        </TouchableOpacity>
    </View>
);