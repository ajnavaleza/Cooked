import axios from 'axios';

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails?: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
  };
}

const COOKING_CHANNELS = [
  'UCJFp8uSYCjXOMnkUyb3CQ3Q', // Tasty
  'UC6S5a3MQtr_PSWZxysXkOCg', // Joshua Weissman
  'UCr_eq-9zGgMot8-OzcF8rLA', // Binging with Babish
  'UCxAS_aK7sS2x_bqnlJHDSHw', // Gordon Ramsay
  'UCJFp8uSYCjXOMnkUyb3CQ3Q', // Bon Appetit
];

const SEARCH_KEYWORDS = [
  'recipe tutorial',
  'cooking tutorial',
  'how to cook',
  'easy recipe',
  'cooking guide',
  'food preparation',
  'cooking tips',
  'homemade cooking'
];

class YouTubeAPI {
  private static instance: YouTubeAPI;
  private nextPageToken: string | null = null;
  private isLoading: boolean = false;
  private currentChannelIndex: number = 0;

  private constructor() {}

  public static getInstance(): YouTubeAPI {
    if (!YouTubeAPI.instance) {
      YouTubeAPI.instance = new YouTubeAPI();
    }
    return YouTubeAPI.instance;
  }

  private getNextChannel(): string {
    const channel = COOKING_CHANNELS[this.currentChannelIndex];
    this.currentChannelIndex = (this.currentChannelIndex + 1) % COOKING_CHANNELS.length;
    return channel;
  }

  private getRandomKeywords(count: number): string[] {
    return SEARCH_KEYWORDS
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  async fetchVideos(isRefresh: boolean = false): Promise<{ videos: YouTubeVideo[]; hasMore: boolean }> {
    if (this.isLoading) {
      return { videos: [], hasMore: false };
    }

    try {
      this.isLoading = true;

      if (isRefresh) {
        this.nextPageToken = null;
        this.currentChannelIndex = 0;
      }

      if (!this.nextPageToken && !isRefresh) {
        return { videos: [], hasMore: false };
      }

      const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: this.getRandomKeywords(1)[0],
          type: 'video',
          videoDuration: 'short',
          videoEmbeddable: true,
          key: YOUTUBE_API_KEY,
          pageToken: this.nextPageToken || undefined,
          regionCode: 'US',
          relevanceLanguage: 'en',
          safeSearch: 'strict',
          channelId: this.getNextChannel(),
          order: 'relevance',
          videoDefinition: 'high',
          fields: 'items(id/videoId,snippet(title,description,channelTitle,thumbnails)),nextPageToken'
        }
      });

      this.nextPageToken = response.data.nextPageToken || null;
      return {
        videos: response.data.items || [],
        hasMore: !!this.nextPageToken
      };
    } catch (error) {
      console.error('YouTube API Error:', error);
      return { videos: [], hasMore: false };
    } finally {
      this.isLoading = false;
    }
  }
}

export const youtubeAPI = YouTubeAPI.getInstance();
