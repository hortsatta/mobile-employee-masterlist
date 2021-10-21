import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';

import { Employee, EmployeePageKey, GridMode, SortBy } from 'models';
import { appRoutes } from 'config/core';
import {
  fetchEmployeesByKeywordStart,
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
  ActiveFiltersHeader,
  BottomSheetScrollView,
  FabButton,
  Fin,
  GridItemSeparator,
  GridListItem,
  IconName,
  RefreshControl,
  StageFlatList,
  withHeaderResetter
} from 'features/core/components';
import {
  EmployeeItem,
  EmployeeItemSkeleton,
  EmployeeListHeaderRight,
  EmployeeListFilterOptions,
  EmployeeFiltersFormData,
  pageKeySelectItems
} from '../components';

const placeholderData = [{ id: '1' }, { id: '2' }];

const Placeholder: FC = () => (
  <View>
    <EmployeeItemSkeleton />
    <GridItemSeparator />
    <EmployeeItemSkeleton />
  </View>
);

const EmployeeListSceneComponent: FC = () => {
  const { navigate, setOptions } = useNavigation() as any;
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const currentPage = useSelector(selectCurrentPage);
  const pageLoading = useSelector(selectEmployeePageLoading);
  const employeeLoading = useSelector(selectEmployeeLoading);
  const isAllEmployeesLoaded = useSelector(selectIsAllEmployeesLoaded);
  const [refreshing, setRefreshing] = useState(false);
  const [gridMode, setGridMode] = useState(GridMode.SINGLE);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string []>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<any>({
    pageKey: EmployeePageKey.FULL_NAME,
    sortBy: SortBy.ASC,
    searchKeyword: ''
  });

  const refreshData = useCallback(() => {
    if (!filters.searchKeyword.trim()) {
      fetchInitialPageEmployees();
    } else {
      fetchEmployeesByKeyword();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => refreshData(), [refreshData]);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <EmployeeListHeaderRight
          employeeIdCount={selectedEmployeeIds.length}
          isBatchMode={gridMode === GridMode.BATCH}
          onCancelBatchPress={handleCancelBatchPress}
          onBatchPress={() => setGridMode(GridMode.BATCH)}
          onFilterPress={() => setShowFilters(true)}
        />
      )
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployeeIds, gridMode]);

  useEffect(() => {
    // Return if current page in undefined, else hide refreshing indicator
    if (currentPage == null) { return; }
    setRefreshing(false);
  }, [currentPage]);

  const fetchEmployeesByKeyword = useCallback(() => {
    dispatch(fetchEmployeesByKeywordStart(
      filters.searchKeyword,
      filters.pageKey,
      filters.sortBy,
      true
    ));
  }, [dispatch, filters]);

  const fetchInitialPageEmployees = useCallback(() => {
    dispatch(fetchInitialPageEmployeesStart(filters.pageKey, filters.sortBy, true));
  }, [dispatch, filters]);

  const fetchNextPageEmployees = () => {
    dispatch(fetchNextPageEmployeesStart(filters.pageKey, filters.sortBy, true));
  };

  const navigateEmployeeDetail = (employee: Employee) => {
    // Set selected employee id, and push to employee detail route
    dispatch(setSelectedEmployee(employee.id));
    navigate(appRoutes.employeeStack.path, {
      screen: appRoutes.employeeDetail.path,
      params: { id: employee.id }
    });
  };

  const handleCancelBatchPress = useCallback(() => {
    setGridMode(GridMode.SINGLE);
    setSelectedEmployeeIds([]);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    handleCancelBatchPress();
    refreshData();
  };

  const handleEndReached = () => {
    if (pageLoading
      || employeeLoading
      || refreshing
      || isAllEmployeesLoaded
      || (!!filters.searchKeyword.trim())
    ) { return; }
    fetchNextPageEmployees();
  };

  const handleEmployeeItemLongPress = (append: boolean, employee: Employee) => {
    if (gridMode !== GridMode.BATCH) {
      setGridMode(GridMode.BATCH);
    }

    const employeeIds = append
      ? [...selectedEmployeeIds, employee.id]
      : selectedEmployeeIds.filter(e => e !== employee.id);

    setSelectedEmployeeIds(employeeIds);
  };

  const handleFiltersSubmit = (formData: EmployeeFiltersFormData) => {
    setShowFilters(false);
    setFilters(formData);
  };

  return (
    <>
      <StageFlatList
        contentContainerStyle={styles.wrapper}
        data={!employeeLoading ? employees : placeholderData}
        renderItem={({ item, index }) => (
          (employeeLoading || refreshing)
            ? <Placeholder />
            : (
              <GridListItem
                isBatchMode={gridMode === GridMode.BATCH}
                onPress={() => navigateEmployeeDetail(item)}
                onLongPress={(append: boolean) => handleEmployeeItemLongPress(append, item)}
              >
                <EmployeeItem index={index} item={item} />
              </GridListItem>
            )
        )}
        ItemSeparatorComponent={GridItemSeparator}
        ListHeaderComponentStyle={styles.header}
        ListHeaderComponent={
          <ActiveFiltersHeader
            keyword={filters.searchKeyword}
            sortBy={pageKeySelectItems.find(item => item.value === filters.pageKey)?.label}
            orderBy={filters.sortBy}
          />
        }
        ListFooterComponentStyle={styles.footer}
        ListFooterComponent={
          pageLoading
            ? <Placeholder />
            : (
              <Fin
                show={
                  (isAllEmployeesLoaded && !employeeLoading)
                  || (!!filters.searchKeyword.trim() && !employeeLoading)
                }
              />
            )
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
      <BottomSheetScrollView
        show={showFilters}
        snapPoints={['55%', '100%']}
        onClose={() => setShowFilters(false)}
      >
        <EmployeeListFilterOptions
          style={styles.filterOptions}
          filters={filters}
          onSubmit={handleFiltersSubmit}
        />
      </BottomSheetScrollView>
    </>
  );
};

export const EmployeeListScene = withHeaderResetter(EmployeeListSceneComponent);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0
  },
  header: {
    paddingTop: 8,
    paddingBottom: 24
  },
  footer: {
    paddingTop: 5
  },
  filterOptions: {
    paddingHorizontal: 24
  }
});
