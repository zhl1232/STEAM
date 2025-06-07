import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const LearningHistoryScreen = () => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('courses');
    const tabs = [
        { id: 'courses', title: '课程学习', icon: 'book-outline' },
        { id: 'activities', title: '活动参与', icon: 'calendar-outline' },
        { id: 'achievements', title: '成就获得', icon: 'trophy-outline' },
    ];
    const learningData = {
        courses: [
            {
                id: '1',
                title: 'Scratch编程入门：制作动画和游戏',
                progress: 75,
                totalLessons: 12,
                completedLessons: 9,
                lastStudied: '2024-01-15',
                category: '技术',
                categoryColor: theme.colors.technology,
                image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
            {
                id: '2',
                title: '3D打印与设计思维',
                progress: 100,
                totalLessons: 8,
                completedLessons: 8,
                lastStudied: '2024-01-10',
                category: '工程',
                categoryColor: theme.colors.engineering,
                image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
            {
                id: '3',
                title: '数字艺术创作基础',
                progress: 45,
                totalLessons: 10,
                completedLessons: 4,
                lastStudied: '2024-01-12',
                category: '艺术',
                categoryColor: theme.colors.arts,
            },
        ],
        activities: [
            {
                id: '1',
                title: '青少年科学实验大赛',
                type: '科学竞赛',
                status: '已完成',
                participatedDate: '2024-01-08',
                result: '二等奖',
                image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
            {
                id: '2',
                title: '创客工坊周末体验营',
                type: '实践活动',
                status: '进行中',
                participatedDate: '2024-01-14',
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
            {
                id: '3',
                title: '机器人编程挑战赛',
                type: '编程竞赛',
                status: '已报名',
                participatedDate: '2024-01-20',
            },
        ],
        achievements: [
            {
                id: '1',
                title: '编程小达人',
                description: '完成首个编程课程',
                earnedDate: '2024-01-10',
                type: 'course',
                icon: 'code-outline',
                color: theme.colors.technology,
            },
            {
                id: '2',
                title: '科学探索者',
                description: '参与科学实验活动并获奖',
                earnedDate: '2024-01-08',
                type: 'activity',
                icon: 'flask-outline',
                color: theme.colors.science,
            },
            {
                id: '3',
                title: '坚持学习',
                description: '连续学习7天',
                earnedDate: '2024-01-05',
                type: 'habit',
                icon: 'flame-outline',
                color: theme.colors.warning,
            },
            {
                id: '4',
                title: '团队合作',
                description: '参与团队项目制作',
                earnedDate: '2024-01-12',
                type: 'collaboration',
                icon: 'people-outline',
                color: theme.colors.success,
            },
        ],
    };
    const renderCourseItem = (course) => (<TouchableOpacity key={course.id} style={styles.courseItem}>
      {course.image && (<Image source={{ uri: course.image }} style={styles.courseImage}/>)}
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <View style={[styles.categoryTag, { backgroundColor: `${course.categoryColor}20` }]}>
            <Text style={[styles.categoryTagText, { color: course.categoryColor }]}>
              {course.category}
            </Text>
          </View>
          <Text style={styles.lastStudied}>最后学习: {course.lastStudied}</Text>
        </View>
        
        <Text style={styles.courseTitle}>{course.title}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {course.completedLessons}/{course.totalLessons} 课时
            </Text>
            <Text style={styles.progressPercent}>{course.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${course.progress}%` }]}/>
          </View>
        </View>
        
        {course.progress === 100 && (<View style={styles.completeBadge}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.success}/>
            <Text style={styles.completeText}>已完成</Text>
          </View>)}
      </View>
    </TouchableOpacity>);
    const renderActivityItem = (activity) => (<TouchableOpacity key={activity.id} style={styles.activityItem}>
      {activity.image && (<Image source={{ uri: activity.image }} style={styles.activityImage}/>)}
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityType}>{activity.type}</Text>
          <View style={[
            styles.statusBadge,
            activity.status === '已完成' && styles.statusCompleted,
            activity.status === '进行中' && styles.statusOngoing,
            activity.status === '已报名' && styles.statusRegistered,
        ]}>
            <Text style={[
            styles.statusText,
            activity.status === '已完成' && styles.statusCompletedText,
            activity.status === '进行中' && styles.statusOngoingText,
            activity.status === '已报名' && styles.statusRegisteredText,
        ]}>
              {activity.status}
            </Text>
          </View>
        </View>
        
        <Text style={styles.activityTitle}>{activity.title}</Text>
        
        <View style={styles.activityFooter}>
          <Text style={styles.participatedDate}>参与时间: {activity.participatedDate}</Text>
          {activity.result && (<Text style={styles.activityResult}>获得: {activity.result}</Text>)}
        </View>
      </View>
    </TouchableOpacity>);
    const renderAchievementItem = (achievement) => (<TouchableOpacity key={achievement.id} style={styles.achievementItem}>
      <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
        <Ionicons name={achievement.icon} size={32} color={achievement.color}/>
      </View>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.earnedDate}>获得时间: {achievement.earnedDate}</Text>
      </View>
    </TouchableOpacity>);
    const renderTabContent = () => {
        switch (selectedTab) {
            case 'courses':
                return learningData.courses.map(renderCourseItem);
            case 'activities':
                return learningData.activities.map(renderActivityItem);
            case 'achievements':
                return learningData.achievements.map(renderAchievementItem);
            default:
                return null;
        }
    };
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>学习记录</Text>
        <View style={styles.headerRight}/>
      </View>

      {/* 标签页切换 */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (<TouchableOpacity key={tab.id} style={[
                styles.tabItem,
                selectedTab === tab.id && styles.tabItemActive,
            ]} onPress={() => setSelectedTab(tab.id)}>
            <Ionicons name={tab.icon} size={20} color={selectedTab === tab.id ? theme.colors.primary : theme.colors.textSecondary}/>
            <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextActive,
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>))}
      </View>

      {/* 内容区域 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
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
    headerRight: {
        width: 40,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    tabItemActive: {
        backgroundColor: `${theme.colors.primary}20`,
    },
    tabText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
    },
    tabTextActive: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.medium,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
    },
    courseItem: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
        ...theme.shadows.small,
    },
    courseImage: {
        width: '100%',
        height: 120,
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
    lastStudied: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    courseTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    progressContainer: {
        marginBottom: theme.spacing.sm,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    progressText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
    },
    progressPercent: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.medium,
    },
    progressBar: {
        height: 6,
        backgroundColor: theme.colors.border,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
    },
    completeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completeText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.success,
        marginLeft: theme.spacing.xs,
        fontWeight: theme.fontWeight.medium,
    },
    activityItem: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
        ...theme.shadows.small,
    },
    activityImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    activityContent: {
        padding: theme.spacing.md,
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    activityType: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        backgroundColor: theme.colors.border,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: 20,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: 20,
    },
    statusCompleted: {
        backgroundColor: `${theme.colors.success}20`,
    },
    statusOngoing: {
        backgroundColor: `${theme.colors.warning}20`,
    },
    statusRegistered: {
        backgroundColor: `${theme.colors.primary}20`,
    },
    statusText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.medium,
    },
    statusCompletedText: {
        color: theme.colors.success,
    },
    statusOngoingText: {
        color: theme.colors.warning,
    },
    statusRegisteredText: {
        color: theme.colors.primary,
    },
    activityTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    activityFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    participatedDate: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    activityResult: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.warning,
        fontWeight: theme.fontWeight.medium,
    },
    achievementItem: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
        ...theme.shadows.small,
    },
    achievementIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    achievementContent: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    achievementDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    earnedDate: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
});
export default LearningHistoryScreen;
