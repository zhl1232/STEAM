import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const TechnologyScreen = () => {
    const navigation = useNavigation();
    const techCategories = [
        { id: '1', name: '编程', icon: 'code-outline', color: theme.colors.primary },
        { id: '2', name: '机器人', icon: 'hardware-chip-outline', color: theme.colors.success },
        { id: '3', name: '电子', icon: 'flash-outline', color: theme.colors.error },
        { id: '4', name: 'AR/VR', icon: 'glasses-outline', color: theme.colors.warning },
        { id: '5', name: 'App开发', icon: 'phone-portrait-outline', color: theme.colors.secondary },
        { id: '6', name: '更多', icon: 'ellipsis-horizontal-outline', color: theme.colors.textSecondary },
    ];
    const learningPath = [
        { id: '1', title: '认识编程世界', type: '入门基础', completed: true },
        { id: '2', title: '变量与数据类型', type: 'Python基础', completed: true },
        { id: '3', title: '条件语句与循环', type: 'Python基础', current: true },
        { id: '4', title: '函数与模块', type: 'Python进阶', upcoming: true },
    ];
    const techProjects = [
        {
            id: '1',
            title: '智能机器人制作',
            type: '适合团队',
            duration: '10小时',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
        {
            id: '2',
            title: '创建你的第一个App',
            type: '个人项目',
            duration: '8小时',
            image: 'https://images.unsplash.com/photo-1596263359823-2f77c7bf6c60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
    ];
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>技术学习</Text>
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
        {/* 热门技术课程 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门技术课程</Text>
          <TouchableOpacity style={styles.featuredCourse}>
            <Image source={{
            uri: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }} style={styles.featuredImage}/>
            <View style={styles.featuredContent}>
              <View style={styles.courseHeader}>
                <View style={[styles.categoryTag, { backgroundColor: `${theme.colors.secondary}20` }]}>
                  <Text style={[styles.categoryTagText, { color: theme.colors.secondary }]}>编程</Text>
                </View>
                <Text style={styles.ageRange}>10-16岁</Text>
              </View>
              <Text style={styles.featuredTitle}>青少年Python编程基础</Text>
              <Text style={styles.featuredDescription}>通过有趣的项目学习Python编程，培养逻辑思维能力</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  <Ionicons name="star" size={12} color="#fbbf24"/>
                  <Ionicons name="star" size={12} color="#fbbf24"/>
                  <Ionicons name="star" size={12} color="#fbbf24"/>
                  <Ionicons name="star" size={12} color="#fbbf24"/>
                  <Ionicons name="star" size={12} color="#fbbf24"/>
                </View>
                <Text style={styles.ratingText}>4.9 | 678人已学习</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 技术分类 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>技术分类</Text>
          <View style={styles.categoriesGrid}>
            {techCategories.map((category) => (<TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={24} color={category.color}/>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>))}
          </View>
        </View>

        {/* 学习路径 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>推荐学习路径</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.pathCard}>
            <View style={styles.pathHeader}>
              <Text style={styles.pathTitle}>青少年编程入门路径</Text>
              <Text style={styles.pathDuration}>共12课时</Text>
            </View>
            
            <View style={styles.progressSection}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>完成进度</Text>
                <Text style={styles.progressPercent}>25%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '25%' }]}/>
              </View>
            </View>
            
            <View style={styles.pathSteps}>
              {learningPath.map((step, index) => (<View key={step.id} style={styles.pathStep}>
                  <View style={[
                styles.stepIndicator,
                step.completed && styles.stepCompleted,
                step.current && styles.stepCurrent,
                step.upcoming && styles.stepUpcoming,
            ]}>
                    {step.completed ? (<Ionicons name="checkmark" size={12} color="#FFFFFF"/>) : (<Text style={styles.stepNumber}>{index + 1}</Text>)}
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepType}>
                      {step.type} · {step.completed ? '已完成' : step.current ? '进行中' : '未开始'}
                    </Text>
                  </View>
                </View>))}
            </View>
          </View>
        </View>

        {/* 热门技术项目 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门技术项目</Text>
          <View style={styles.projectsGrid}>
            {techProjects.map((project) => (<TouchableOpacity key={project.id} style={styles.projectCard}>
                <Image source={{ uri: project.image }} style={styles.projectImage}/>
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <View style={styles.projectMeta}>
                    <Text style={styles.projectMetaText}>
                      <Ionicons name="people-outline" size={12} color={theme.colors.textSecondary}/> {project.type}
                    </Text>
                    <Text style={styles.projectMetaText}>
                      <Ionicons name="time-outline" size={12} color={theme.colors.textSecondary}/> {project.duration}
                    </Text>
                  </View>
                </View>
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
    featuredCourse: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        ...theme.shadows.small,
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
        lineHeight: 20,
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
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    categoryName: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        textAlign: 'center',
    },
    pathCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    pathHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    pathTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    pathDuration: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    progressSection: {
        marginBottom: theme.spacing.md,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    progressLabel: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
    },
    progressPercent: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.success,
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
        backgroundColor: theme.colors.success,
        borderRadius: 3,
    },
    pathSteps: {
        gap: theme.spacing.sm,
    },
    pathStep: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.sm,
    },
    stepCompleted: {
        backgroundColor: theme.colors.success,
    },
    stepCurrent: {
        backgroundColor: theme.colors.primary,
    },
    stepUpcoming: {
        backgroundColor: theme.colors.border,
    },
    stepNumber: {
        fontSize: theme.fontSize.xs,
        color: '#FFFFFF',
        fontWeight: theme.fontWeight.medium,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
    },
    stepType: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    projectsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    projectCard: {
        width: '47%',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        ...theme.shadows.small,
    },
    projectImage: {
        width: '100%',
        height: 96,
        resizeMode: 'cover',
    },
    projectContent: {
        padding: theme.spacing.sm,
    },
    projectTitle: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    projectMeta: {
        gap: theme.spacing.xs,
    },
    projectMetaText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
});
export default TechnologyScreen;
