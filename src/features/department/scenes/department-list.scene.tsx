import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';

import { Department, GridMode, SortBy } from 'models';
import {
  fetchAllDepartmentsStart,
  selectDepartmentSearchKeyword,
  selectDepartmentLoading,
  setDepartmentSearchKeyword,
  selectDepartmentsByKeyword
} from 'store/department';
import {
  ActiveFiltersHeader,
  BottomSheetScrollView,
  Fin,
  GridItemSeparator,
  GridListItem,
  RefreshControl,
  StageFlatList,
  withHeaderResetter
} from 'features/core/components';
import {
  DepartmentItem,
  DepartmentItemSkeleton,
  DepartmentListFilterOptions,
  DepartmentListHeaderRight
} from '../components';
import { useDebounce } from 'features/core/hooks';

const placeholderData = [{ id: '1' }, { id: '2' }];

const Placeholder: FC = () => (
  <View>
    <DepartmentItemSkeleton />
    <GridItemSeparator />
    <DepartmentItemSkeleton />
  </View>
);

const DepartmentListSceneComponent: FC = () => {
  const dispatch = useDispatch();
  const { setOptions } = useNavigation() as any;
  const { debounce, loading: debounceLoading } = useDebounce();
  const departments = useSelector(selectDepartmentsByKeyword);
  const searchKeyword = useSelector(selectDepartmentSearchKeyword);
  const departmentLoading = useSelector(selectDepartmentLoading);
  const [gridMode, setGridMode] = useState(GridMode.SINGLE);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState<any>(false);
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<string []>([]);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <DepartmentListHeaderRight
          departmentIdCount={selectedDepartmentIds.length}
          isBatchMode={gridMode === GridMode.BATCH}
          onCancelBatchPress={handleCancelBatchPress}
          onBatchPress={() => setGridMode(GridMode.BATCH)}
          onFilterPress={() => setShowFilters(true)}
        />
      )
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartmentIds, gridMode]);

  const refreshData = () => {
    dispatch(fetchAllDepartmentsStart(() => setRefreshing(false)));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleCancelBatchPress();
    refreshData();
  };

  const handleCancelBatchPress = useCallback(() => {
    setGridMode(GridMode.SINGLE);
    setSelectedDepartmentIds([]);
  }, []);

  const handleDepartmentItemLongPress = (append: boolean, department: Department) => {
    if (gridMode !== GridMode.BATCH) {
      setGridMode(GridMode.BATCH);
    }

    const departmentIds = append
      ? [...selectedDepartmentIds, department.id]
      : selectedDepartmentIds.filter(e => e !== department.id);

    setSelectedDepartmentIds(departmentIds);
  };

  const handleFiltersSubmit = (formData: { searchKeyword?: string }) => {
    setShowFilters(false);
    debounce();
    dispatch(setDepartmentSearchKeyword(formData.searchKeyword || ''));
  };

  return (
    <>
      <StageFlatList
        contentContainerStyle={styles.wrapper}
        data={(!departmentLoading && !debounceLoading) ? departments : placeholderData}
        renderItem={({ item, index }) => (
          (departmentLoading || refreshing || debounceLoading)
            ? <Placeholder />
            : (
              <GridListItem
                isBatchMode={gridMode === GridMode.BATCH}
                onLongPress={(append: boolean) => handleDepartmentItemLongPress(append, item)}
              >
                <DepartmentItem index={index} item={item} />
              </GridListItem>
            )
        )}
        ItemSeparatorComponent={GridItemSeparator}
        ListHeaderComponentStyle={styles.header}
        ListHeaderComponent={
          <ActiveFiltersHeader
            keyword={searchKeyword}
            sortBy='Department Name'
            orderBy={SortBy.ASC}
          />}
        ListFooterComponentStyle={styles.footer}
        ListFooterComponent={<Fin show={!departmentLoading} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            isStage
            withSubHeader
          />
        }
        showsVerticalScrollIndicator={false}
        withSubHeader
      />
      <BottomSheetScrollView
        show={showFilters}
        snapPoints={['55%']}
        onClose={() => setShowFilters(false)}
      >
        <DepartmentListFilterOptions
          style={styles.filterOptions}
          searchKeyword={searchKeyword}
          onSubmit={handleFiltersSubmit}
        />
      </BottomSheetScrollView>
    </>
  );
};

export const DepartmentListScene = withHeaderResetter(DepartmentListSceneComponent);

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
