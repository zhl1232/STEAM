import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => {
  const getCategoryColor = (category: Course['category']) => {
    const colors = {
      science: theme.colors.science,
      technology: theme.colors.technology,
      engineering: theme.colors.engineering,
      arts: theme.colors.arts,
      mathematics: theme.colors.mathematics,
    };
    return colors[category];
  };

  const getCategoryName = (category: Course['category']) => {
    const names = {
      science: '科学',
      technology: '技术',
      engineering: '工程',
      arts: '艺术',
      mathematics: '数学',
    };
    return names[category];
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={12} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={12} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#FFD700" />);
    }

    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View 
            style={[
              styles.categoryTag, 
              { backgroundColor: `${getCategoryColor(course.category)}20` }
            ]}
          >
            <Text 
              style={[
                styles.categoryText, 
                { color: getCategoryColor(course.category) }
              ]}
            >
              {getCategoryName(course.category)}
            </Text>
          </View>
          <Text style={styles.ageRange}>{course.ageRange}</Text>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(course.rating)}
            </View>
            <Text style={styles.ratingText}>
              {course.rating} ({course.reviewCount})
            </Text>
          </View>
          <Text style={styles.price}>
            {course.price === 'free' ? '免费' : `¥${course.price}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  ageRange: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  price: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
}); 