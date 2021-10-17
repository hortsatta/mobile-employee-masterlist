import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { Employee, PaperTheme } from 'models';
import { fontSizes } from 'config/core';
import { selectAllDepartmentEntities } from 'store/department';
import { selectAllJobTitleEntities } from 'store/job-title';
import { Text } from 'features/core/components';
import { EmployeeImage } from './employee-image.component';

type Props = {
  item: Employee;
  index: number;
  style?: ViewStyle;
  loading?: boolean;
}

export const EmployeeItem: FC<Props> = ({ style, item, index, loading }) => {
  const theme = useTheme();
  const departments = useSelector(selectAllDepartmentEntities);
  const jobTitles = useSelector(selectAllJobTitleEntities);
  const { personalInfo, department, jobTitle } = item;
  const { pictureThumb, fullName, gender } = personalInfo;
  const formattedIndex = (`000${++index}`).slice(-3);

  const currentDepartment = useMemo(() => (
    department && departments[department.departmentId]
  ), [departments, department]);

  const currentJobTitle = useMemo(() => (
    jobTitle && jobTitles[jobTitle.titleId]
  ), [jobTitles, jobTitle]);

  return (
    <View style={[styles.wrapper(theme), style]}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}
      <View style={styles.indexWrapper}>
        <Text style={styles.index}>{formattedIndex}</Text>
      </View>
      <EmployeeImage
        wrapperStyle={styles.imageWrapper}
        imageUrl={pictureThumb}
        gender={gender}
      />
      <View style={styles.titleWrapper}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.subText}>{currentDepartment?.alias}</Text>
        <Text style={styles.subText}>{currentJobTitle?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.surface,
    borderColor: '#e5e5e5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden'
  }),
  imageWrapper: {
    width: 65,
    height: 65
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  fullName: {
    fontSize: fontSizes.label,
    lineHeight: 18
  },
  subText: {
    fontSize: fontSizes.text,
    opacity: 0.5,
    lineHeight: 16
  },
  indexWrapper: {
    width: 16,
    height: '100%',
    backgroundColor: '#dddddd'
  },
  index: {
    position: 'absolute',
    right: -23,
    top: 38,
    width: 64,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: -1,
    opacity: 0.5,
    transform: [
      { rotate: '90deg' },
      { translateX: -15 }
    ]
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1
  }
});
