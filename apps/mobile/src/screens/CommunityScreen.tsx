import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/theme';

const CommunityScreen: React.FC = () => {
  const navigation = useNavigation();
  const communityTabs = [
    { id: '1', name: '推荐', active: true },
    { id: '2', name: '作品展示', active: false },
    { id: '3', name: '问答', active: false },
    { id: '4', name: '活动', active: false },
  ];

  const posts = [
    {
      id: '1',
      author: {
        name: '小明同学',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        level: 'Lv.5',
      },
      content: '今天完成了我的第一个Scratch动画作品！分享给大家看看，希望能得到一些建议和改进意见。',
      images: [
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['Scratch', '编程', '动画'],
      likes: 32,
      comments: 8,
      shares: 5,
      time: '2小时前',
      category: '作品展示',
    },
    {
      id: '2',
      author: {
        name: '科学小达人',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        level: 'Lv.8',
      },
      content: '请问有人知道在做化学实验时，如何安全地处理酸性溶液吗？我在家里想做一个小实验，但是担心安全问题。',
      tags: ['化学', '安全', '实验'],
      likes: 15,
      comments: 12,
      shares: 2,
      time: '5小时前',
      category: '问答',
    },
    {
      id: '3',
      author: {
        name: '创客少年',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        level: 'Lv.6',
      },
      content: '参加了上周的机器人编程工作坊，学到了很多新知识！特别是传感器的使用，真的很有趣。期待下次的活动。',
      images: [
        'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['机器人', '编程', '工作坊'],
      likes: 28,
      comments: 6,
      shares: 8,
      time: '1天前',
      category: '活动',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '作品展示': return theme.colors.success;
      case '问答': return theme.colors.warning;
      case '活动': return theme.colors.primary;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>社区</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 分类标签 */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {communityTabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, tab.active && styles.activeTab]}
            >
              <Text style={[styles.tabText, tab.active && styles.activeTabText]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <TouchableOpacity 
            key={post.id} 
            style={styles.postCard}
            onPress={() => {
              console.log('导航到帖子详情页面', post.id);
              // navigation.navigate('PostDetail', { postId: post.id });
            }}
          >
            {/* 用户信息 */}
            <View style={styles.postHeader}>
              <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <View style={styles.userNameRow}>
                  <Text style={styles.userName}>{post.author.name}</Text>
                  <View style={styles.userLevel}>
                    <Text style={styles.userLevelText}>{post.author.level}</Text>
                  </View>
                </View>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* 帖子内容 */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* 图片 */}
            {post.images && post.images.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imagesContainer}
              >
                {post.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={styles.postImage} />
                ))}
              </ScrollView>
            )}

            {/* 标签 */}
            <View style={styles.tagsContainer}>
              <View style={[styles.categoryTag, { backgroundColor: `${getCategoryColor(post.category)}20` }]}>
                <Text style={[styles.categoryTagText, { color: getCategoryColor(post.category) }]}>
                  {post.category}
                </Text>
              </View>
              {post.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>

            {/* 互动按钮 */}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={20} color={theme.colors.textSecondary} />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color={theme.colors.textSecondary} />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={20} color={theme.colors.textSecondary} />
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
  tabsContainer: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabs: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  tab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginRight: theme.spacing.xs,
  },
  userLevel: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 1,
    borderRadius: theme.borderRadius.sm,
  },
  userLevelText: {
    fontSize: theme.fontSize.xs,
    color: 'white',
    fontWeight: theme.fontWeight.medium,
  },
  postTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  moreButton: {
    padding: theme.spacing.xs,
  },
  postContent: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  imagesContainer: {
    marginBottom: theme.spacing.sm,
  },
  postImage: {
    width: 200,
    height: 150,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    resizeMode: 'cover',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.sm,
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  categoryTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  tag: {
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  tagText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
  },
  postActions: {
    flexDirection: 'row',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  actionText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
});

export default CommunityScreen; 