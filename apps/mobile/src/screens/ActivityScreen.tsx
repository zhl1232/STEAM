import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/theme';

const ActivityScreen: React.FC = () => {
  const navigation = useNavigation();
  const activityTypes = [
    { id: '1', name: '比赛', icon: 'trophy-outline' as const, color: '#f59e0b' },
    { id: '2', name: '工作坊', icon: 'hammer-outline' as const, color: '#10b981' },
    { id: '3', name: '展览', icon: 'eye-outline' as const, color: '#3b82f6' },
    { id: '4', name: '讲座', icon: 'book-outline' as const, color: '#8b5cf6' },
    { id: '5', name: '实践', icon: 'build-outline' as const, color: '#ef4444' },
    { id: '6', name: '全部', icon: 'apps-outline' as const, color: theme.colors.textSecondary },
  ];

  const featuredActivities = [
    {
      id: '1',
      title: '全国青少年STEAM创新大赛',
      description: '展示你的创新项目，与全国的STEAM爱好者一起交流学习',
      type: '比赛',
      typeColor: '#f59e0b',
      location: '线上+线下',
      date: '2024年3月15日 - 3月30日',
      participants: 2000,
      status: '报名中',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: '机器人编程工作坊',
      description: '学习机器人编程，动手制作属于自己的智能机器人',
      type: '工作坊',
      typeColor: '#10b981',
      location: '北京科技馆',
      date: '2024年3月20日 14:00-17:00',
      participants: 30,
      status: '即将开始',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const upcomingActivities = [
    {
      id: '3',
      title: '3D打印创意设计比赛',
      type: '比赛',
      typeColor: '#f59e0b',
      date: '2024年4月1日',
      location: '上海创客空间',
      participants: 150,
    },
    {
      id: '4',
      title: '科学实验展示活动',
      type: '展览',
      typeColor: '#3b82f6',
      date: '2024年4月5日',
      location: '深圳科学馆',
      participants: 500,
    },
    {
      id: '5',
      title: 'AI编程入门讲座',
      type: '讲座',
      typeColor: '#8b5cf6',
      date: '2024年4月10日',
      location: '线上直播',
      participants: 1000,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>活动中心</Text>
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
        {/* 活动分类 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>活动分类</Text>
          <View style={styles.categoriesGrid}>
            {activityTypes.map((type) => (
              <TouchableOpacity key={type.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${type.color}20` }]}>
                  <Ionicons name={type.icon} size={24} color={type.color} />
                </View>
                <Text style={styles.categoryName}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 热门活动 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门活动</Text>
          {featuredActivities.map((activity) => (
            <TouchableOpacity 
              key={activity.id} 
              style={styles.featuredActivity}
              onPress={() => {
                console.log('导航到活动详情页面', activity.id);
                // navigation.navigate('ActivityDetail', { activityId: activity.id });
              }}
            >
              <Image source={{ uri: activity.image }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <View style={styles.activityHeader}>
                  <View style={[styles.typeTag, { backgroundColor: `${activity.typeColor}20` }]}>
                    <Text style={[styles.typeTagText, { color: activity.typeColor }]}>
                      {activity.type}
                    </Text>
                  </View>
                  <View style={[styles.statusTag, 
                    { backgroundColor: activity.status === '报名中' ? theme.colors.success : theme.colors.warning }
                  ]}>
                    <Text style={styles.statusTagText}>{activity.status}</Text>
                  </View>
                </View>
                <Text style={styles.featuredTitle}>{activity.title}</Text>
                <Text style={styles.featuredDescription}>{activity.description}</Text>
                <View style={styles.activityInfo}>
                  <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{activity.date}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{activity.location}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="people-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{activity.participants}人参与</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>立即报名</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 即将开始的活动 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>即将开始</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingActivities.map((activity) => (
            <TouchableOpacity 
              key={activity.id} 
              style={styles.activityCard}
              onPress={() => {
                console.log('导航到活动详情页面', activity.id);
                // navigation.navigate('ActivityDetail', { activityId: activity.id });
              }}
            >
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <View style={[styles.typeTag, { backgroundColor: `${activity.typeColor}20` }]}>
                    <Text style={[styles.typeTagText, { color: activity.typeColor }]}>
                      {activity.type}
                    </Text>
                  </View>
                </View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <View style={styles.activityInfo}>
                  <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{activity.date}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{activity.location}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="people-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{activity.participants}人参与</Text>
                  </View>
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
  featuredActivity: {
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  typeTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  typeTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  statusTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  statusTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: 'white',
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
  activityInfo: {
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  joinButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
    marginBottom: theme.spacing.md,
  },
  activityContent: {
    padding: theme.spacing.md,
  },
  activityTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
});

export default ActivityScreen; 