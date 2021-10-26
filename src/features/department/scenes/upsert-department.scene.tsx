import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { StageView, withHeaderResetter } from 'features/core/components';

const UpsertDepartmentSceneComponent: FC = () => {
  return (
    <StageView style={styles.wrapper} withSubHeader />
  );
};

export const UpsertDepartmentScene = withHeaderResetter(UpsertDepartmentSceneComponent);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0
  }
});
