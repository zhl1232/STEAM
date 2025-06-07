import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';
const SettingsScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [autoPlay, setAutoPlay] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const settingsSections = [
        {
            title: '通知设置',
            items: [
                {
                    id: 'notifications',
                    title: '推送通知',
                    subtitle: '接收课程更新、活动提醒等通知',
                    type: 'switch',
                    value: notifications,
                    onToggle: setNotifications,
                },
                {
                    id: 'sound',
                    title: '声音提醒',
                    subtitle: '开启通知声音',
                    type: 'switch',
                    value: soundEnabled,
                    onToggle: setSoundEnabled,
                },
            ],
        },
        {
            title: '播放设置',
            items: [
                {
                    id: 'autoplay',
                    title: '自动播放',
                    subtitle: '视频课程自动播放下一集',
                    type: 'switch',
                    value: autoPlay,
                    onToggle: setAutoPlay,
                },
                {
                    id: 'quality',
                    title: '视频质量',
                    subtitle: '自动',
                    type: 'navigation',
                    onPress: () => console.log('视频质量设置'),
                },
            ],
        },
        {
            title: '外观设置',
            items: [
                {
                    id: 'darkmode',
                    title: '深色模式',
                    subtitle: '开启深色主题',
                    type: 'switch',
                    value: darkMode,
                    onToggle: setDarkMode,
                },
                {
                    id: 'language',
                    title: '语言',
                    subtitle: '简体中文',
                    type: 'navigation',
                    onPress: () => console.log('语言设置'),
                },
            ],
        },
        {
            title: '隐私与安全',
            items: [
                {
                    id: 'privacy',
                    title: '隐私设置',
                    subtitle: '管理个人信息可见性',
                    type: 'navigation',
                    onPress: () => console.log('隐私设置'),
                },
                {
                    id: 'password',
                    title: '修改密码',
                    subtitle: '更改登录密码',
                    type: 'navigation',
                    onPress: () => console.log('修改密码'),
                },
                {
                    id: 'security',
                    title: '账号安全',
                    subtitle: '绑定手机、邮箱等安全设置',
                    type: 'navigation',
                    onPress: () => console.log('账号安全'),
                },
            ],
        },
        {
            title: '学习设置',
            items: [
                {
                    id: 'reminder',
                    title: '学习提醒',
                    subtitle: '设置每日学习提醒时间',
                    type: 'navigation',
                    onPress: () => console.log('学习提醒'),
                },
                {
                    id: 'progress',
                    title: '学习进度同步',
                    subtitle: '多设备同步学习进度',
                    type: 'switch',
                    value: true,
                    onToggle: () => { },
                },
            ],
        },
        {
            title: '其他',
            items: [
                {
                    id: 'cache',
                    title: '清理缓存',
                    subtitle: '清理应用缓存数据 (120MB)',
                    type: 'navigation',
                    onPress: () => console.log('清理缓存'),
                },
                {
                    id: 'feedback',
                    title: '意见反馈',
                    subtitle: '帮助我们改进产品',
                    type: 'navigation',
                    onPress: () => console.log('意见反馈'),
                },
                {
                    id: 'about',
                    title: '关于我们',
                    subtitle: '版本 1.0.0',
                    type: 'navigation',
                    onPress: () => console.log('关于我们'),
                },
            ],
        },
    ];
    const renderSettingItem = (item) => {
        return (<TouchableOpacity key={item.id} style={styles.settingItem} onPress={item.onPress} disabled={item.type === 'switch'}>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        
        {item.type === 'switch' ? (<Switch value={item.value} onValueChange={item.onToggle} trackColor={{
                    false: theme.colors.border,
                    true: `${theme.colors.primary}40`,
                }} thumbColor={item.value ? theme.colors.primary : '#f4f3f4'}/>) : (<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary}/>)}
      </TouchableOpacity>);
    };
    return (<SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置</Text>
        <View style={styles.headerRight}/>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (<View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (<View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (<View style={styles.divider}/>)}
                </View>))}
            </View>
          </View>))}

        {/* 退出登录按钮 */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>退出登录</Text>
          </TouchableOpacity>
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
    headerRight: {
        width: 40, // 占位，保持标题居中
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    sectionContent: {
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    settingSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginLeft: theme.spacing.md,
    },
    logoutButton: {
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.error,
    },
});
export default SettingsScreen;
