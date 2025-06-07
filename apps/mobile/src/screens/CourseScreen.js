import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/theme';
const CourseScreen = () => {
    const navigation = useNavigation();
    const courseCategories = [
        { id: '1', name: '科学', icon: 'flask-outline', color: theme.colors.science },
        { id: '2', name: '技术', icon: 'laptop-outline', color: theme.colors.technology },
        { id: '3', name: '工程', icon: 'construct-outline', color: theme.colors.engineering },
        { id: '4', name: '艺术', icon: 'brush-outline', color: theme.colors.arts },
        { id: '5', name: '数学', icon: 'calculator-outline', color: theme.colors.mathematics },
        { id: '6', name: '全部', icon: 'apps-outline', color: theme.colors.textSecondary },
    ];
    const featuredCourses = [
        {
            id: '1',
            title: 'Scratch编程入门：制作动画和游戏',
            description: '通过可视化编程学习基础编程概念，培养逻辑思维能力',
            category: '技术',
            categoryColor: theme.colors.technology,
            ageRange: '6-12岁',
            duration: '8周课程',
            rating: 4.9,
            studentCount: 1234,
            price: '免费',
            image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
        {
            id: '2',
            title: '3D打印与设计思维',
            description: '学习3D建模和打印技术，培养空间想象力和设计思维',
            category: '工程',
            categoryColor: theme.colors.engineering,
            ageRange: '10-16岁',
            duration: '6周课程',
            rating: 4.8,
            studentCount: 856,
            price: '￥299',
            image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
    ];
    const popularCourses = [
        {
            id: '3',
            title: '数字艺术创作基础',
            category: '艺术',
            categoryColor: theme.colors.arts,
            ageRange: '8-14岁',
            duration: '4周课程',
            rating: 4.7,
            studentCount: 567,
            price: '￥199',
        },
        {
            id: '4',
            title: '趣味数学思维训练',
            category: '数学',
            categoryColor: theme.colors.mathematics,
            ageRange: '6-10岁',
            duration: '10周课程',
            rating: 4.6,
            studentCount: 423,
            price: '￥399',
        },
        {
            id: '5',
            title: '机器人编程与控制',
            category: '技术',
            categoryColor: theme.colors.technology,
            ageRange: '12-18岁',
            duration: '12周课程',
            rating: 4.9,
            studentCount: 789,
            price: '￥599',
        },
    ];
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Ionicons key={i} name="star" size={12} color="#fbbf24"/>);
        }
        if (hasHalfStar) {
            stars.push(<Ionicons key="half" name="star-half" size={12} color="#fbbf24"/>);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#fbbf24"/>);
        }
        return stars;
    };
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>课程中心</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color={theme.colors.text}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color={theme.colors.text}/>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 课程分类 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>课程分类</Text>
          <View style={styles.categoriesGrid}>
            {courseCategories.map((category) => (<TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={24} color={category.color}/>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>))}
          </View>
        </View>

        {/* 精选课程 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>精选课程</Text>
          {featuredCourses.map((course) => (<TouchableOpacity key={course.id} style={styles.featuredCourse} onPress={() => {
                console.log('导航到课程详情页面', course.id);
                // navigation.navigate('CourseDetail', { courseId: course.id });
            }}>
              <Image source={{ uri: course.image }} style={styles.featuredImage}/>
              <View style={styles.featuredContent}>
                <View style={styles.courseHeader}>
                  <View style={[styles.categoryTag, { backgroundColor: `${course.categoryColor}20` }]}>
                    <Text style={[styles.categoryTagText, { color: course.categoryColor }]}>
                      {course.category}
                    </Text>
                  </View>
                  <Text style={styles.ageRange}>{course.ageRange}</Text>
                </View>
                <Text style={styles.featuredTitle}>{course.title}</Text>
                <Text style={styles.featuredDescription}>{course.description}</Text>
                <View style={styles.courseFooter}>
                  <View style={styles.courseInfo}>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starsContainer}>
                        {renderStars(course.rating)}
                      </View>
                      <Text style={styles.ratingText}>{course.rating}</Text>
                    </View>
                    <Text style={styles.duration}>{course.duration}</Text>
                    <Text style={styles.studentCount}>{course.studentCount}人已学习</Text>
                  </View>
                  <Text style={styles.price}>{course.price}</Text>
                </View>
              </View>
            </TouchableOpacity>))}
        </View>

        {/* 热门课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {popularCourses.map((course) => (<TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => {
                console.log('导航到课程详情页面', course.id);
                // navigation.navigate('CourseDetail', { courseId: course.id });
            }}>
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
                  <View style={styles.courseInfo}>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starsContainer}>
                        {renderStars(course.rating)}
                      </View>
                      <Text style={styles.ratingText}>{course.rating}</Text>
                    </View>
                    <Text style={styles.duration}>{course.duration}</Text>
                    <Text style={styles.studentCount}>{course.studentCount}人已学习</Text>
                  </View>
                  <Text style={styles.price}>{course.price}</Text>
                </View>
              </View>
            </TouchableOpacity>))}
        </View>
      </ScrollView>
    </SafeAreaView>);
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
    courseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    courseInfo: {
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: theme.spacing.xs,
    },
    ratingText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        marginRight: theme.spacing.sm,
    },
    duration: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    studentCount: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    price: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
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
        marginBottom: theme.spacing.sm,
    },
});
export default CourseScreen;
