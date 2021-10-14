import React, { FC } from 'react';

import {StageView, Text, withHeaderResetter } from 'features/core/components';

const UpsertEmployeeSceneComponent: FC = () => {
  return (
    <StageView withSubHeader>
      <Text>New Employee</Text>
    </StageView>
  );
};

export const UpsertEmployeeScene = withHeaderResetter(UpsertEmployeeSceneComponent);
