// apps/mobile/src/screens/CourseScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/theme';
// 1. 引入我们之前创建的 API 服务和共享类型
import { getCourses } from '../services/api'; 
import { Course } from '@steam/types';

const CourseScreen: React.FC = () => {
  const navigation = useNavigation();

  // 2. 删除所有写死的课程数组（featuredCourses, popularCourses）

  // 3. 添加三个状态来管理数据、加载和错误
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. 使用 useEffect 在组件加载时从 API 获取数据
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await getCourses();
        console.log(fetchedCourses);
        setCourses(fetchedCourses);
      } catch (e) {
        setError('获取课程失败，请稍后重试。');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // 空依赖数组确保这个 effect 只运行一次

  // 静态数据可以保留，因为它们是UI的一部分
  const courseCategories = [
    { id: '1', name: '科学', icon: 'flask-outline' as const, color: theme.colors.science },
    { id: '2', name: '技术', icon: 'laptop-outline' as const, color: theme.colors.technology },
    { id: '3', name: '工程', icon: 'construct-outline' as const, color: theme.colors.engineering },
    { id: '4', name: '艺术', icon: 'brush-outline' as const, color: theme.colors.arts },
    { id: '5', name: '数学', icon: 'calculator-outline' as const, color: theme.colors.mathematics },
    { id: '6', name: '全部', icon: 'apps-outline' as const, color: theme.colors.textSecondary },
  ];

  // 我们可以从获取到的课程中动态生成精选和热门列表
  const featuredCourses = courses.slice(0, 2);
  const popularCourses = courses.slice(2, 5);
  
  // (renderStars 函数保持不变，这里省略以保持简洁)
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={12} color="#fbbf24" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={12} color="#fbbf24" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#fbbf24" />);
    }
    return stars;
  };


  // 5. 根据加载和错误状态显示不同的UI
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text>正在加载课程...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 (保持不变) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>课程中心</Text>
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
        {/* 课程分类 (保持不变) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>课程分类</Text>
          <View style={styles.categoriesGrid}>
            {courseCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 6. 修改精选课程和热门课程的渲染逻辑，使用从 state 中获取的数据 */}
        {/* 精选课程 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>精选课程</Text>
          {featuredCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.featuredCourse}>
              {/* 注意：后端目前没有图片，我们用一个占位图 */}
              <Image source={{ uri: `https://via.placeholder.com/800x450.png/ddd/333?text=${course.title}` }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <View style={styles.courseHeader}>
                  <View style={[styles.categoryTag, { backgroundColor: `${theme.colors.primary}20` }]}>
                    <Text style={[styles.categoryTagText, { color: theme.colors.primary }]}>
                      {course.category}
                    </Text>
                  </View>
                  {/* 注意：后端目前没有年龄范围，可以暂时隐藏或显示默认值 */}
                  <Text style={styles.ageRange}>8-12岁</Text> 
                </View>
                <Text style={styles.featuredTitle}>{course.title}</Text>
                <Text style={styles.featuredDescription}>{course.description}</Text>
                <View style={styles.courseFooter}>
                  <View style={styles.courseInfo}>
                     {/* 注意：后端目前没有评分等信息，我们显示占位信息 */}
                    <View style={styles.ratingContainer}>
                      <View style={styles.starsContainer}>{renderStars(4.5)}</View>
                      <Text style={styles.ratingText}>4.5</Text>
                    </View>
                    <Text style={styles.duration}>{course.duration}分钟</Text>
                    <Text style={styles.studentCount}>100+人已学习</Text>
                  </View>
                  <Text style={styles.price}>免费</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 热门课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {popularCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseContent}>
                <View style={styles.courseHeader}>
                  <View style={[styles.categoryTag, { backgroundColor: `${theme.colors.primary}20` }]}>
                    <Text style={[styles.categoryTagText, { color: theme.colors.primary }]}>
                      {course.category}
                    </Text>
                  </View>
                  <Text style={styles.ageRange}>8-12岁</Text>
                </View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.courseFooter}>
                  <View style={styles.courseInfo}>
                    <View style={styles.ratingContainer}>
                        <View style={styles.starsContainer}>{renderStars(4.7)}</View>
                        <Text style={styles.ratingText}>4.7</Text>
                    </View>
                    <Text style={styles.duration}>{course.duration}分钟</Text>
                    <Text style={styles.studentCount}>200+人已学习</Text>
                  </View>
                  <Text style={styles.price}>￥199</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  // ... (您的样式代码保持不变，这里省略)
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: theme.colors.surface, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: theme.colors.text },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 12, padding: 4 },
  scrollView: { flex: 1 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  seeAllText: { fontSize: 14, color: theme.colors.primary, fontWeight: '500' },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { width: '30%', alignItems: 'center', marginBottom: 16 },
  categoryIcon: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryName: { fontSize: 12, color: theme.colors.text, textAlign: 'center' },
  featuredCourse: { backgroundColor: theme.colors.surface, borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginBottom: 16 },
  featuredImage: { width: '100%', height: 180, resizeMode: 'cover' },
  featuredContent: { padding: 16 },
  courseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  categoryTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  categoryTagText: { fontSize: 12, fontWeight: '600' },
  ageRange: { fontSize: 12, color: theme.colors.textSecondary },
  featuredTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 },
  featuredDescription: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 12 },
  courseFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  courseInfo: { flex: 1 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  starsContainer: { flexDirection: 'row', marginRight: 4 },
  ratingText: { fontSize: 12, color: theme.colors.textSecondary, marginRight: 8 },
  duration: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 4 },
  studentCount: { fontSize: 12, color: theme.colors.textSecondary },
  price: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary },
  courseCard: { backgroundColor: theme.colors.surface, borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginBottom: 16 },
  courseContent: { padding: 16 },
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  errorText: { color: 'red', fontSize: 16 },
});

export default CourseScreen;