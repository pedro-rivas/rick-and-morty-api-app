import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { color } from 'react-native-reanimated';

export default ({ episodes, width, color }) => {

    const renderEpisodes = ({item, i}) => (
        <View key={i}
            style={{ width: width/4, height: (width/4)*1.7, borderRadius:6, 
                flexDirection:'column', borderColor: colors.dark, backgroundColor:color, 
                borderWidth:1, padding:5,
                alignItems:'center', justifyContent:'space-between', marginRight:5}}
        >
            <Text style={{textAlign:'center', fontWeight:'bold'}}>{ item.name }</Text>
            <View style={[styles.circle, {backgroundColor: color}]}>
                <Text style={ styles.episodes}>
                    { item.id }
                </Text>
            </View>
            <Text>{ item.episode }</Text>
        </View>
    );

    return(
        <FlatList
                data={ episodes }
                style={{marginBottom:20}}
                horizontal={true}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                scrollEnabled={true}
                removeClippedSubviews={true}
                renderItem={ renderEpisodes }
                keyExtractor={(item, index) => index.toString()}
          />
    )
};

const styles = StyleSheet.create({
    circle:{
        borderRadius:50,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
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