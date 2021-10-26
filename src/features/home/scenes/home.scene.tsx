import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import {
  fetchNewestEmployeeStart,
  selectEmployeeLoading,
  selectNewestEmployee
} from 'store/employee';
import { StageView, withHeaderResetter } from 'features/core/components';
import { GithubButton, NewestEmployee, TitleText, Xmark } from '../components';

const HomeSceneComponent: FC = () => {
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const newestEmployee = useSelector(selectNewestEmployee);
  const employeeLoading = useSelector(selectEmployeeLoading);
  const startingTransformY = (height * 0.4) - 106;

  useEffect(() => {
    dispatch(fetchNewestEmployeeStart());
  }, [dispatch]);

  return (
    <StageView>
      <View style={styles.wrapper}>
        {
          employeeLoading
            ? <ActivityIndicator size={60} style={styles.loading(startingTransformY)} />
            : (
              <>
                <TitleText delay={500} />
                {newestEmployee && (
                  <>
                    <Xmark delay={1800} />
                    <NewestEmployee employee={newestEmployee} delay={1800} />
                  </>
                )}
              </>
            )
        }
        <GithubButton style={styles.github} />
      </View>
    </StageView>
  );
};

export const HomeScene = withHeaderResetter(HomeSceneComponent);

const styles = StyleSheet.create<any>({
  loading: (posY: number) => ({
    top: posY
  }),
  wrapper: {
    flex: 1
  },
  github: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30
  }
});
