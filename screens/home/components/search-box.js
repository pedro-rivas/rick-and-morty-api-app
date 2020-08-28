import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../styles/colors';
import { showToast, getCharactersArray } from '../../home/actions';

import FastImage from 'react-native-fast-image';

export default ({ width, dispatch }) => {

    const navigation = useNavigation();

    const [text, onChangeText] = useState('');
    const [fetching, setFetching] = useState(false);
    const [characters, setCharacters] = useState([]);

    const _search = async(name) => {
        try {
            onChangeText(name);
            if(fetching === false){
                setFetching(true);
                const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
                const result = await response.json();
                if(result.error){
                    showToast(result.error);
                }else{
                    const _characters = getCharactersArray(result)[1];
                    setCharacters(_characters);
                }
                setFetching(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function _onPress(item){
        dispatch({ type: "Select", value: item })
        navigation.navigate('watch');
    }

    return(
        <>
        <View
            style={{width: width-20, margin:10, flexDirection:'row',
                borderColor: colors.dark, borderWidth: 1, borderRadius:6 }}
        >
            <TextInput
                style={{ height: 40, width: width-22, backgroundColor:'#EEDFF2', fontSize:16,
                    borderRadius:6, paddingLeft:10,}}
                onChangeText={text => _search(text)}
                placeholder={'name..'}
                value={text}
            />
            {fetching ? 
                <View style={{position:'absolute', right:10, top:10}}>
                    <ActivityIndicator size={'small'} color={colors.primary.main}/> 
                </View>
            : null}
        </View>
        <View>
            {characters.length > 0 ? characters.map((value, i) => {
                return(
                    <TouchableOpacity key={i} onPress={()=> _onPress(value)}>
                        <View 
                            style={{
                                padding:10, paddingTop:5, paddingBottom:5, flexDirection:'row',
                                alignItems:'center', backgroundColor:'white',
                            }}
                        >
                        <FastImage
                            style={{width:25, height:25, marginRight:10, borderRadius:25}}
                            source={{
                                uri: value.image,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={{color: colors.dark}}>{value.name}</Text>
                        </View>
                    </TouchableOpacity>
                )})
            : null}
        </View>
        </>
    )
};