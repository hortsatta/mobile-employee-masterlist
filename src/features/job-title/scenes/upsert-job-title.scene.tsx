import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { StageView, withHeaderResetter } from 'features/core/components';

const UpsertJobTitleSceneComponent: FC = () => {
  return (
    <StageView style={styles.wrapper} withSubHeader />
  );
};

export const UpsertJobTitleScene = withHeaderResetter(UpsertJobTitleSceneComponent);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0
  }
});
