import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const CourseDetailScreen = () => {
    const navigation = useNavigation();
    const course = {
        id: '1',
        title: 'Scratch编程入门：制作动画和游戏',
        description: '通过可视化编程学习基础编程概念，培养逻辑思维能力。本课程将带领孩子们进入编程的奇妙世界，通过制作有趣的动画和游戏，让孩子们在玩乐中掌握编程的基础知识。',
        category: '技术',
        categoryColor: theme.colors.technology,
        ageRange: '6-12岁',
        duration: '8周课程',
        rating: 4.9,
        studentCount: 1234,
        price: '免费',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        instructor: {
            name: '李明老师',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            title: '资深编程教育专家',
            experience: '5年教学经验',
        },
        lessons: [
            { id: '1', title: '认识Scratch界面', duration: '30分钟', completed: true },
            { id: '2', title: '制作第一个动画', duration: '45分钟', completed: true },
            { id: '3', title: '角色移动控制', duration: '40分钟', current: true },
            { id: '4', title: '声音与音效', duration: '35分钟', upcoming: true },
            { id: '5', title: '背景与场景', duration: '50分钟', upcoming: true },
        ],
    };
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Ionicons key={i} name="star" size={14} color="#fbbf24"/>);
        }
        if (hasHalfStar) {
            stars.push(<Ionicons key="half" name="star-half" size={14} color="#fbbf24"/>);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#fbbf24"/>);
        }
        return stars;
    };
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>课程详情</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.text}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color={theme.colors.text}/>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 课程封面 */}
        <View style={styles.section}>
          <Image source={{ uri: course.image }} style={styles.courseImage}/>
          <View style={styles.courseOverlay}>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={32} color="#FFFFFF"/>
            </TouchableOpacity>
          </View>
        </View>

        {/* 课程信息 */}
        <View style={styles.section}>
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
          
          <View style={styles.courseStats}>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(course.rating)}
              </View>
              <Text style={styles.ratingText}>{course.rating}</Text>
            </View>
            <Text style={styles.duration}>{course.duration}</Text>
            <Text style={styles.studentCount}>{course.studentCount}人已学习</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{course.price}</Text>
            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.enrollButtonText}>立即报名</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 讲师信息 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>讲师介绍</Text>
          <View style={styles.instructorCard}>
            <Image source={{ uri: course.instructor.avatar }} style={styles.instructorAvatar}/>
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{course.instructor.name}</Text>
              <Text style={styles.instructorTitle}>{course.instructor.title}</Text>
              <Text style={styles.instructorExperience}>{course.instructor.experience}</Text>
            </View>
          </View>
        </View>

        {/* 课程大纲 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>课程大纲</Text>
          <View style={styles.lessonsContainer}>
            {course.lessons.map((lesson, index) => (<TouchableOpacity key={lesson.id} style={styles.lessonItem}>
                <View style={[
                styles.lessonIndicator,
                lesson.completed && styles.lessonCompleted,
                lesson.current && styles.lessonCurrent,
                lesson.upcoming && styles.lessonUpcoming,
            ]}>
                  {lesson.completed ? (<Ionicons name="checkmark" size={16} color="#FFFFFF"/>) : lesson.current ? (<Ionicons name="play" size={14} color="#FFFFFF"/>) : (<Text style={styles.lessonNumber}>{index + 1}</Text>)}
                </View>
                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                </View>
                <Ionicons name={lesson.completed ? "checkmark-circle" : lesson.current ? "play-circle" : "lock-closed"} size={20} color={lesson.completed ? theme.colors.success : lesson.current ? theme.colors.primary : theme.colors.textSecondary}/>
              </TouchableOpacity>))}
          </View>
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
    backButton: {
        padding: theme.spacing.xs,
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
    courseImage: {
        width: '100%',
        height: 220,
        borderRadius: theme.borderRadius.md,
        resizeMode: 'cover',
    },
    courseOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: theme.borderRadius.md,
        marginHorizontal: theme.spacing.md,
    },
    playButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    courseDescription: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        lineHeight: 22,
        marginBottom: theme.spacing.md,
    },
    courseStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.md,
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
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginRight: theme.spacing.md,
    },
    duration: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    studentCount: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
    },
    enrollButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.sm,
    },
    enrollButtonText: {
        color: '#FFFFFF',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    instructorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    instructorAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: theme.spacing.md,
    },
    instructorInfo: {
        flex: 1,
    },
    instructorName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    instructorTitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    instructorExperience: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    lessonsContainer: {
        gap: theme.spacing.sm,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    lessonIndicator: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
        backgroundColor: theme.colors.border,
    },
    lessonCompleted: {
        backgroundColor: theme.colors.success,
    },
    lessonCurrent: {
        backgroundColor: theme.colors.primary,
    },
    lessonUpcoming: {
        backgroundColor: theme.colors.border,
    },
    lessonNumber: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textSecondary,
    },
    lessonContent: {
        flex: 1,
    },
    lessonTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    lessonDuration: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
});
export default CourseDetailScreen;
