import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';

const VideoPlayer = ({navigation, route}) => {

    const video = route.params
    
    // The video we will play on the player.
    //const video = require('../assets/video.mp4');
    
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);
    

    const url = `http://localhost:1337${video.videoUrl[0].url}`

    

    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };

    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
    };

    return (
        <View >
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onReplay ={onReplay}
                onProgress={onProgress}
                paused={paused}
                
                ref={(ref) => (videoPlayer.current = ref)}
                
                source={{uri:url}}
                style={styles.backgroundVideo}
            />
            <MediaControls
                isFullScreen={true}
                duration={duration}
                isLoading={isLoading}
                progress={currentTime}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={"red"}
                playerState={playerState}
                sliderStyle={{ containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            />

            
        </View>

    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: 450,
        width: '100%',
    },
    mediaControls: {
        height: '100%',
        flex: 1,
        alignSelf: 'center',
    },
    player:{
        flex:1,
        alignItems:'center',
        height: 350,
        width: '100%',

    }
});

export default VideoPlayer;