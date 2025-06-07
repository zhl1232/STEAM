import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/theme';
const ProfileScreen = () => {
    const navigation = useNavigation();
    const userStats = [
        { label: '学习课程', value: 8, icon: 'book-outline' },
        { label: '获得徽章', value: 12, icon: 'medal-outline' },
        { label: '参与活动', value: 5, icon: 'calendar-outline' },
        { label: '发表作品', value: 3, icon: 'create-outline' },
    ];
    const menuItems = [
        {
            id: '1',
            title: '我的课程',
            subtitle: '查看学习进度和课程安排',
            icon: 'book-outline',
            color: theme.colors.science
        },
        {
            id: '2',
            title: '我的作品',
            subtitle: '管理和展示我的创作',
            icon: 'create-outline',
            color: theme.colors.arts
        },
        {
            id: '3',
            title: '学习报告',
            subtitle: '查看详细的学习数据分析',
            icon: 'bar-chart-outline',
            color: theme.colors.mathematics
        },
        {
            id: '4',
            title: '徽章中心',
            subtitle: '查看已获得的成就徽章',
            icon: 'medal-outline',
            color: theme.colors.warning
        },
        {
            id: '5',
            title: '设置',
            subtitle: '个人信息和应用设置',
            icon: 'settings-outline',
            color: theme.colors.textSecondary
        },
        {
            id: '6',
            title: '帮助与反馈',
            subtitle: '获取帮助或提供建议',
            icon: 'help-circle-outline',
            color: theme.colors.primary
        },
    ];
    const recentActivities = [
        {
            id: '1',
            title: '完成了"Scratch编程基础"课程',
            time: '2小时前',
            type: 'course',
            icon: 'checkmark-circle',
            color: theme.colors.success,
        },
        {
            id: '2',
            title: '参与了"机器人编程工作坊"',
            time: '1天前',
            type: 'activity',
            icon: 'calendar',
            color: theme.colors.primary,
        },
        {
            id: '3',
            title: '获得了"编程新手"徽章',
            time: '3天前',
            type: 'badge',
            icon: 'medal',
            color: theme.colors.warning,
        },
    ];
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 用户信息卡片 */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <Image source={{
            uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        }} style={styles.avatar}/>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>小明同学</Text>
              <View style={styles.userLevel}>
                <Ionicons name="star" size={14} color="#fbbf24"/>
                <Text style={styles.levelText}>Lv.5 初级创客</Text>
              </View>
              <Text style={styles.userMotto}>探索科学，创造未来！</Text>
            </View>
          </View>
          
          {/* 学习统计 */}
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (<View key={index} style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name={stat.icon} size={16} color={theme.colors.primary}/>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>))}
          </View>
        </View>

        {/* 最近活动 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最近活动</Text>
          {recentActivities.map((activity) => (<View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                <Ionicons name={activity.icon} size={16} color={activity.color}/>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>))}
        </View>

        {/* 功能菜单 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>功能菜单</Text>
          {menuItems.map((item) => (<TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => {
                switch (item.id) {
                    case '1': // 我的课程
                        console.log('导航到学习历史页面');
                        // navigation.navigate('LearningHistory');
                        break;
                    case '5': // 设置
                        console.log('导航到设置页面');
                        // navigation.navigate('Settings');
                        break;
                    default:
                        console.log('导航到', item.title);
                }
            }}>
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon} size={20} color={item.color}/>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary}/>
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
    settingsButton: {
        padding: theme.spacing.xs,
    },
    scrollView: {
        flex: 1,
    },
    userCard: {
        backgroundColor: theme.colors.surface,
        margin: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: theme.spacing.md,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    userLevel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    levelText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
    },
    userMotto: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    statItem: {
        alignItems: 'center',
    },
    statIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: `${theme.colors.primary}20`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    statValue: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
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
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },
    activityIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        fontWeight: theme.fontWeight.medium,
        marginBottom: 2,
    },
    activityTime: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
});
export default ProfileScreen;
