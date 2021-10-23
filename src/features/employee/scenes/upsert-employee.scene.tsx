import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { Keyboard, StyleSheet } from 'react-native';
import PagerView, { ViewPagerOnPageSelectedEvent } from 'react-native-pager-view';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

import { appRoutes } from 'config/core';
import { isPlatformIOS } from 'helpers';
import { Employee, Gender, PersonalInfo } from 'models';
import { createLocalEmployee } from 'services';
import { appendNotificationMessages } from 'store/core';
import {
  addNewEmployeeFailure,
  addNewEmployeeStart,
  addNewEmployeeSuccess,
  fetchEmployeesCanceled,
  selectEmployeeLoading,
  selectSelectedEmployee,
  setSelectedEmployee
} from 'store/employee';
import { useDebounce } from 'features/core/hooks';
import {
  FabButton,
  IconName,
  PagerViewNavigation,
  StageView,
  withHeaderResetter
} from 'features/core/components';
import {
  UpsertEmployeePage0,
  UpsertEmployeePage1,
  UpsertEmployeePage2,
  UpsertEmployeePage3,
  UpsertEmployeePage4
} from '../components';

type EmployeeFormData =
  Omit<Employee, 'id' | 'hireDate' | 'department' | 'jobTitle' | 'salary' | 'personalInfo'>
  & Omit<PersonalInfo, 'birthDate' | 'picture' | 'phones' | 'emails'>
  & {
    hireDate: Date;
    department: string;
    jobTitle: string;
    birthDate: Date;
    phones: { value: string }[];
    emails: { value: string }[];
    id?: string;
    salary?: number;
    picture?: string;
  }

const defaultValues: EmployeeFormData = {
  hireDate: dayjs().toDate(),
  department: '',
  jobTitle: '',
  // Personal info
  firstName: '',
  lastName: '',
  middleInitial: '',
  gender: Gender.FEMALE,
  birthDate: dayjs(`${dayjs().year()}-01-01`)
    .subtract(18, 'year')
    .toDate(),
  currentAddress: '',
  homeAddress: '',
  phones: [],
  emails: [],
  picture: '',
  isActive: true
};

