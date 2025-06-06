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
import { theme } from '../utils/theme';

const EngineeringScreen: React.FC = () => {
  const engineeringCategories = [
    { id: '1', name: '结构工程', description: '桥梁、建筑、塔楼', icon: 'business-outline' as const, color: theme.colors.primary },
    { id: '2', name: '电气工程', description: '电路、电子设计', icon: 'flash-outline' as const, color: theme.colors.success },
    { id: '3', name: '航空航天', description: '火箭、飞行器设计', icon: 'rocket-outline' as const, color: theme.colors.warning },
    { id: '4', name: '机械工程', description: '机械设计与制造', icon: 'settings-outline' as const, color: theme.colors.error },
  ];

  const engineeringCourses = [
    {
      id: '1',
      title: '桥梁设计与结构力学基础',
      category: '结构工程',
      categoryColor: theme.colors.primary,
      ageRange: '10-16岁',
      rating: 4.8,
      reviewCount: 486,
      description: '了解桥梁设计原理，动手制作不同类型的桥梁模型',
      image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: '2',
      title: '简单机械原理与应用',
      category: '机械工程',
      categoryColor: theme.colors.error,
      ageRange: '12-18岁',
      rating: 4.7,
      reviewCount: 342,
      description: '通过实践项目学习杠杆、滑轮、齿轮等简单机械原理',
    },
  ];

  const materials = ['纸板', '竹签', '橡皮筋', '胶带', '剪刀'];

  const studentProjects = [
    {
      id: '1',
      title: '自动浇水系统',
      author: '张明',
      age: 15,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612387290123-34af734b5f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: '风力发电模型',
      author: '李华',
      age: 16,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1568910748155-01ca989dbdd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
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
        <Text style={styles.headerTitle}>工程设计</Text>
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
        {/* 顶部轮播 */}
        <View style={styles.section}>
          <View style={styles.featuredCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredContent}>
              <View style={styles.offerBadge}>
                <Text style={styles.offerBadgeText}>限时优惠</Text>
              </View>
              <Text style={styles.featuredTitle}>青少年工程设计挑战营</Text>
              <Text style={styles.featuredDescription}>
                设计并制作你自己的桥梁、塔楼和结构，学习工程力学基础知识
              </Text>
              <TouchableOpacity style={styles.enrollButton}>
                <Text style={styles.enrollButtonText}>立即报名</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 工程类别 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>工程类别</Text>
          <View style={styles.categoriesGrid}>
            {engineeringCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 热门工程课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门工程课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {engineeringCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              {course.image && (
                <Image source={{ uri: course.image }} style={styles.courseImage} />
              )}
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
                <View style={styles.courseFooter}>
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {renderStars(course.rating)}
                    </View>
                    <Text style={styles.ratingText}>
                      {course.rating} | {course.reviewCount}人已学习
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 本周工程挑战 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>本周工程挑战</Text>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>设计一个抗震建筑模型</Text>
            <Text style={styles.challengeDescription}>
              使用日常材料设计一个能够在模拟地震环境下保持稳定的建筑模型
            </Text>
            
            <View style={styles.materialsSection}>
              <Text style={styles.materialsTitle}>所需材料：</Text>
              <View style={styles.materialsContainer}>
                {materials.map((material, index) => (
                  <View key={index} style={styles.materialTag}>
                    <Text style={styles.materialText}>{material}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.difficultySection}>
              <Text style={styles.difficultyTitle}>难度级别：</Text>
              <View style={styles.difficultyStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={16}
                    color={star <= 3 ? "#fbbf24" : "#e5e5e5"}
                  />
                ))}
              </View>
            </View>
            
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>参与挑战</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 学生工程项目展示 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>学生工程项目展示</Text>
          <View style={styles.projectsGrid}>
            {studentProjects.map((project) => (
              <TouchableOpacity key={project.id} style={styles.projectCard}>
                <Image source={{ uri: project.image }} style={styles.projectImage} />
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectAuthor}>
                    {project.author} - {project.age}岁
                  </Text>
                  <View style={styles.projectRating}>
                    <Ionicons name="star" size={12} color="#fbbf24" />
                    <Text style={styles.projectRatingText}>{project.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  section: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  featuredCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: theme.spacing.md,
  },
  offerBadge: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  offerBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: '#FFFFFF',
  },
  featuredTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  featuredDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  enrollButton: {
    backgroundColor: theme.colors.warning,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
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
  categoriesGrid: {
    gap: theme.spacing.sm,
  },
  categoryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  categoryDescription: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
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
    height: 180,
    resizeMode: 'cover',
  },
  courseContent: {
    padding: theme.spacing.md,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
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
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  courseDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
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
  challengeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  challengeTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  challengeDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  materialsSection: {
    marginBottom: theme.spacing.md,
  },
  materialsTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  materialTag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  materialText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
  },
  difficultySection: {
    marginBottom: theme.spacing.md,
  },
  difficultyTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  difficultyStars: {
    flexDirection: 'row',
    gap: 2,
  },
  challengeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  challengeButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  projectsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectCard: {
    width: '47%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  projectImage: {
    width: '100%',
    height: 128,
    resizeMode: 'cover',
  },
  projectContent: {
    padding: theme.spacing.sm,
  },
  projectTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  projectAuthor: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  projectRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectRatingText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
    marginLeft: 2,
  },
});

export default EngineeringScreen;