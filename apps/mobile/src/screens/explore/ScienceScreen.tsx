import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';

const ScienceScreen: React.FC = () => {
  const navigation = useNavigation();

  const scienceCategories = [
    { id: '1', name: '化学', icon: 'flask-outline' as const, color: '#ef4444' },
    { id: '2', name: '物理', icon: 'nuclear-outline' as const, color: '#3b82f6' },
    { id: '3', name: '生物', icon: 'leaf-outline' as const, color: '#10b981' },
    { id: '4', name: '地球科学', icon: 'earth-outline' as const, color: '#f59e0b' },
    { id: '5', name: '神经科学', icon: 'analytics-outline' as const, color: '#8b5cf6' },
    { id: '6', name: '更多分类', icon: 'apps-outline' as const, color: theme.colors.textSecondary },
  ];

  const scienceActivities = [
    {
      id: '1',
      title: '全国青少年科学实验大赛',
      description: '展示你的创新科学项目，与全国的科学爱好者交流',
      dateRange: '2023年6月15日 - 2023年6月30日',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  const scienceCourses = [
    {
      id: '1',
      title: '趣味物理实验：探索力与运动',
      description: '通过互动实验了解牛顿运动定律和基础物理概念',
      category: '物理',
      categoryColor: theme.colors.science,
      ageRange: '10-14岁',
      rating: 4.8,
      studentCount: 523,
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: '2',
      title: '植物生长与光合作用',
      description: '通过实验观察植物生长过程，了解光合作用原理',
      category: '生物',
      categoryColor: '#10b981',
      ageRange: '8-12岁',
      rating: 4.7,
      studentCount: 412,
    },
    {
      id: '3',
      title: '家庭安全化学实验集',
      description: '在家中安全进行的有趣化学实验，了解化学反应原理',
      category: '化学',
      categoryColor: '#ef4444',
      ageRange: '12-16岁',
      rating: 4.9,
      studentCount: 356,
    },
  ];

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
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>科学探索</Text>
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
        {/* 热门科学课程 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门科学课程</Text>
          <TouchableOpacity style={styles.featuredCourse}>
            <Image
              source={{
                uri: scienceCourses[0].image
              }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredContent}>
              <View style={styles.courseHeader}>
                <View style={[styles.categoryTag, { backgroundColor: `${scienceCourses[0].categoryColor}20` }]}>
                  <Text style={[styles.categoryTagText, { color: scienceCourses[0].categoryColor }]}>
                    {scienceCourses[0].category}
                  </Text>
                </View>
                <Text style={styles.ageRange}>{scienceCourses[0].ageRange}</Text>
              </View>
              <Text style={styles.featuredTitle}>{scienceCourses[0].title}</Text>
              <Text style={styles.featuredDescription}>{scienceCourses[0].description}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(scienceCourses[0].rating)}
                </View>
                <Text style={styles.ratingText}>
                  {scienceCourses[0].rating} | {scienceCourses[0].studentCount}人已学习
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 科学分类 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>科学分类</Text>
          <View style={styles.categoriesGrid}>
            {scienceCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 精选科学课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>精选科学课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {scienceCourses.slice(1).map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
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
                <Text style={styles.courseDescription}>{course.description}</Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.starsContainer}>
                    {renderStars(course.rating)}
                  </View>
                  <Text style={styles.ratingText}>
                    {course.rating} | {course.studentCount}人已学习
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 科学活动 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>近期科学活动</Text>
          {scienceActivities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <View style={styles.activityDate}>
                  <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} style={styles.dateIcon} />
                  <Text style={styles.dateText}>{activity.dateRange}</Text>
                </View>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>立即报名</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  backButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
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
  featuredCourse: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
    marginBottom: theme.spacing.md,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: theme.spacing.md,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  ageRange: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  featuredTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featuredDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
    marginBottom: theme.spacing.md,
  },
  courseContent: {
    padding: theme.spacing.md,
  },
  courseTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  courseDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  activityImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  activityContent: {
    padding: theme.spacing.md,
  },
  activityTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  activityDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  activityDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  dateIcon: {
    marginRight: theme.spacing.xs,
  },
  dateText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
});

export default ScienceScreen; 