import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

// 模拟数据
const steamCategories = [
  {
    id: '1',
    name: '科学',
    icon: 'flask-outline' as const,
    color: theme.colors.science,
  },
  {
    id: '2',
    name: '技术',
    icon: 'laptop-outline' as const,
    color: theme.colors.technology,
  },
  {
    id: '3',
    name: '工程',
    icon: 'construct-outline' as const,
    color: theme.colors.engineering,
  },
  {
    id: '4',
    name: '艺术',
    icon: 'brush-outline' as const,
    color: theme.colors.arts,
  },
  {
    id: '5',
    name: '数学',
    icon: 'calculator-outline' as const,
    color: theme.colors.mathematics,
  },
];

const recommendedCourses = [
  {
    id: '1',
    title: '编程启蒙：创造你的第一个游戏',
    category: '技术',
    categoryColor: theme.colors.technology,
    ageRange: '8-12岁',
    rating: 4.5,
    reviewCount: 128,
    price: '免费',
    image: 'https://images.unsplash.com/photo-1544819667-9bfc1de23d4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    title: '家庭科学实验：探索化学反应',
    category: '科学',
    categoryColor: theme.colors.science,
    ageRange: '6-10岁',
    rating: 5.0,
    reviewCount: 94,
    price: '免费',
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const popularActivities = [
  {
    id: '1',
    title: '2024青少年机器人大赛',
    date: '7月15日 - 7月20日',
    location: '线上 + 线下',
    badge: '热门',
    badgeColor: '#ef4444',
    image: 'https://images.unsplash.com/photo-1581382575275-97901c2635b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    title: '数字艺术创作工作坊',
    date: '8月5日 - 8月10日',
    location: '线上课程',
    badge: '新活动',
    badgeColor: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '3',
    title: '未来科学家展览会',
    date: '9月12日 - 9月15日',
    location: '北京 · 科技馆',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleCategoryPress = (category: any) => {
    console.log('Category pressed:', category.name);
    
    // 根据分类名称进行导航
    switch (category.name) {
      case '科学':
        // 如果有导航，使用导航跳转，否则显示提示
        if (navigation) {
          navigation.navigate('Science');
        } else {
          console.log('导航到科学页面');
        }
        break;
      case '技术':
        if (navigation) {
          navigation.navigate('Technology');
        } else {
          console.log('导航到技术页面');
        }
        break;
      case '工程':
        if (navigation) {
          navigation.navigate('Engineering');
        } else {
          console.log('导航到工程页面');
        }
        break;
      case '艺术':
        if (navigation) {
          navigation.navigate('Art');
        } else {
          console.log('导航到艺术页面');
        }
        break;
      case '数学':
        if (navigation) {
          navigation.navigate('Mathematics');
        } else {
          console.log('导航到数学页面');
        }
        break;
      default:
        console.log('未知分类:', category.name);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={12} color="#fbbf24" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#fbbf24" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#fbbf24" />
      );
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部标题栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>探索</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 轮播图 */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerImageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              }}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>创新科学实验营</Text>
              <Text style={styles.bannerSubtitle}>探索科学的奥秘，激发创新思维</Text>
            </View>
          </View>
        </View>

        {/* 探索领域 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>探索领域</Text>
          <View style={styles.categoriesContainer}>
            {steamCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: `${category.color}20` },
                  ]}
                >
                  <Ionicons
                    name={category.icon}
                    size={24}
                    color={category.color}
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 推荐课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>推荐课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {recommendedCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard} activeOpacity={0.8}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              <View style={styles.courseContent}>
                <View style={styles.courseHeader}>
                  <View style={[styles.categoryTag, { backgroundColor: `${course.categoryColor}20` }]}>
                    <Text style={[styles.categoryTagText, { color: course.categoryColor }]}>
                      {course.category}
                    </Text>
                  </View>
                  <Text style={styles.ageRange}>{course.ageRange}</Text>
                </View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.courseFooter}>
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {renderStars(course.rating)}
                    </View>
                    <Text style={styles.ratingText}>
                      {course.rating} ({course.reviewCount})
                    </Text>
                  </View>
                  <Text style={styles.price}>{course.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 热门活动 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门活动</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.activitiesContainer}
          >
            {popularActivities.map((activity) => (
              <TouchableOpacity key={activity.id} style={styles.activityCard} activeOpacity={0.8}>
                <View style={styles.activityImageContainer}>
                  <Image source={{ uri: activity.image }} style={styles.activityImage} />
                  {activity.badge && (
                    <View style={[styles.activityBadge, { backgroundColor: activity.badgeColor }]}>
                      <Text style={styles.activityBadgeText}>{activity.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                  <View style={styles.activityLocationContainer}>
                    <Ionicons name="location-outline" size={12} color={theme.colors.textSecondary} />
                    <Text style={styles.activityLocation}>{activity.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  bannerImageContainer: {
    height: 192,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing.md,
  },
  bannerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
  },
  bannerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  seeAllText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryName: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  courseCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  courseImage: {
    width: '100%',
    height: 128,
    resizeMode: 'cover',
  },
  courseContent: {
    padding: theme.spacing.sm,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  categoryTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  ageRange: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  courseTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
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
  activitiesContainer: {
    paddingRight: theme.spacing.md,
  },
  activityCard: {
    width: 256,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  activityImageContainer: {
    position: 'relative',
  },
  activityImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  activityBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  activityBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
  },
  activityContent: {
    padding: theme.spacing.sm,
  },
  activityTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  activityDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  activityLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  activityLocation: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
});

export default HomeScreen; 