import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../utils/theme';

interface StatusBarProps {
  backgroundColor?: string;
  textColor?: string;
}

export const CustomStatusBar: React.FC<StatusBarProps> = ({
  backgroundColor = '#000000',
  textColor = '#FFFFFF',
}) => {
  const insets = useSafeAreaInsets();
  
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: insets.top }]}>
      <Text style={[styles.time, { color: textColor }]}>
        {getCurrentTime()}
      </Text>
      <View style={styles.rightSection}>
        <View style={styles.iconContainer}>
          <Ionicons name="cellular" size={16} color={textColor} />
          <Ionicons name="wifi" size={16} color={textColor} />
          <View style={styles.batteryContainer}>
            <Ionicons name="battery-full" size={16} color={textColor} />
            <Text style={[styles.batteryText, { color: textColor }]}>100%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  time: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  batteryText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.medium,
  },
}); 