import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';
import { sharedStyles } from './shared.styles';

const { width } = Dimensions.get('window');

// Adjustable overlay positions - modify these to move the overlay
const OVERLAY_BOTTOM = 0; // Distance from bottom (0 means at bottom)
const OVERLAY_SIDE_PADDING = 20; // Padding from left and right edges
const OVERLAY_VERTICAL_PADDING = {
  top: 40,    // Padding at the top of the overlay
  bottom: 110 // Padding at the bottom of the overlay
};

export const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.containerDark,
  },
  
  // Loading states
  loadingContainer: {
    ...sharedStyles.loadingContainer,
    ...sharedStyles.loadingContainerDark,
  },
  loadingText: {
    ...sharedStyles.loadingText,
    ...sharedStyles.loadingTextDark,
  },
 
  // Video container
  videoContainer: {
    width: width,
    backgroundColor: '#000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  videoPlayer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
 
  // Video info overlay
  videoInfoOverlay: {
    position: 'absolute',
    bottom: OVERLAY_BOTTOM,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: OVERLAY_SIDE_PADDING,
    paddingTop: OVERLAY_VERTICAL_PADDING.top,
    paddingBottom: OVERLAY_VERTICAL_PADDING.bottom,
    zIndex: 50,
  },
  videoInfo: {
    flex: 1,
    paddingRight: 20,
  },
  videoTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
    fontFamily: typography.fonts.semiBold,
    lineHeight: 22,
  },
  channelName: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
    fontFamily: typography.fonts.regular,
    opacity: 0.9,
  },
  videoDescription: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 12,
    fontFamily: typography.fonts.regular,
    opacity: 0.8,
    lineHeight: 18,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtag: {
    fontSize: 14,
    color: '#FFF',
    marginRight: 8,
    fontFamily: typography.fonts.regular,
    opacity: 0.9,
  },
 
  // Action buttons
  actionButtons: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
    minWidth: 50,
  },
  actionText: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 4,
    fontFamily: typography.fonts.regular,
    textAlign: 'center',
  }
});
