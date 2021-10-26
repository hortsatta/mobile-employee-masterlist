import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { JobTitleRbacType } from 'config/rbac';
import { GridMode, JobTitle, SortBy } from 'models';
import { selectAllDepartmentEntities } from 'store/department';
import {
  fetchAllJobTitlesStart,
  selectFilteredJobTitlesGroupedByDepartment,
  selectJobTitleFilters,
  selectJobTitleLoading,
  setJobTitleFilters
} from 'store/job-title';
import { useDebounce, useGuard } from 'features/core/hooks';
import {
  ActiveFiltersHeader,
  BottomSheetScrollView,
  Fin,
  GridItemSeparator,
  GridListItem,
  RefreshControl,
  StageSectionList,
  Text,
  withHeaderResetter
} from 'features/core/components';
import {
  JobTitleItem,
  JobTitleItemSkeleton,
  JobTitleListFilterOptions,
  JobTitleListHeaderRight
} from '../components';

type ListItemProps = {
  index: number;
  item: any;
  gridMode: GridMode;
  onLongPress: (append: boolean) => void;
  canActivate: boolean;
}

const placeholderData = [{
  departmentId: '',
  data: [{ id: '1' }, { id: '2' }]
}];

const Placeholder: FC = () => (
  <View>
    <JobTitleItemSkeleton />
    <GridItemSeparator />
    <JobTitleItemSkeleton />
  </View>
);

const SectionHeader: FC = ({ children }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>
      {children}
    </Text>
    <Divider />
  </View>
);

const ListItem: FC<ListItemProps> = ({ index, item, gridMode, onLongPress, canActivate }) => (
  canActivate
    ? (
      <GridListItem isBatchMode={gridMode === GridMode.BATCH} onLongPress={onLongPress}>
        <JobTitleItem index={index} item={item} />
      </GridListItem>
    )
    : (
      <GridListItem isBatchMode={false}>
        <JobTitleItem index={index} item={item} />
      </GridListItem>
    )
);

const JobTitleListSceneComponent: FC = () => {
  const dispatch = useDispatch();
  const { setOptions } = useNavigation() as any;
  const { canActivate } = useGuard();
  const { debounce, loading: debounceLoading } = useDebounce();
  const departments = useSelector(selectAllDepartmentEntities);
  const jobTitles = useSelector(selectFilteredJobTitlesGroupedByDepartment);
  const jobTitleLoading = useSelector(selectJobTitleLoading);
  const filters = useSelector(selectJobTitleFilters);
  const [gridMode, setGridMode] = useState(GridMode.SINGLE);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState<any>(false);
  const [selectedJobTitleIds, setSelectedJobTitleIds] = useState<string []>([]);

  const activeFilterByText = useMemo(() => {
    const keyword = filters.searchKeyword?.trim();
    const dept = filters.filterDepartment?.trim();

    if (!keyword && !dept) { return ''; }

    const activeDept = dept && `${keyword && ', '}${departments[dept]?.alias} Department`;
    return `${keyword}${activeDept}`;
  }, [filters, departments]);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <JobTitleListHeaderRight
          jobTitleIdCount={selectedJobTitleIds.length}
          isBatchMode={gridMode === GridMode.BATCH}
          onCancelBatchPress={handleCancelBatchPress}
          onBatchPress={() => setGridMode(GridMode.BATCH)}
          onFilterPress={() => setShowFilters(true)}
        />
      )
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobTitleIds, gridMode]);

  const refreshData = () => {
    dispatch(fetchAllJobTitlesStart(() => setRefreshing(false)));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleCancelBatchPress();
    refreshData();
  };

  const handleCancelBatchPress = useCallback(() => {
    setGridMode(GridMode.SINGLE);
    setSelectedJobTitleIds([]);
  }, []);

  const handleJobTitleItemLongPress = (append: boolean, jobTitle: JobTitle) => {
    if (gridMode !== GridMode.BATCH) {
      setGridMode(GridMode.BATCH);
    }

    const jobTitleIds = append
      ? [...selectedJobTitleIds, jobTitle.id]
      : selectedJobTitleIds.filter(e => e !== jobTitle.id);

    setSelectedJobTitleIds(jobTitleIds);
  };

  const handleFiltersSubmit = (formData: {
    searchKeyword?: string,
    filterDepartment?: string
  }) => {
    setShowFilters(false);
    debounce();
    dispatch(setJobTitleFilters(...Object.values(formData)));
  };

  return (
    <>
      <StageSectionList
        contentContainerStyle={styles.wrapper}
        sections={!(jobTitleLoading || debounceLoading) ? jobTitles : placeholderData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }: { item: JobTitle; index: number; }) => (
          (jobTitleLoading || refreshing || debounceLoading)
            ? <Placeholder />
            : (
              <ListItem
                index={index}
                item={item}
                gridMode={gridMode}
                onLongPress={(append: boolean) => handleJobTitleItemLongPress(append, item)}
                canActivate={canActivate([JobTitleRbacType.CREATE, JobTitleRbacType.UPDATE])}
              />
            )
        )}
        renderSectionHeader={({ section: { departmentId } }) => (
          <SectionHeader>{departments[departmentId]?.name}</SectionHeader>
        )}
        ItemSeparatorComponent={GridItemSeparator}
        ListHeaderComponent={
          <ActiveFiltersHeader
            style={styles.header}
            keyword={activeFilterByText}
            sortBy='Title Name'
            orderBy={SortBy.ASC}
          />
        }
        ListFooterComponent={
          <Fin
            style={styles.footer}
            show={!(jobTitleLoading || refreshing || debounceLoading)}
          />
        }
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
        snapPoints={['55%', '100%']}
        onClose={() => setShowFilters(false)}
      >
        <JobTitleListFilterOptions
          style={styles.filterOptions}
          filters={filters}
          onSubmit={handleFiltersSubmit}
        />
      </BottomSheetScrollView>
    </>
  );
};

export const JobTitleListScene = withHeaderResetter(JobTitleListSceneComponent);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  sectionTitle: {
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    opacity: 0.5
  },
  header: {
    paddingTop: 8
  },
  footer: {
    paddingTop: 5
  },
  filterOptions: {
    paddingHorizontal: 24
  }
});
