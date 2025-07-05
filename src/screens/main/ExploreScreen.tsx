import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { YouTubeVideo, mockCookingVideos } from '../../api';
import { styles } from '../../styles/main/ExploreScreen.styles';


const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;


// Video scaling parameters - adjust these to fit the video on screen
const VIDEO_SCALING = {
  webview: {
    scale: 0.92,    // Overall webview scale (0.8 to 1.0)
    width: width,   // Width of the video container
    height: SCREEN_HEIGHT, // Height of the video container
    position: {
      top: -15,     // Negative moves up, positive moves down (in pixels)
    }
  },
  iframe: {
    scale: 0.95,    // Scale of the YouTube iframe (0.8 to 1.0)
    position: {
      top: '45%',   // Percentage from top (lower percentage = higher position)
      left: '50%',  // Horizontal position from left
    }
  },
  video: {
    objectFit: 'cover', // 'contain' shows full video, 'cover' fills screen but might crop
  }
};


interface VideoItem extends YouTubeVideo {
  isBookmarked: boolean;
}


const ExploreScreen = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);


  useEffect(() => {
    loadVideos();
  }, []);


  useEffect(() => {
    if (videos.length > 0 && currentIndex < videos.length) {
      const currentVideo = videos[currentIndex];
      setPlayingVideoId(currentVideo.id.videoId);
    }
  }, [currentIndex, videos]);


  const loadVideos = async (refresh: boolean = false) => {
    try {
      setLoading(true);
      // TODO: Replace mock data with actual YouTube API integration
      const mockVideos = mockCookingVideos.map((video: YouTubeVideo) => ({
        ...video,
        isBookmarked: false,
      }));

      setVideos(mockVideos);
      if (mockVideos.length > 0) {
        setCurrentIndex(0);
        setPlayingVideoId(mockVideos[0].id.videoId);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  const handleRefresh = () => {
    // TODO: Implement proper refresh functionality with actual API call
    setRefreshing(true);
    loadVideos(true);
  };


  const handleShare = async (video: VideoItem) => {
    try {
      // TODO: Add analytics tracking for video shares
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      await Share.share({
        message: `Check out this cooking video: ${video.snippet.title}\n${youtubeUrl}`,
        url: youtubeUrl,
      });
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };


  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      const newIndex = visibleItem.index;
      const newVideoId = visibleItem.item.id.videoId;
     
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setPlayingVideoId(newVideoId);
      }
    }
  };


  const viewabilityConfig = {
    itemVisiblePercentThreshold: 60,
    minimumViewTime: 100,
  };


  const getItemLayout = (data: any, index: number) => ({
    length: SCREEN_HEIGHT,
    offset: SCREEN_HEIGHT * index,
    index,
  });


  const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => {
    const isCurrentVideo = index === currentIndex;
    const shouldPlay = isCurrentVideo && playingVideoId === item.id.videoId;


    return (
      <View style={[styles.videoContainer, {
        height: VIDEO_SCALING.webview.height,
        width: VIDEO_SCALING.webview.width,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: VIDEO_SCALING.webview.position.top }], // Move entire container up/down
      }]}>
        <View style={[styles.videoPlayer, {
          width: VIDEO_SCALING.webview.width,
          height: VIDEO_SCALING.webview.height,
          overflow: 'hidden',
        }]}>
          <YoutubePlayer
            key={`${item.id.videoId}-${shouldPlay}`}
            height={VIDEO_SCALING.webview.height}
            width={VIDEO_SCALING.webview.width}
            play={shouldPlay}
            videoId={item.id.videoId}
            webViewStyle={{
              backgroundColor: '#000',
              opacity: 0.99,
              transform: [{ scale: VIDEO_SCALING.webview.scale }],
            }}
            initialPlayerParams={{
              controls: false,
              modestbranding: true,
              showinfo: false,
              rel: false,
              loop: true,
              playsinline: true,
              fs: false,
            }}
            webViewProps={{
              pointerEvents: 'none',
              allowsFullscreenVideo: false,
              scrollEnabled: false,
              bounces: false,
              injectedJavaScript: `
                const style = document.createElement('style');
                style.textContent = \`
                  body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background: #000 !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    pointer-events: none !important;
                    user-select: none !important;
                    -webkit-user-select: none !important;
                    -webkit-touch-callout: none !important;
                    height: 100vh !important;
                    width: 100vw !important;
                    overflow: hidden !important;
                  }


                  iframe {
                    position: absolute !important;
                    top: ${VIDEO_SCALING.iframe.position.top} !important;
                    left: ${VIDEO_SCALING.iframe.position.left} !important;
                    transform: translate(-50%, -50%) scale(${VIDEO_SCALING.iframe.scale}) !important;
                    width: 100vw !important;
                    height: 100vh !important;
                  }


                  /* Hide all YouTube UI elements */
                  .ytp-chrome-top, .ytp-chrome-bottom, .ytp-gradient-top,
                  .ytp-gradient-bottom, .ytp-pause-overlay, .ytp-youtube-button,
                  .ytp-embed, .ytp-embed-overlay, .ytp-title-channel,
                  .ytp-ce-element, .ytp-cards-button, .ytp-contextmenu,
                  .ytp-player-content, .ytp-bezel, .ytp-chrome-controls,
                  .ytp-spinner, .ytp-player-content-interactable {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                  }


                  video {
                    object-fit: ${VIDEO_SCALING.video.objectFit} !important;
                    width: 100% !important;
                    height: 100% !important;
                  }
                \`;
                document.head.appendChild(style);
               
                // Disable all interactions
                ['click', 'touchstart'].forEach(event => {
                  document.addEventListener(event, e => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }, true);
                });
              `,
            }}
          />
        </View>


        {/* Video Info Overlay */}
        <View style={[styles.videoInfoOverlay, {
          paddingBottom: 110, // Reduce bottom padding
          paddingTop: 40, // Add top padding
        }]}>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{item.snippet.title}</Text>
            <Text style={styles.channelName}>@{item.snippet.channelTitle}</Text>
            <Text style={styles.videoDescription} numberOfLines={2}>
              {item.snippet.description}
            </Text>
            <View style={styles.hashtagContainer}>
              <Text style={styles.hashtag}>#cooking</Text>
              <Text style={styles.hashtag}>#recipe</Text>
              <Text style={styles.hashtag}>#food</Text>
            </View>
          </View>


          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleShare(item)}
            >
              <Ionicons name="share-outline" size={30} color="#FFF" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C84B31" />
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.videoId}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#C84B31"
          />
        }
      />
    </View>
  );
};


export default ExploreScreen;