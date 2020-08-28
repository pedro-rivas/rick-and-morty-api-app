import React from 'react';
import {StyleSheet, View,} from 'react-native';

import { colors } from '../../../styles/colors';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default ({width, height }) => (
    <SkeletonPlaceholder
        backgroundColor={colors.accent.green.seconary}
        highlightColor={'#D5F2EA'}
        speed={1000}
    >
        <View style={{flexDirection:'row',}}>
            <View style={[styles.main,{ width, }]}>
                <View style={{ width: width-40, height: 20, borderRadius:25, marginBottom:10, }}></View>
                <View style={[ styles.image, { width: width -20,  height: height-20}]}></View>
            </View>
            <View style={[styles.main,{ width, }]}>
                <View style={{ width: width-40, height: 20, borderRadius:25, marginBottom:10, }}></View>
                <View style={[ styles.image, { width: width -20,  height: height-20}]}></View>
            </View>
        </View>
    </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
    main:{
        borderRadius:6,
        margin:2,
        padding:10, 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.accent.green.main,
    },
    image:{
        borderRadius:2,
    },
});