const schema = z.object({
  hireDate: z.date(),
  department: z.string().min(1),
  jobTitle: z.string().min(1),
  salary: z.number().nonnegative(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleInitial: z.string().length(1),
  gender: z.string().min(1),
  birthDate: z.date().refine(date => date < dayjs().toDate()),
  currentAddress: z.string().min(1),
  homeAddress: z.string().min(1),
  phones: z.array(z.object({ value: z.string().min(1) })).nonempty(),
  emails: z.array(z.object({ value: z.string().email() })).nonempty(),
  isActive: z.boolean()
});

const fieldPageIndexList: any = {
  1: ['department', 'jobTitle', 'hireDate', 'salary'],
  2: ['firstName', 'lastName', 'middleInitial', 'gender', 'birthDate'],
  3: ['currentAddress', 'homeAddress', 'phones', 'emails']
};

const pages = (isEditMode: boolean) => (isEditMode
  ? [UpsertEmployeePage1, UpsertEmployeePage2, UpsertEmployeePage3]
  : [UpsertEmployeePage0, UpsertEmployeePage1,
    UpsertEmployeePage2, UpsertEmployeePage3]
);

const UpsertEmployeeSceneComponent: FC = () => {
  const dispatch = useDispatch();
  const { navigate, setOptions } = useNavigation();
  const { debounce, loading: debounceLoading } = useDebounce();
  const methods = useForm<EmployeeFormData>({
    defaultValues,
    resolver: zodResolver(schema)
  });
  const { handleSubmit, reset } = methods;
  const selectedEmployee = useSelector(selectSelectedEmployee);
  const loading = useSelector(selectEmployeeLoading);
  // Local states
  const pagerViewRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const pageCount = useMemo(() => (
    pages(!!selectedEmployee).length
  ), [selectedEmployee]);

  useEffect(() => {
    // Cancel ongoing fetching of employees
    dispatch(fetchEmployeesCanceled());

    // Add listener for keyboard visibility
    const keyboardDidShowListener =
      Keyboard.addListener(
        isPlatformIOS() ? 'keyboardWillShow' : 'keyboardDidShow',
        () => setKeyboardVisible(true)
      );

    const keyboardDidHideListener =
      Keyboard.addListener(
        isPlatformIOS() ? 'keyboardWillHide' : 'keyboardDidHide',
        () => setKeyboardVisible(false)
      );

    // Remove subscription on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      dispatch(setSelectedEmployee());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for selected employee. If exist, set form to edit mode,
  // assign values of selected employee to form fields, and
  // set page title
  useEffect(() => {
    if (!selectedEmployee) { return; }
    setOptions({ title: 'Update Employee' });
    loadEmployeeToUpdate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee]);

  useEffect(() => {
    if (isLastPage || (currentPage < pageCount)) { return; }
    setIsLastPage(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!isCompleted) { return; }
    setTimeout(() => {
      navigate(appRoutes.employeeList.path);
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  const loadEmployeeToUpdate = useCallback(() => {
    const {
      id,
      hireDate,
      department,
      jobTitle,
      salary,
      isActive,
      personalInfo
    }: any = selectedEmployee;

    const existingEmployee: EmployeeFormData = {
      id,
      hireDate: dayjs(hireDate.date).toDate(),
      department: department.departmentId,
      jobTitle: jobTitle.titleId,
      salary: salary.salary,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      middleInitial: personalInfo.middleInitial,
      gender: personalInfo.gender.toLowerCase(),
      birthDate: dayjs(personalInfo.birthDate.date).toDate(),
      currentAddress: personalInfo.currentAddress,
      homeAddress: personalInfo.homeAddress,
      phones: personalInfo.phones.map((phone: string) => ({ value: phone })),
      emails: personalInfo.emails.map((email: string) => ({ value: email })),
      // picture: '',
      isActive
    };

    setIsLastPage(true);
    reset(existingEmployee);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee]);

  const handlePageSelected = ({ nativeEvent }: ViewPagerOnPageSelectedEvent) => {
    setCurrentPage(nativeEvent.position);
  };

  const handleSubmission = () => {
    // If user hasn't been to the last page,
    // then prevent submit and goto next page.
    if (!isLastPage) {
      pagerViewRef.current?.setPage(currentPage + 1);
      return;
    }

    handleSubmit(
      async (formData: EmployeeFormData) => {
        // Dispatch start of adding new employee, add artificial delay (debounce),
        // and go to last page of form,
        dispatch(addNewEmployeeStart());
        debounce(() => setIsCompleted(true));
        pagerViewRef.current?.setPage(pageCount);
        setCurrentPage(pageCount);

        // Temporarily create new employee to be stored locally only.
        // Don't add employee to firebase firestore (for now).
        try {
          const newEmployee = await createLocalEmployee(formData);
          dispatch(addNewEmployeeSuccess(newEmployee));
        } catch (error: any) {
          dispatch(addNewEmployeeFailure());
          dispatch(appendNotificationMessages({
            status: error.name.toLowerCase(),
            message: error.message
          }));
        }
      },
      // Invalid form will locate and jump to page of fields with error.
      async (errors) => {
        const errorFieldName = Object.keys(errors)[0];
        Object.keys(fieldPageIndexList).some(index => {
          const page = parseInt(index, 10);
          const exist = !!fieldPageIndexList[page]
            .find((field: string) => field === errorFieldName);

          if (exist) { pagerViewRef.current?.setPage(page); }
          return exist;
        });
      }
    )();
  };

  return (
    <FormProvider {...methods}>
      <StageView style={styles.wrapper} withSubHeader>
        <PagerViewNavigation
          style={styles.pagerViewNav}
          currentPage={currentPage}
          pageCount={pageCount + 1}
        />
        <PagerView
          ref={pagerViewRef}
          style={styles.pagerView}
          pageMargin={16}
          initialPage={0}
          onPageSelected={handlePageSelected}
        >
          {pages(!!selectedEmployee).map((Page, index) => (
            <Page key={index.toString()} />
          ))}
          <UpsertEmployeePage4
            isUpdate={!!selectedEmployee}
            isCompleted={isCompleted}
          />
        </PagerView>
        {!isKeyboardVisible && <FabButton
          loading={loading || debounceLoading}
          disabled={isCompleted}
          iconName={isLastPage
            ? IconName.FLOPPY_DISK
            : IconName.FLOPPY_DISK_ARROW_RIGHT}
          onPress={handleSubmission}
        />}
      </StageView>
    </FormProvider>
  );
};

export type { EmployeeFormData };
export const UpsertEmployeeScene = withHeaderResetter(UpsertEmployeeSceneComponent);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0
  },
  pagerViewNav: {
    marginVertical: 4,
    alignSelf: 'center'
  },
  pagerView: {
    flex: 1
  }
});
