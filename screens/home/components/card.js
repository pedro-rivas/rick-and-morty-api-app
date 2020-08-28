import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../styles/colors';
import { getBackgroundColor } from '../actions';

import FastImage from 'react-native-fast-image';

export default ({width, height, image, name, episodes, status, select}) => {

    const navigation = useNavigation();

    const backgroundColor = getBackgroundColor(status);

    const customName = status === 'unknown' ? name.split(" ")[0].concat('...') :  name.split(" ")[0];

    function _onPress(){
        select();
        navigation.navigate('watch');
    }

    return(

    <TouchableNativeFeedback onPress={()=> _onPress()}>

    <View style={[styles.main,{ width, backgroundColor }]}>
        <Text 
            style={[styles.name,{ width: width-40, textDecorationLine: status === 'Dead' ? 'line-through': 'none' }]}
            numberOfLines={1}
        >
            { customName }
        </Text>
        <FastImage
            style={[ styles.image, { width: width -20,  height: height-20}]}
            source={{
                uri: image,
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.circle}>
          <Text 
            style={[styles.episodes,{textDecorationLine: status === 'Dead' ? 'line-through': 'none' }]}
          >
              { episodes }
          </Text>
        </View>
    </View>
    </TouchableNativeFeedback>         
)};

const styles = StyleSheet.create({
    main:{
        elevation:4, 
        backgroundColor:'white',
        borderRadius:6,
        margin:2,
        padding:10, 
        alignItems:'center',
    },
    image:{
        borderRadius:2,
    },
    name:{
        color: colors.dark,
        fontSize:16,
        textAlign:'center',
        backgroundColor:'white', 
        borderRadius:25,
        marginBottom:10, 
        borderColor: colors.dark,
        borderWidth:1,
        borderBottomWidth:2,
        borderTopColor:'#A798C3',
    },
    circle:{
        borderRadius:50,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:5,
        bottom:5, 
        height:30,
        width:30, 
        borderWidth: 1,
        borderBottomWidth:2,
        borderColor: colors.dark,
    },
    episodes:{
        fontSize:15, 
        fontWeight:'500',
        color: colors.dark,
    },
});

