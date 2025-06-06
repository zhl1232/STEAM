export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'science' | 'technology' | 'engineering' | 'arts' | 'mathematics';
  ageRange: string;
  rating: number;
  reviewCount: number;
  price: number | 'free';
  image: string;
  duration: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'online' | 'offline' | 'hybrid';
  image: string;
  participants: number;
  maxParticipants: number;
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  joinDate: string;
  completedCourses: number;
  achievements: Achievement[];
  level: number;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
}

export interface STEAMCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
} 