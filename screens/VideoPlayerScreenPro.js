import React, { useState, useRef } from 'react';
import { StyleSheet, View, Platform, Text} from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';


const data=[
    {
        id:20,
        name:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name_1:'Quinta',
        time:'4'
    
    },
    {
        id:20,
        name:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        name_1:'Dio',
        time:'4'
    
    },

    {
        id:20,
        name:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        name_1:'Miller',
        time:'4'
    
    },
    {
        id:20,
        name:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        name_1:'Prince',
        time:'4'
    
    }
]

const urll="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

const VideoPlayerScreenPro = ({navigation, route}) => {

    const video = route.params
    
    // The video we will play on the player.
    //const video = require('../assets/video.mp4');
    
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);
    
    const description=`${video.description}`
    const url = `${video.videoURL[0].url}`
    console.log("URLvalues", url)

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
        <View style={{flex:1,backgroundColor:'black'}}>
        <View style={{width:400,height:250 ,alignItems:'center', backgroundColor:"black"}}>
{/*            
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                
                onProgress={onProgress}
                paused={paused}
                // ref={(ref) => (videoPlayer.current = ref)}
                
                source={{uri:url}}
                style={styles.backgroundVideo}
            />
             <MediaControls
                isFullScreen={false}
                duration={duration}
                isLoading={isLoading}
                progress={currentTime}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={"purple"}
                playerState={playerState}
                sliderStyle={{ containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            />  */}

            

                <VideoPlayer
                    source={{uri:url}}
                    disableFullscreen={false} 
                    resizeMode={"contain"}
                    seekColor={"#50A5F4"}        
                    navigator={navigation}
                    disableVolume={true}
                    // muted={true}  
                    onEnterFullscreen={true}                        
                />
            <Text style={{color:"white"}}>{description}</Text>


           
        </View>

        </View>



     

    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: 300,
        width:400,
        
        backgroundColor: "black"
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

export default VideoPlayerScreenPro;