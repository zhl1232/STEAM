import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const ActivityDetailScreen = () => {
    const navigation = useNavigation();
    const activity = {
        id: '1',
        title: '青少年科学实验大赛',
        description: '这是一个面向全国青少年的科学实验竞赛活动，旨在激发学生对科学的兴趣，培养创新思维和动手实践能力。参赛者将有机会展示自己的科学项目，与全国的科学爱好者交流学习。',
        category: '科学竞赛',
        categoryColor: theme.colors.science,
        ageRange: '8-18岁',
        startDate: '2024年3月15日',
        endDate: '2024年3月30日',
        location: '全国各地（线上+线下）',
        participants: 2856,
        price: '免费参与',
        status: '报名中',
        image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        organizer: {
            name: '中国青少年科技创新协会',
            logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            description: '致力于推动青少年科技教育发展',
        },
        schedule: [
            { date: '3月15日', event: '报名开始', time: '09:00' },
            { date: '3月20日', event: '项目提交截止', time: '18:00' },
            { date: '3月25日', event: '初赛评审', time: '全天' },
            { date: '3月28日', event: '决赛现场展示', time: '14:00-17:00' },
            { date: '3月30日', event: '颁奖典礼', time: '19:00' },
        ],
        requirements: [
            '年龄在8-18岁之间的青少年学生',
            '具备基础的科学实验知识',
            '能够独立或团队完成实验项目',
            '提交完整的实验报告和视频说明',
        ],
        prizes: [
            { rank: '一等奖', count: 10, reward: '科学实验套装 + 证书' },
            { rank: '二等奖', count: 20, reward: '科学图书 + 证书' },
            { rank: '三等奖', count: 50, reward: '纪念品 + 证书' },
            { rank: '参与奖', count: '全部', reward: '电子证书' },
        ],
    };
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>活动详情</Text>
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
        {/* 活动封面 */}
        <View style={styles.section}>
          <Image source={{ uri: activity.image }} style={styles.activityImage}/>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{activity.status}</Text>
          </View>
        </View>

        {/* 活动信息 */}
        <View style={styles.section}>
          <View style={styles.activityHeader}>
            <View style={[styles.categoryTag, { backgroundColor: `${activity.categoryColor}20` }]}>
              <Text style={[styles.categoryTagText, { color: activity.categoryColor }]}>
                {activity.category}
              </Text>
            </View>
            <Text style={styles.ageRange}>{activity.ageRange}</Text>
          </View>
          
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityDescription}>{activity.description}</Text>
          
          <View style={styles.activityDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color={theme.colors.primary}/>
              <Text style={styles.detailText}>{activity.startDate} - {activity.endDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color={theme.colors.primary}/>
              <Text style={styles.detailText}>{activity.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={16} color={theme.colors.primary}/>
              <Text style={styles.detailText}>{activity.participants}人已参与</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="pricetag-outline" size={16} color={theme.colors.primary}/>
              <Text style={styles.detailText}>{activity.price}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>立即报名</Text>
          </TouchableOpacity>
        </View>

        {/* 主办方信息 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>主办方</Text>
          <View style={styles.organizerCard}>
            <Image source={{ uri: activity.organizer.logo }} style={styles.organizerLogo}/>
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>{activity.organizer.name}</Text>
              <Text style={styles.organizerDescription}>{activity.organizer.description}</Text>
            </View>
          </View>
        </View>

        {/* 活动安排 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>活动安排</Text>
          <View style={styles.scheduleContainer}>
            {activity.schedule.map((item, index) => (<View key={index} style={styles.scheduleItem}>
                <View style={styles.scheduleDate}>
                  <Text style={styles.scheduleDateText}>{item.date}</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleEvent}>{item.event}</Text>
                  <Text style={styles.scheduleTime}>{item.time}</Text>
                </View>
              </View>))}
          </View>
        </View>

        {/* 参赛要求 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>参赛要求</Text>
          <View style={styles.requirementsContainer}>
            {activity.requirements.map((requirement, index) => (<View key={index} style={styles.requirementItem}>
                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success}/>
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>))}
          </View>
        </View>

        {/* 奖励设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>奖励设置</Text>
          <View style={styles.prizesContainer}>
            {activity.prizes.map((prize, index) => (<View key={index} style={styles.prizeItem}>
                <View style={styles.prizeRank}>
                  <Text style={styles.prizeRankText}>{prize.rank}</Text>
                  <Text style={styles.prizeCountText}>({prize.count}名)</Text>
                </View>
                <Text style={styles.prizeReward}>{prize.reward}</Text>
              </View>))}
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
    activityImage: {
        width: '100%',
        height: 220,
        borderRadius: theme.borderRadius.md,
        resizeMode: 'cover',
    },
    statusBadge: {
        position: 'absolute',
        top: theme.spacing.sm,
        right: theme.spacing.sm,
        backgroundColor: theme.colors.success,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: 20,
    },
    statusText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.medium,
        color: '#FFFFFF',
    },
    activityHeader: {
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
    activityTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    activityDescription: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        lineHeight: 22,
        marginBottom: theme.spacing.md,
    },
    activityDetails: {
        marginBottom: theme.spacing.md,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    detailText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
    },
    joinButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    organizerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    organizerLogo: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: theme.spacing.md,
    },
    organizerInfo: {
        flex: 1,
    },
    organizerName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    organizerDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    scheduleContainer: {
        gap: theme.spacing.sm,
    },
    scheduleItem: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    scheduleDate: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.md,
    },
    scheduleDateText: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: '#FFFFFF',
    },
    scheduleContent: {
        flex: 1,
    },
    scheduleEvent: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    scheduleTime: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    requirementsContainer: {
        gap: theme.spacing.sm,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    requirementText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
        flex: 1,
        lineHeight: 20,
    },
    prizesContainer: {
        gap: theme.spacing.sm,
    },
    prizeItem: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.warning,
    },
    prizeRank: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    prizeRankText: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    prizeCountText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
    },
    prizeReward: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        lineHeight: 20,
    },
});
export default ActivityDetailScreen;
