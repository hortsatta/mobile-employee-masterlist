import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';
import { Divider, Modal, Portal } from 'react-native-paper';

import { Employee, EmployeePageKey, SortBy } from 'models';
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
  FabButton,
  IconName,
  RefreshControl,
  StageFlatList,
  Text,
  withHeaderResetter
} from 'features/core/components';
import {
  EmployeeListItem,
  EmployeeItem,
  EmployeeItemSkeleton,
  EmployeeListHeaderRight,
  EmployeeListFilterOptions,
  EmployeeFiltersFormData,
  pageKeySelectItems
} from '../components';

enum GridMode { SINGLE, BATCH }

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
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [filters, setFilters] = useState<any>({
    pageKey: EmployeePageKey.FULL_NAME,
    sortBy: SortBy.ASC,
    searchKeyword: ''
  });

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

  const refreshData = useCallback(() => {
    if (!filters.searchKeyword.trim()) {
      fetchInitialPageEmployees();
    } else {
      fetchEmployeesByKeyword();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleCancelBatchPress = () => {
    setGridMode(GridMode.SINGLE);
    setSelectedEmployeeIds([]);
  };

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <EmployeeListHeaderRight
          employeeIdCount={selectedEmployeeIds.length}
          isBatchMode={gridMode === GridMode.BATCH}
          onCancelBatchPress={handleCancelBatchPress}
          onBatchPress={() => setGridMode(GridMode.BATCH)}
          onFilterPress={() => setShowModalFilters(true)}
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

  const navigateEmployeeDetail = (employee: Employee) => {
    // const { navigate } = getParent() as any;
    // Set selected employee id, and push to employee detail route
    dispatch(setSelectedEmployee(employee.id));
    navigate(appRoutes.employeeStack.path, {
      screen: appRoutes.employeeDetail.path,
      params: { id: employee.id }
    });
  };

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
    setShowModalFilters(false);
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
              <EmployeeListItem
                isBatchMode={gridMode === GridMode.BATCH}
                onPress={() => navigateEmployeeDetail(item)}
                onLongPress={(append: boolean) => handleEmployeeItemLongPress(append, item)}
              >
                <EmployeeItem index={index} item={item} />
              </EmployeeListItem>
            )
        )}
        ItemSeparatorComponent={ItemSeparator}
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
      <Portal>
        <Modal
          contentContainerStyle={styles.modalFilters}
          visible={showModalFilters}
          onDismiss={() => setShowModalFilters(false)}
        >
          <EmployeeListFilterOptions
            filters={filters}
            style={styles.filterOptions}
            onSubmit={handleFiltersSubmit}
          />
        </Modal>
      </Portal>
    </>
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
  header: {
    paddingTop: 8,
    paddingBottom: 24
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
  },
  modalFilters: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden'
  },
  filterOptions: {
    paddingHorizontal: 24
  }
});
