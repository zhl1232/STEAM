import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const ArtScreen = () => {
    const navigation = useNavigation();
    const artForms = [
        { id: '1', name: '绘画', icon: 'brush-outline', color: theme.colors.warning },
        { id: '2', name: '雕塑', icon: 'cube-outline', color: theme.colors.primary },
        { id: '3', name: '数字艺术', icon: 'videocam-outline', color: theme.colors.success },
        { id: '4', name: '音乐', icon: 'musical-notes-outline', color: theme.colors.secondary },
        { id: '5', name: '表演', icon: 'mic-outline', color: theme.colors.error },
        { id: '6', name: '更多', icon: 'ellipsis-horizontal-outline', color: theme.colors.textSecondary },
    ];
    const artCourses = [
        {
            id: '1',
            title: '数字绘画与创意设计',
            category: '数字艺术',
            categoryColor: theme.colors.success,
            ageRange: '10-16岁',
            rating: 4.9,
            reviewCount: 532,
            description: '使用平板电脑和专业软件学习数字绘画技巧和创意设计',
            image: 'https://images.unsplash.com/photo-1519669417489-52c4da8f1b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
            id: '2',
            title: '电子音乐制作入门',
            category: '音乐创作',
            categoryColor: theme.colors.secondary,
            ageRange: '8-14岁',
            rating: 4.7,
            reviewCount: 376,
            description: '学习使用数字音乐软件创作自己的电子音乐作品',
        },
    ];
    const artTeachers = [
        {
            id: '1',
            name: '陈莉',
            specialty: '数字艺术家',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        },
        {
            id: '2',
            name: '王磊',
            specialty: '新媒体艺术',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        },
        {
            id: '3',
            name: '林小美',
            specialty: '音乐制作人',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        },
        {
            id: '4',
            name: '张伟',
            specialty: '3D设计师',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>艺术创作</Text>
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
        {/* 艺术主题横幅 */}
        <View style={styles.section}>
          <View style={styles.artBanner}>
            <Text style={styles.bannerTitle}>探索艺术的无限可能</Text>
            <Text style={styles.bannerSubtitle}>通过创意和想象力，将科学、技术与艺术融合</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>开始创作之旅</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 艺术形式分类 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>艺术形式</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {artForms.map((form) => (<TouchableOpacity key={form.id} style={styles.artFormCard}>
                <View style={[styles.artFormIcon, { backgroundColor: `${form.color}20` }]}>
                  <Ionicons name={form.icon} size={32} color={form.color}/>
                </View>
                <Text style={styles.artFormName}>{form.name}</Text>
              </TouchableOpacity>))}
          </ScrollView>
        </View>

        {/* 艺术课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门艺术课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {artCourses.map((course) => (<TouchableOpacity key={course.id} style={styles.courseCard}>
              {course.image && (<Image source={{ uri: course.image }} style={styles.courseImage}/>)}
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
            </TouchableOpacity>))}
        </View>

        {/* 艺术与科技结合项目 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>艺术与科技融合项目</Text>
          <View style={styles.fusionProject}>
            <Text style={styles.projectTitle}>交互式艺术装置</Text>
            <Text style={styles.projectDescription}>
              结合传感器和编程，创建能够与观众互动的艺术作品
            </Text>
            <View style={styles.projectImages}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }} style={styles.projectImage}/>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1558865869-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }} style={styles.projectImage}/>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }} style={styles.projectImage}/>
            </View>
            <TouchableOpacity style={styles.projectButton}>
              <Text style={styles.projectButtonText}>了解详情</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 推荐艺术导师 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>推荐艺术导师</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {artTeachers.map((teacher) => (<TouchableOpacity key={teacher.id} style={styles.teacherCard}>
                <Image source={{ uri: teacher.avatar }} style={styles.teacherAvatar}/>
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <Text style={styles.teacherSpecialty}>{teacher.specialty}</Text>
              </TouchableOpacity>))}
          </ScrollView>
        </View>

        {/* 创作挑战 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>本周创作挑战</Text>
          <View style={styles.challengeCard}>
            <Image source={{
            uri: 'https://images.unsplash.com/photo-1538291323976-37dcaafccb12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }} style={styles.challengeImage}/>
            <View style={styles.challengeContent}>
              <Text style={styles.challengeTitle}>未来城市</Text>
              <Text style={styles.challengeDescription}>
                设计一个环保、智能的未来城市，结合科技与艺术元素
              </Text>
              <View style={styles.challengeMeta}>
                <Text style={styles.challengeMetaText}>
                  <Ionicons name="calendar-outline" size={12} color={theme.colors.textSecondary}/>
                  {' '}剩余时间: 5天
                </Text>
              </View>
              <View style={styles.challengeButtons}>
                <TouchableOpacity style={styles.challengeButtonPrimary}>
                  <Text style={styles.challengeButtonPrimaryText}>参与挑战</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.challengeButtonSecondary}>
                  <Text style={styles.challengeButtonSecondaryText}>查看作品</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    artBanner: {
        backgroundColor: 'linear-gradient(45deg, #ff7eb3, #ff758c)',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        alignItems: 'center',
    },
    bannerTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    bannerSubtitle: {
        fontSize: theme.fontSize.sm,
        color: '#FFFFFF',
        textAlign: 'center',
        opacity: 0.9,
        marginBottom: theme.spacing.md,
    },
    bannerButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.sm,
    },
    bannerButtonText: {
        color: theme.colors.arts,
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
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
    horizontalScroll: {
        marginHorizontal: -theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
    },
    artFormCard: {
        alignItems: 'center',
        marginRight: theme.spacing.md,
        width: 80,
    },
    artFormIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    artFormName: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        textAlign: 'center',
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
    fusionProject: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    projectTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    projectDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        lineHeight: 20,
    },
    projectImages: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    projectImage: {
        width: '30%',
        height: 80,
        borderRadius: theme.borderRadius.sm,
        resizeMode: 'cover',
    },
    projectButton: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    projectButtonText: {
        color: '#FFFFFF',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
    teacherCard: {
        alignItems: 'center',
        marginRight: theme.spacing.md,
        width: 100,
    },
    teacherAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: theme.spacing.sm,
    },
    teacherName: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    teacherSpecialty: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    challengeCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        ...theme.shadows.small,
    },
    challengeImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    challengeContent: {
        padding: theme.spacing.md,
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
    challengeMeta: {
        marginBottom: theme.spacing.md,
    },
    challengeMetaText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    challengeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: theme.spacing.sm,
    },
    challengeButtonPrimary: {
        flex: 1,
        backgroundColor: theme.colors.arts,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    challengeButtonPrimaryText: {
        color: '#FFFFFF',
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
    challengeButtonSecondary: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    challengeButtonSecondaryText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
});
export default ArtScreen;
