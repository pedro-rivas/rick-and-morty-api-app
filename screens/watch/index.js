import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, TouchableNativeFeedback, ScrollView, StyleSheet, Linking } from 'react-native';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { getBackgroundColor, getCharactersArray, getSecondaryColor, getDate } from '../home/actions';

import FastImage from 'react-native-fast-image';
import Label from './components/label';
import Link from './components/Link';
import EpisodesList from './components/horizontal-list';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Watch = (props) => {

    const navigation = useNavigation();

    const { image, status, name, species, type, gender, origin, location, episode, url, created} = props.character.select;

    useEffect(()=>{
        getEpisodesQuery(episode);
    },[]);

    const [episodes, setEpisodes] = useState([]);

    const getEpisodesQuery = (episodes) => {
        let query = '';
        for (let i = 0; i < episodes.length; i++) {
            const _episode = episodes[i].split('episode/')[1];
            query = query.concat(`${_episode},`);
        }
        loadEpisodes(query);
    }

    const loadEpisodes = async(list) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${list}`);
            const result = await response.json();
            const _episodes = getCharactersArray(result);
            setEpisodes(_episodes);
        } catch (error) {
            console.log(error);
        }
    }

    const backgroundColor = getBackgroundColor(status);
    const secondaryColor = getSecondaryColor(status);

    const date = getDate(created);

    return(
        <ScrollView style={{flex:1, backgroundColor}}>
            <View>
                <FastImage
                    style={{width:WIDTH, height:WIDTH, position:'absolute'}}
                    source={{
                        uri: image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={[styles.info_grap, { width: WIDTH -40, marginTop: WIDTH-80 }]}>
                    <Text style={[styles.name, { color: backgroundColor }]}>{ name }</Text>
                    <Label color={backgroundColor} label={'Status:'} value={status}/>
                    <Label color={backgroundColor} label={'Species:'} value={species}/>
                    <Label color={backgroundColor} label={'Type:'} value={type}/>
                    <Label color={backgroundColor} label={'Gender:'} value={gender}/>
                    <Link color={backgroundColor} label={'Origin:'} value={origin.name} url={origin.url}/>
                    <Link color={backgroundColor} label={'Location:'} value={location.name} url={location.url}/>
                    <Text style={{fontSize: 17, fontWeight:'bold', color: backgroundColor, marginBottom:20,}}>Episodes:</Text>
                    <EpisodesList episodes={episodes} width={WIDTH} color={secondaryColor}/>
                    <Label color={backgroundColor} label={'Created:'} value={date}/>
                    <TouchableNativeFeedback onPress={()=> Linking.openURL(url)}>
                        <View style={{height:50, width:'100%', marginTop:20,  borderRadius:6, marginBottom:20,
                         backgroundColor: colors.primary.main, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>API endpoint</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={()=> navigation.goBack()}>
                        <View style={{height:50, width:'100%', borderRadius:6, borderWidth:1,
                         borderColor: colors.primary.main, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'bold', color:colors.dark}}>Go back</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    info_grap:{
        backgroundColor:'white',
        marginLeft:20,
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        padding:20, 
        borderColor: colors.dark,
        borderWidth:1, 
        elevation:6,
    },
    name:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center',
        paddingBottom:20, 
    },
});

function mapStateToProps(state){
    return{
      character: state
    };
}

export default connect(mapStateToProps)(Watch);