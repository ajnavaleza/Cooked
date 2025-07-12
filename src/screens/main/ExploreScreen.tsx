import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Share,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { YouTubeVideo, youtubeAPI } from '../../api/youtube';
import { styles } from '../../styles/main/ExploreScreen.styles';

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;

const VIDEO_SCALING = {
  webview: {
    scale: 0.92,
    width: width,
    height: SCREEN_HEIGHT,
    position: {
      top: -15,
    }
  },
  iframe: {
    scale: 0.95,
    position: {
      top: '45%',
      left: '50%',
    }
  },
  video: {
    objectFit: 'cover',
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
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 0,
  });

  const loadVideos = async (refresh: boolean = false) => {
    try {
      if (refresh) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const response = await youtubeAPI.fetchVideos(refresh);
      const newVideos = response.videos.map(video => ({
        ...video,
        isBookmarked: false,
      }));
      if (refresh) {
        setVideos(newVideos);
        setCurrentIndex(0);
      } else {
        setVideos(prev => [...prev, ...newVideos]);
      }
      setHasMore(response.hasMore);
    } catch (error) {
      setVideos([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVideos(true);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadVideos(true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && videos.length > 0) {
      loadVideos();
    }
  };

  const handleShare = async (video: VideoItem) => {
    try {
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      await Share.share({
        message: `Check out this cooking video: ${video.snippet.title}\n${youtubeUrl}`,
        url: youtubeUrl,
      });
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      setCurrentIndex(visibleItem.index);
    }
  }, []);

  const getItemLayout = (_data: any, index: number) => ({
    length: SCREEN_HEIGHT,
    offset: SCREEN_HEIGHT * index,
    index,
  });

  const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => {
    const isCurrentVideo = index === currentIndex;

    return (
      <View style={[styles.videoContainer, {
        height: VIDEO_SCALING.webview.height,
        width: VIDEO_SCALING.webview.width,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: VIDEO_SCALING.webview.position.top }],
      }]}>
        <View style={[styles.videoPlayer, {
          width: VIDEO_SCALING.webview.width,
          height: VIDEO_SCALING.webview.height,
          overflow: 'hidden',
        }]}>
          <YoutubePlayer
            key={`${item.id.videoId}-${isCurrentVideo}`}
            height={VIDEO_SCALING.webview.height}
            width={VIDEO_SCALING.webview.width}
            play={isCurrentVideo}
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
              autoplay: 1,
              mute: 0
            }}
            webViewProps={{
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

                  video {
                    object-fit: ${VIDEO_SCALING.video.objectFit} !important;
                    width: 100% !important;
                    height: 100% !important;
                  }

                  /* Hide all YouTube UI elements */
                  .ytp-chrome-top,
                  .ytp-chrome-bottom,
                  .ytp-gradient-top,
                  .ytp-gradient-bottom,
                  .ytp-pause-overlay,
                  .ytp-youtube-button,
                  .ytp-watermark,
                  .ytp-embed,
                  .ytp-title-channel,
                  .ytp-title,
                  .ytp-share-button,
                  .ytp-watch-later-button,
                  .ytp-forward-button,
                  .ytp-prev-button,
                  .ytp-next-button,
                  .ytp-heat-map-container,
                  .ytp-ce-element,
                  .ytp-iv-player-content,
                  .ytp-gradient-bottom,
                  .ytp-chrome-controls,
                  .ytp-pause-overlay {
                    display: none !important;
                  }
                \`;
                document.head.appendChild(style);

                // Force autoplay
                const autoplayAndUnmute = () => {
                  const video = document.querySelector('video');
                  if (video) {
                    video.play();
                    video.muted = false;
                  }
                };

                // Try to autoplay immediately and after a short delay
                autoplayAndUnmute();
                setTimeout(autoplayAndUnmute, 1000);

                // Prevent any click events from pausing the video
                document.addEventListener('click', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }, true);
              `,
            }}
          />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ height: 50, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
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
      viewabilityConfig={viewabilityConfig.current}
      getItemLayout={getItemLayout}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default ExploreScreen;