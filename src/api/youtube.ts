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

interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
}

// Popular cooking channels
const COOKING_CHANNELS = [
  'UCJFp8uSYCjXOMnkUyb3CQ3Q', // Tasty
  'UC6S5a3MQtr_PSWZxysXkOCg', // Joshua Weissman
  'UCr_eq-9zGgMot8-OzcF8rLA', // Binging with Babish
  'UCxAS_aK7sS2x_bqnlJHDSHw', // Gordon Ramsay
  'UCJFp8uSYCjXOMnkUyb3CQ3Q', // Bon Appetit
];

// Specific cooking-related keywords
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

  static getInstance(): YouTubeAPI {
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

  private getRandomKeywords(count: number = 1): string[] {
    const shuffled = [...SEARCH_KEYWORDS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async fetchVideos(isRefresh: boolean = false): Promise<{ videos: YouTubeVideo[]; hasMore: boolean }> {
    try {
      if (this.isLoading) {
        return { videos: [], hasMore: false };
      }

      this.isLoading = true;

      // Reset page token if refreshing
      if (isRefresh) {
        this.nextPageToken = null;
        this.currentChannelIndex = 0;
      }

      // If we don't have more pages and it's not a refresh, return empty
      if (!this.nextPageToken && !isRefresh) {
        return { videos: [], hasMore: false };
      }

      const channelId = this.getNextChannel();
      const keyword = this.getRandomKeywords(1)[0];

      const response = await axios.get<YouTubeSearchResponse>(`${YOUTUBE_API_BASE_URL}/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: keyword,
          type: 'video',
          videoDuration: 'short',
          videoEmbeddable: true,
          key: YOUTUBE_API_KEY,
          pageToken: this.nextPageToken || undefined,
          regionCode: 'US',
          relevanceLanguage: 'en',
          safeSearch: 'strict',
          channelId: channelId,
          order: 'relevance', // Changed to relevance for better results
          videoDefinition: 'high',
          fields: 'items(id/videoId,snippet(title,description,channelTitle,thumbnails)),nextPageToken'
        }
      });

      this.nextPageToken = response.data.nextPageToken || null;

      // Filter out videos without proper IDs or snippets
      const validVideos = response.data.items.filter(
        video => video.id?.videoId && 
                video.snippet?.title &&
                (
                  video.snippet.title.toLowerCase().includes('cook') ||
                  video.snippet.title.toLowerCase().includes('recipe') ||
                  video.snippet.title.toLowerCase().includes('food') ||
                  video.snippet.title.toLowerCase().includes('make') ||
                  video.snippet.description.toLowerCase().includes('recipe') ||
                  video.snippet.description.toLowerCase().includes('ingredients')
                )
      );

      return {
        videos: validVideos,
        hasMore: !!this.nextPageToken && validVideos.length > 0
      };
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  resetPageToken() {
    this.nextPageToken = null;
    this.currentChannelIndex = 0;
  }
}

export const youtubeAPI = YouTubeAPI.getInstance();
