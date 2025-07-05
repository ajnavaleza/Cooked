// YouTube API Types
export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
  };
}

// Mock data for development
export const mockCookingVideos: YouTubeVideo[] = [
  {
    id: { videoId: 'sc3-2mA7yn0' },
    snippet: {
      title: '5-Minute Pasta Recipe for Students',
      description: 'Quick and easy pasta recipe perfect for busy students!',
      channelTitle: 'CookingWithMaria'
    }
  },
  {
    id: { videoId: '83Orr-_eo-s' },
    snippet: {
      title: 'Ramen Hack That Will Change Your Life',
      description: 'Transform instant ramen into a gourmet meal with this simple trick!',
      channelTitle: 'StudentFoodHacks'
    }
  },
  {
    id: { videoId: 'oLJJQapdp1M' },
    snippet: {
      title: 'Microwave Mug Cake in 90 Seconds',
      description: 'Perfect dessert for your dorm room - no oven required!',
      channelTitle: 'DormDesserts'
    }
  }
];
