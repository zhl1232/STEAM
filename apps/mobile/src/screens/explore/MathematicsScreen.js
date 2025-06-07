import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const MathematicsScreen = () => {
    const navigation = useNavigation();
    const mathCategories = [
        { id: '1', name: '代数', icon: 'calculator-outline', color: theme.colors.primary },
        { id: '2', name: '几何', icon: 'shapes-outline', color: theme.colors.success },
        { id: '3', name: '统计', icon: 'bar-chart-outline', color: theme.colors.secondary },
        { id: '4', name: '微积分', icon: 'infinite-outline', color: theme.colors.error },
        { id: '5', name: '概率', icon: 'dice-outline', color: theme.colors.warning },
        { id: '6', name: '逻辑', icon: 'git-network-outline', color: theme.colors.textSecondary },
    ];
    const mathCourses = [
        {
            id: '1',
            title: '数学建模与问题解决',
            category: '建模',
            categoryColor: theme.colors.primary,
            ageRange: '12-16岁',
            rating: 4.9,
            reviewCount: 412,
            description: '学习如何使用数学模型解决实际问题，培养分析能力',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
            id: '2',
            title: '趣味几何：从平面到立体',
            category: '几何',
            categoryColor: theme.colors.success,
            ageRange: '8-12岁',
            rating: 4.7,
            reviewCount: 368,
            description: '通过动手制作和交互游戏，理解几何概念和空间关系',
        },
    ];
    const mathGames = [
        { id: '1', name: '数独挑战', type: '逻辑思维', icon: 'extension-puzzle-outline', color: theme.colors.primary },
        { id: '2', name: '数学解谜', type: '问题解决', icon: 'bulb-outline', color: theme.colors.success },
        { id: '3', name: '概率游戏', type: '机率思维', icon: 'dice-outline', color: theme.colors.warning },
        { id: '4', name: '数学竞赛', type: '挑战自我', icon: 'calculator-outline', color: theme.colors.secondary },
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
        <Text style={styles.headerTitle}>数学乐园</Text>
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
        {/* 数学主题横幅 */}
        <View style={styles.section}>
          <View style={styles.mathBanner}>
            <Text style={styles.bannerTitle}>发现数学的奇妙世界</Text>
            <Text style={styles.bannerSubtitle}>数学不仅仅是公式和计算，更是创造和解决问题的工具</Text>
            <View style={styles.mathExample}>
              <Text style={styles.formulaText}>f(x) = ax² + bx + c</Text>
            </View>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>开始数学探索</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 数学领域 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>数学领域</Text>
          <View style={styles.categoriesGrid}>
            {mathCategories.map((category) => (<TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={24} color={category.color}/>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>))}
          </View>
        </View>

        {/* 热门数学课程 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门数学课程</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {mathCourses.map((course) => (<TouchableOpacity key={course.id} style={styles.courseCard}>
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
                      {course.rating} ({course.reviewCount}人已学习)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>))}
        </View>

        {/* 每日数学挑战 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>每日数学挑战</Text>
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeTitle}>今日挑战题</Text>
              <Text style={styles.challengeDifficulty}>难度: ★★★☆☆</Text>
            </View>
            <View style={styles.challengeContent}>
              <Text style={styles.challengeQuestion}>
                一个商店以每件120元的价格销售T恤。如果购买3件或以上，每件可以打9折。小明想要买5件，他需要支付多少钱？
              </Text>
            </View>
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>提交答案</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hintButton}>
              <Text style={styles.hintButtonText}>查看提示</Text>
            </TouchableOpacity>
            <View style={styles.challengeStats}>
              <Text style={styles.challengeStatsText}>
                <Ionicons name="people" size={12} color={theme.colors.textSecondary}/> 237人已解答
              </Text>
              <Text style={styles.challengeStatsText}>
                <Ionicons name="time" size={12} color={theme.colors.textSecondary}/> 今日更新
              </Text>
            </View>
          </View>
        </View>

        {/* 数学游戏 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>数学游戏</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gamesGrid}>
            {mathGames.map((game) => (<TouchableOpacity key={game.id} style={styles.gameCard}>
                <View style={[styles.gameIcon, { backgroundColor: `${game.color}20` }]}>
                  <Ionicons name={game.icon} size={24} color={game.color}/>
                </View>
                <Text style={styles.gameName}>{game.name}</Text>
                <Text style={styles.gameType}>{game.type}</Text>
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
    mathBanner: {
        backgroundColor: theme.colors.mathematics,
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
    mathExample: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: theme.borderRadius.sm,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    formulaText: {
        fontSize: theme.fontSize.lg,
        fontFamily: 'serif',
        color: theme.colors.text,
        textAlign: 'center',
    },
    bannerButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.sm,
        width: '100%',
    },
    bannerButtonText: {
        color: theme.colors.mathematics,
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
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
    challengeCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    challengeTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    challengeDifficulty: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    challengeContent: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    challengeQuestion: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
        lineHeight: 20,
    },
    challengeButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.sm,
    },
    challengeButtonText: {
        color: '#FFFFFF',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
    hintButton: {
        backgroundColor: theme.colors.background,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.md,
    },
    hintButtonText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        textAlign: 'center',
    },
    challengeStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    challengeStatsText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    gamesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gameCard: {
        width: '47%',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },
    gameIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    gameName: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
    },
    gameType: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
});
export default MathematicsScreen;
