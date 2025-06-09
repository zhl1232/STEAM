import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../utils/theme';
import { 
  getPostById, 
  getPostComments, 
  likePost, 
  addComment,
  Post,
  Comment 
} from '../../services/api';

const PostDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // 从路由参数获取帖子ID，添加类型断言
  const postId = (route.params as any)?.postId || '1'; // 默认值为1，方便测试
  
  // 加载帖子数据
  useEffect(() => {
    const loadPostData = async () => {
      try {
        setLoading(true);
        // 同时获取帖子详情和评论
        const [postResponse, commentsResponse] = await Promise.all([
          getPostById(postId),
          getPostComments(postId)
        ]);
        
        if (postResponse.success && postResponse.data) {
          setPost(postResponse.data);
        } else {
          // 如果API失败，使用模拟数据
          setPost({
            id: '1',
            title: '我的第一个机器人制作经历',
            content: '大家好！我想和大家分享一下我制作第一个机器人的经历。这是一个用Arduino控制的避障机器人，虽然功能很简单，但制作过程中学到了很多东西。\n\n首先是硬件组装，需要准备Arduino Uno、超声波传感器、舵机、车轮等组件。最困难的部分是编程，特别是传感器数据的处理和电机控制逻辑。\n\n经过一周的努力，机器人终于可以自动避开障碍物了！虽然还有很多需要改进的地方，但看到它能够自主移动的那一刻，真的很有成就感。\n\n希望能和大家交流更多机器人制作的经验！',
            author: {
              id: '1',
              name: '小明同学',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
              level: 'Lv.5',
              badge: '机器人爱好者',
            },
            images: [
              'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            ],
            category: '技术分享',
            categoryColor: theme.colors.technology,
            createdAt: '2小时前',
            likes: 45,
            comments: 12,
            views: 156,
          });
        }
        
        if (commentsResponse.success && commentsResponse.data) {
          setComments(commentsResponse.data);
        } else {
          // 如果API失败，使用模拟数据
          setComments([
            {
              id: '1',
              author: {
                name: '科技小达人',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                level: 'Lv.8',
              },
              content: '太厉害了！我也想尝试制作一个机器人，能分享一下具体的组件清单吗？',
              createdAt: '1小时前',
              likes: 8,
            },
            {
              id: '2',
              author: {
                name: '编程新手',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                level: 'Lv.3',
              },
              content: '代码部分有没有参考资料？Arduino编程对新手来说有点困难',
              createdAt: '30分钟前',
              likes: 3,
            },
            {
              id: '3',
              author: {
                name: '机器人导师',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                level: 'Lv.15',
                badge: '认证导师',
              },
              content: '做得很好！建议下一步可以尝试添加蓝牙控制功能，这样可以用手机远程操控机器人。',
              createdAt: '15分钟前',
              likes: 15,
            },
          ]);
        }
      } catch (error) {
        console.error('加载帖子数据失败:', error);
        Alert.alert('错误', '加载帖子失败，请检查网络连接');
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [postId]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const response = await likePost(post.id);
      if (response.success) {
        setLiked(!liked);
        // 更新帖子的点赞数
        setPost(prev => prev ? { ...prev, likes: prev.likes + (liked ? -1 : 1) } : null);
      }
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim() || !post) return;
    
    try {
      setSubmittingComment(true);
      const response = await addComment(post.id, comment);
      if (response.success && response.data) {
        setComments(prev => [...prev, response.data!]);
        setComment('');
        // 更新帖子的评论数
        setPost(prev => prev ? { ...prev, comments: prev.comments + 1 } : null);
      }
    } catch (error) {
      console.error('发送评论失败:', error);
      Alert.alert('错误', '发送评论失败，请重试');
    } finally {
      setSubmittingComment(false);
    }
  };

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>社区详情</Text>
          <View style={styles.headerIcons} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 如果没有帖子数据，显示错误状态
  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>社区详情</Text>
          <View style={styles.headerIcons} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>帖子不存在或加载失败</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>社区详情</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bookmark-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 帖子内容 */}
        <View style={styles.section}>
          {/* 作者信息 */}
          <View style={styles.authorSection}>
            <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <View style={styles.authorNameRow}>
                <Text style={styles.authorName}>{post.author.name}</Text>
                <Text style={styles.authorLevel}>{post.author.level}</Text>
                {post.author.badge && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{post.author.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.postTime}>{post.createdAt}</Text>
            </View>
          </View>

          {/* 帖子分类 */}
          <View style={[styles.categoryTag, { backgroundColor: `${post.categoryColor}20` }]}>
            <Text style={[styles.categoryTagText, { color: post.categoryColor }]}>
              {post.category}
            </Text>
          </View>

          {/* 帖子标题 */}
          <Text style={styles.postTitle}>{post.title}</Text>

          {/* 帖子内容 */}
          <Text style={styles.postContent}>{post.content}</Text>

          {/* 帖子图片 */}
          {post.images && post.images.length > 0 && (
            <View style={styles.imagesContainer}>
              {post.images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.postImage} />
              ))}
            </View>
          )}

          {/* 帖子统计 */}
          <View style={styles.postStats}>
            <TouchableOpacity style={styles.statItem} onPress={handleLike}>
              <Ionicons 
                name={liked ? "heart" : "heart-outline"} 
                size={16} 
                color={liked ? theme.colors.error : theme.colors.textSecondary} 
              />
              <Text style={styles.statText}>{post.likes + (liked ? 1 : 0)}</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.statText}>{post.comments}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="eye-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.statText}>{post.views}</Text>
            </View>
          </View>
        </View>

        {/* 评论区 */}
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>评论 ({comments.length})</Text>
          
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image source={{ uri: comment.author.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentAuthorInfo}>
                    <Text style={styles.commentAuthorName}>{comment.author.name}</Text>
                    <Text style={styles.commentAuthorLevel}>{comment.author.level}</Text>
                    {comment.author.badge && (
                      <View style={styles.commentBadge}>
                        <Text style={styles.commentBadgeText}>{comment.author.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.commentTime}>{comment.createdAt}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.commentAction}>
                    <Ionicons name="heart-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.commentActionText}>{comment.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.commentAction}>
                    <Text style={styles.commentActionText}>回复</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 评论输入框 */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="写下你的评论..."
          placeholderTextColor={theme.colors.textSecondary}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, comment.trim() && styles.sendButtonActive]} 
          onPress={handleComment}
          disabled={!comment.trim() || submittingComment}
        >
          {submittingComment ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons 
              name="send" 
              size={20} 
              color={comment.trim() ? '#FFFFFF' : theme.colors.textSecondary} 
            />
          )}
        </TouchableOpacity>
      </View>
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
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.sm,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  authorName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  authorLevel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}20`,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: theme.spacing.xs,
  },
  badgeContainer: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    color: '#FFFFFF',
    fontWeight: theme.fontWeight.medium,
  },
  postTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  categoryTagText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  postTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  postContent: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  postImage: {
    width: '48%',
    height: 120,
    borderRadius: theme.borderRadius.sm,
    resizeMode: 'cover',
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  commentsSection: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: theme.spacing.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  commentAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthorName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginRight: theme.spacing.xs,
  },
  commentAuthorLevel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}20`,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 1,
    borderRadius: 8,
    marginRight: theme.spacing.xs,
  },
  commentBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 1,
    borderRadius: 8,
  },
  commentBadgeText: {
    fontSize: theme.fontSize.xs,
    color: '#FFFFFF',
    fontWeight: theme.fontWeight.medium,
  },
  commentTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  commentText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentActionText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  commentInput: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    maxHeight: 100,
    marginRight: theme.spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
});

export default PostDetailScreen; 