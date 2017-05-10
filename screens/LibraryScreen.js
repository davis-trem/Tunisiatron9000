import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  ListView,
  TouchableHighlight,
  Image,
  Animated,
  View
} from 'react-native';
import {Clips} from '../audio/audioData';
import { default as Sound } from 'react-native-sound';

const LibraryScreen = () => {

    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
    this.state = { dataSource: dataSource.cloneWithRows(Clips), topAnim: new Animated.Value(0), talking: false };


    return (
        <View style={styles.container}>
            <Image source={require('../images/tHead.png')} style={styles.tImage} >
                <Animated.Image source={require('../images/tBottom.png')} style={[styles.tImage, {top:this.state.topAnim}]} />
            </Image>

            <ListView 
                dataSource={this.state.dataSource} 
                renderRow={ (rowData) => 
                    renderRow(rowData)
                } 
                renderSeparator={ (sectionID, rowID, adjacentRowHighlighted) => <View key={`${sectionID}-${rowID}`} 
                    style={{
                        height: adjacentRowHighlighted ? 4 : 1,
                        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                    }}/>
                }   
            />
        </View>
    );
  
}

function renderRow(rowData){
    return (
        <TouchableHighlight onPress={() => playClip(rowData)} underlayColor='rgb(55, 35, 89)' >
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center', margin: 5}}>{rowData.text}</Text> 
        </TouchableHighlight>
    );
}

function playClip(sound){
    if(!this.state.talking){
        console.log('Pressed for', sound.src);

        Sound.setCategory('Playback');

        var clip = new Sound(sound.src, Sound.MAIN_BUNDLE, (error) => {
            if(error){
                console.log('failed to load the sound', error);
            }else{
                // loaded successfully 
                console.log('duration in seconds: ' + clip.getDuration() + 'number of channels: ' + clip.getNumberOfChannels());
                this.state.talking = true;
                startTalking();
                clip.play( (success) => {
                    if (success) {
                        this.state.talking = false;
                        clip.release();
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                } );
            }
        });
    }
}

function startTalking(){
    if(this.state.talking){
        Animated.sequence([
            Animated.timing(
                this.state.topAnim,
                { toValue: 15, duration: 250 }
            ),
            Animated.timing(
                this.state.topAnim,
                { toValue: 0, duration: 250 }
            )
        ]).start( () => {
            startTalking();
        } );
    }
}

function test(){
    Sound.setCategory('Playback');

    var clip = new Sound(Clips[0].src, Sound.MAIN_BUNDLE, (error) => {
        if(error){
            console.log('failed to load the sound', error);
        }else{
            // loaded successfully 
            console.log('duration in seconds: ' + clip.getDuration() + 'number of channels: ' + clip.getNumberOfChannels());
            clip.play();
            startTalking();
        }
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2b2d',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    color: 'white',
  },
  tImage: {
    height:186, 
    width:141,
  },
});

export default LibraryScreen