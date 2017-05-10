import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableHighlight,
  View
} from 'react-native';
import {Clips} from '../audio/audioData';
import { default as Sound } from 'react-native-sound';
import RNShakeEvent from 'react-native-shake-event';

const MainScreen = () => {

    this.Anim = new Animated.Value(0);
    this.talkingMain = false;


    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Tunisiatron 9000</Text>
            <Text style={styles.instructions}>Press Me!</Text>
            <TouchableHighlight onPress={() => getClip()} underlayColor='rgba(55, 35, 89, 0)' >
                <Image source={require('../images/tHead.png')} style={styles.tImage} >
                    <Animated.Image source={require('../images/tBottom.png')} style={[styles.tImage, {top:this.Anim}]} />
                </Image>
            </TouchableHighlight>
        </View>
    );
  
}

function getClip(){
    var rand = Math.floor(Math.random() * Clips.length);
    playClip(Clips[rand]);
}

function startTalking(){
    if(this.talkingMain){
        Animated.sequence([
            Animated.timing(
                this.Anim,
                { toValue: 15, duration: 250 }
            ),
            Animated.timing(
                this.Anim,
                { toValue: 0, duration: 250 }
            )
        ]).start( () => {
            startTalking();
        } );
    }
}

function playClip(sound){
    if(!this.talkingMain){
        console.log('Pressed for', sound.src);

        Sound.setCategory('Playback');

        var clip = new Sound(sound.src, Sound.MAIN_BUNDLE, (error) => {
            if(error){
                console.log('failed to load the sound', error);
            }else{
                // loaded successfully 
                console.log('duration in seconds: ' + clip.getDuration() + 'number of channels: ' + clip.getNumberOfChannels());
                this.talkingMain = true;
                startTalking();
                clip.play( (success) => {
                    if (success) {
                        this.talkingMain = false;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2b2d',
  },
  welcome: {
    textAlignVertical: 'top',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    textShadowColor: '#372359',
    textShadowOffset: {width: 5, height: 5},
    top: -50,
  },
  instructions: {
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
    color: 'white',
  },
  tImage: {
    height:186, 
    width:141,
  },
});



export default MainScreen