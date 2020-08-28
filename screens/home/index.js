import React, { useState, useEffect } from 'react';
import { View, Dimensions, FlatList,} from 'react-native';

import { connect } from 'react-redux';

import { getIndexs, getCharactersArray } from './actions';

import Card from './components/card';
import Skeleton from './components/Skeleton';
import SearchBox from './components/search-box';

let INDEX = 6;
const { width: WIDHT } = Dimensions.get('window');
const CARD_WIDTH = (WIDHT/2)-4;
const CARD_HEIGHT = CARD_WIDTH * 1.7;

const Home = ({dispatch}) => {

    useEffect(()=>{
        loadCharacters();
    },[]);

    const [characters, setCharacters] = useState([]);
    const [fetching, setFetching] = useState(false);

    const loadCharacters = async() => {
        try {
            const batch = getIndexs(INDEX);
            const response = await fetch(`https://rickandmortyapi.com/api/character/${batch}`);
            const result = await response.json();
            const _characters = getCharactersArray(result);
            setCharacters(_characters);
        } catch (error) {
            console.log(error);
        }
    }


    const _loadMoreCharacters = async() => {
        try {
            if(fetching === false){
                setFetching(true);
                INDEX += 6;
                const nextBatch = getIndexs(INDEX);
                const response = await fetch(`https://rickandmortyapi.com/api/character/${nextBatch}`);
                const result = await response.json();
                const _characters = getCharactersArray(result);
                setCharacters(characters.concat(_characters));
                setFetching(false);
            }else{
                console.log('wait..');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderCharacters = ({item, i}) => (
        <Card 
            key={i}
            width={CARD_WIDTH} height={CARD_HEIGHT} episodes={item.episode.length}
            image={item.image} name={item.name} status={item.status}
            select={()=> dispatch({ type: "Select", value: item })}
        />
    );

    return(
        <View style={{flex:1, backgroundColor:'#ECEBED' }}>
           <FlatList
                data={ characters }
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                scrollEnabled={true}
                removeClippedSubviews={true}
                renderItem={ renderCharacters }
                onEndReachedThreshold={0.1}
                onEndReached={() => _loadMoreCharacters()}
                ListHeaderComponent={()=>  (<SearchBox width={WIDHT} dispatch={dispatch}/> )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => (
                    <>{fetching ? <Skeleton width={CARD_WIDTH} height={CARD_HEIGHT} /> : null}</>
                )}
          />
        </View>
    );
}


function mapStateToProps(state){
    return{
      character : state,
    };
}

export default connect(mapStateToProps)(Home);