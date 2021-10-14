import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Employee, EmployeePageKey, SortBy } from 'models';
import { appRoutes } from 'config/core';
import {
  fetchInitialPageEmployeesStart,
  fetchNextPageEmployeesStart,
  selectAllEmployees,
  selectCurrentPage,
  selectEmployeeLoading,
  selectEmployeePageLoading,
  selectIsAllEmployeesLoaded,
  setSelectedEmployee
} from 'store/employee';
import {
  FabButton,
  IconName,
  RefreshControl,
  StageFlatList,
  Text,
  withHeaderResetter
} from 'features/core/components';
import { EmployeeItem, EmployeeItemSkeleton } from '../components';

const placeholderData = [{ id: '1' }, { id: '2' }];

const ItemSeparator: FC = () => <Divider style={styles.divider}  />;

const Placeholder: FC = () => (
  <View>
    <EmployeeItemSkeleton />
    <ItemSeparator />
    <EmployeeItemSkeleton />
  </View>
);

const Fin: FC<{ show: boolean }> = ({ show }) => (
  show ? <Text style={styles.finText}>fin.</Text> : null
);

const EmployeeListSceneComponent: FC = () => {
  const { navigate, getParent } = useNavigation();
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const currentPage = useSelector(selectCurrentPage);
  const pageLoading = useSelector(selectEmployeePageLoading);
  const employeeLoading = useSelector(selectEmployeeLoading);
  const isAllEmployeesLoaded = useSelector(selectIsAllEmployeesLoaded);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInitialPageEmployees = useCallback(() => {
    dispatch(fetchInitialPageEmployeesStart(EmployeePageKey.FULL_NAME, SortBy.ASC, true));
  }, [dispatch]);

  const fetchNextPageEmployees = () => {
    dispatch(fetchNextPageEmployeesStart(EmployeePageKey.FULL_NAME, SortBy.ASC, true));
  };

  useEffect(() => {
    fetchInitialPageEmployees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Return if current page in undefined, else hide refreshing indicator
    if (currentPage == null) { return; }
    setRefreshing(false);
  }, [currentPage]);

  const navigateEmployeeDetail = (employee: Employee) => {
    const { push } = getParent() as any;
    // Set selected employee id, and push to employee detail route
    dispatch(setSelectedEmployee(employee.id));
    push(appRoutes.employeeStack.path, {
      screen: appRoutes.employeeDetail.path,
      params: { id: employee.id }
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInitialPageEmployees();
  };

  const handleEndReached = () => {
    if (pageLoading
      || employeeLoading
      || refreshing
      || isAllEmployeesLoaded
    ) { return; }
    fetchNextPageEmployees();
  };

  return (
    <StageFlatList
      contentContainerStyle={styles.wrapper}
      data={!employeeLoading ? employees : placeholderData}
      renderItem={({ item, index }) => (
        (employeeLoading || refreshing)
          ? <Placeholder />
          : (
            <EmployeeItem
              index={index}
              item={item}
              onPress={() => navigateEmployeeDetail(item)}
            />
          )
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponentStyle={styles.footer}
      ListFooterComponent={
        pageLoading
          ? <Placeholder />
          : <Fin show={isAllEmployeesLoaded && !employeeLoading} />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          isStage
          withSubHeader
        />
      }
      floatingChildren={
        <FabButton
          iconName={IconName.PLUS}
          onPress={() => navigate(appRoutes.upsertEmployee.path)}
        />
      }
      onEndReachedThreshold={0.2}
      onEndReached={handleEndReached}
      showsVerticalScrollIndicator={false}
      withSubHeader
    />
  );
};

export const EmployeeListScene = withHeaderResetter(EmployeeListSceneComponent);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0
  },
  divider: {
    height: 5,
    backgroundColor: 'transparent'
  },
  footer: {
    paddingTop: 5
  },
  finText: {
    marginTop: 4,
    marginRight: 16,
    textAlign: 'right',
    fontStyle: 'italic',
    opacity: 0.4
  }
});
