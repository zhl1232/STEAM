import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
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

  // 新增：动手实验室数据
  const experiments = [
    {
      id: '1',
      title: '瓶子里的彩虹',
      description: '用糖水制作密度分层彩虹',
      difficulty: 2,
      duration: 30,
      category: '化学',
      categoryColor: '#ef4444',
      materials: '厨房材料',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: '自制火山爆发',
      description: '小苏打和醋的化学反应',
      difficulty: 1,
      duration: 15,
      category: '化学',
      categoryColor: '#ef4444',
      materials: '厨房材料',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: '光的折射实验',
      description: '用水杯观察光的奇妙变化',
      difficulty: 2,
      duration: 25,
      category: '物理',
      categoryColor: '#3b82f6',
      materials: '简单道具',
      image: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      title: '植物生长观察',
      description: '种子发芽全过程记录',
      difficulty: 1,
      duration: 60,
      category: '生物',
      categoryColor: '#10b981',
      materials: '生活用品',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 新增：科学家故事数据
  const scientists = [
    {
      id: '1',
      name: '玛丽·居里',
      era: '1867-1934',
      field: '物理学家、化学家',
      summary: '首位女性诺贝尔奖获得者，发现了钋和镭元素',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: '#8b5cf6',
    },
    {
      id: '2',
      name: '阿尔伯特·爱因斯坦',
      era: '1879-1955',
      field: '理论物理学家',
      summary: '相对论的提出者，现代物理学的奠基人',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: '#3b82f6',
    },
    {
      id: '3',
      name: '查尔斯·达尔文',
      era: '1809-1882',
      field: '生物学家',
      summary: '进化论的创立者，改变了人类对生命的认知',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: '#10b981',
    },
    {
      id: '4',
      name: '牛顿',
      era: '1643-1727',
      field: '物理学家',
      summary: '发现万有引力定律，奠定了经典力学基础',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: '#f59e0b',
    },
  ];

  // 新增：本周科学挑战数据
  const weeklyChallenge = {
    id: '1',
    title: '意大利面棉花糖挑战',
    description: '用意大利面条和棉花糖建造最高的塔！考验你的工程思维和创造力。',
    materials: ['生意大利面条 20根', '棉花糖 1包', '胶带 1卷', '剪刀 1把'],
    goal: '在30分钟内建造最高且能承受棉花糖重量的塔',
    difficulty: 3,
    participants: 128,
    timeLeft: '3天',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const scienceActivities = [
    {
      id: '1',
      title: '全国青少年科学实验大赛',
      description: '展示你的创新科学项目，与全国的科学爱好者交流',
      dateRange: '2024年6月15日 - 2024年6月30日',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: '2',
      title: '科学博物馆夜间探索',
      description: '在夜晚探索科学博物馆，体验不一样的科学之旅',
      dateRange: '2024年5月20日 - 2024年5月21日',
      image: 'https://images.unsplash.com/photo-1518709268805-4927c1f0103c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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

  const renderDifficulty = (level: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons 
          key={i} 
          name={i <= level ? "star" : "star-outline"} 
          size={10} 
          color="#f59e0b" 
        />
      );
    }
    return stars;
  };

  const renderExperimentCard = ({ item }: { item: typeof experiments[0] }) => (
    <TouchableOpacity style={styles.experimentCard}>
      <Image source={{ uri: item.image }} style={styles.experimentImage} />
      <View style={styles.experimentContent}>
        <View style={styles.experimentHeader}>
          <View style={[styles.categoryTag, { backgroundColor: `${item.categoryColor}20` }]}>
            <Text style={[styles.categoryTagText, { color: item.categoryColor }]}>
              {item.category}
            </Text>
          </View>
          <View style={styles.materialTag}>
            <Text style={styles.materialTagText}>{item.materials}</Text>
          </View>
        </View>
        <Text style={styles.experimentTitle}>{item.title}</Text>
        <Text style={styles.experimentDescription}>{item.description}</Text>
        <View style={styles.experimentMeta}>
          <View style={styles.difficultyContainer}>
            <Text style={styles.metaLabel}>难度：</Text>
            <View style={styles.starsContainer}>
              {renderDifficulty(item.difficulty)}
            </View>
          </View>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={12} color={theme.colors.textSecondary} />
            <Text style={styles.durationText}>{item.duration}分钟</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderScientistCard = ({ item }: { item: typeof scientists[0] }) => (
    <TouchableOpacity style={styles.scientistCard}>
      <Image source={{ uri: item.avatar }} style={styles.scientistAvatar} />
      <View style={styles.scientistContent}>
        <Text style={styles.scientistName}>{item.name}</Text>
        <Text style={styles.scientistEra}>{item.era}</Text>
        <View style={[styles.fieldTag, { backgroundColor: `${item.color}20` }]}>
          <Text style={[styles.fieldTagText, { color: item.color }]}>
            {item.field}
          </Text>
        </View>
        <Text style={styles.scientistSummary} numberOfLines={2}>
          {item.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        {/* 顶部Banner - 热门科学课程 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日推荐</Text>
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

        {/* 动手实验室 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🧪 动手实验室</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={experiments}
            renderItem={renderExperimentCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
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

        {/* 科学家故事 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>👨‍🔬 科学家故事</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={scientists}
            renderItem={renderScientistCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* 本周科学挑战 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 本周科学挑战</Text>
          <TouchableOpacity style={styles.challengeCard}>
            <Image source={{ uri: weeklyChallenge.image }} style={styles.challengeImage} />
            <View style={styles.challengeContent}>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{weeklyChallenge.title}</Text>
                  <View style={styles.challengeMeta}>
                    <View style={styles.difficultyContainer}>
                      <Text style={styles.metaLabel}>难度：</Text>
                      <View style={styles.starsContainer}>
                        {renderDifficulty(weeklyChallenge.difficulty)}
                      </View>
                    </View>
                    <Text style={styles.timeLeft}>剩余 {weeklyChallenge.timeLeft}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.challengeDescription}>{weeklyChallenge.description}</Text>
              
              <View style={styles.materialsSection}>
                <Text style={styles.materialsTitle}>所需材料：</Text>
                {weeklyChallenge.materials.map((material, index) => (
                  <Text key={index} style={styles.materialItem}>• {material}</Text>
                ))}
              </View>

              <View style={styles.challengeStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={16} color={theme.colors.primary} />
                  <Text style={styles.statText}>{weeklyChallenge.participants}人参与</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.joinChallengeButton}>
                <Text style={styles.joinChallengeButtonText}>参与挑战</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
  horizontalList: {
    paddingRight: theme.spacing.md,
  },
  // 动手实验室样式
  experimentCard: {
    width: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  experimentImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  experimentContent: {
    padding: theme.spacing.sm,
  },
  experimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  materialTag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  materialTagText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  experimentTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  experimentDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  experimentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginRight: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  // 科学家故事样式
  scientistCard: {
    width: 160,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  scientistAvatar: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  scientistContent: {
    padding: theme.spacing.sm,
  },
  scientistName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  scientistEra: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  fieldTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  fieldTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  scientistSummary: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  // 本周科学挑战样式
  challengeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  challengeImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  challengeContent: {
    padding: theme.spacing.md,
  },
  challengeHeader: {
    marginBottom: theme.spacing.sm,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  challengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLeft: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
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
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  materialItem: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  challengeStats: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  statText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  joinChallengeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinChallengeButtonText: {
    color: 'white',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    marginRight: theme.spacing.xs,
  },
  courseCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
  },
  courseImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  courseContent: {
    flex: 1,
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
    marginBottom: theme.spacing.md,
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