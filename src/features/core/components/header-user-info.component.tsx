import React, { ComponentProps, FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';

import { fontSizes } from 'config/core';
import { selectCurrentEmployee } from 'store/auth';
import { selectAllJobTitleEntities } from 'store/job-title';
import { Text } from './text.component';

export const HeaderUserInfo: FC<ComponentProps<typeof View>> = ({ style }) => {
  const currentEmployee = useSelector(selectCurrentEmployee);
  const jobTitles = useSelector(selectAllJobTitleEntities);
  const { jobTitle, personalInfo } = currentEmployee || {};

  const currentJobTitle = useMemo(() => (
    jobTitle && jobTitles[jobTitle.titleId]
  ), [jobTitles, jobTitle]);

  return (
    <Animated.View style={style}>
      <Text style={styles.name}>{personalInfo?.firstName}</Text>
      <Text style={styles.jobTitle}>{currentJobTitle?.name}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 21,
    textTransform: 'uppercase',
    letterSpacing: -1,
    lineHeight: 28,
    height: 26
  },
  jobTitle: {
    fontSize: fontSizes.text,
    opacity: 0.5
  }
});
