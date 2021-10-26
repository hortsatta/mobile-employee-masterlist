import { FC, useMemo } from 'react';
import { UpsertEmployeeOptional } from './upsert-employee-optional.component';
import { UpsertEmployeePage0 } from './upsert-employee-page-0.component';
import { UpsertEmployeePage1 } from './upsert-employee-page-1.component';
import { UpsertEmployeePage2 } from './upsert-employee-page-2.component';
import { UpsertEmployeePage3 } from './upsert-employee-page-3.component';
import { UpsertEmployeePage4 } from './upsert-employee-page-4.component';

type Props = {
  isUpdate: boolean;
  isCompleted: boolean;
  onSkipPage: () => void;
}

const getEmployeePageCount = (isUpdate: boolean): number => (
  isUpdate ? 5 : 6
);

const UpsertEmployeePages: FC<Props> = ({ isUpdate, isCompleted, onSkipPage }) => {
  const mainPages = useMemo(() => (isUpdate
    ? [UpsertEmployeePage1, UpsertEmployeePage2, UpsertEmployeePage3]
    : [UpsertEmployeePage0, UpsertEmployeePage1, UpsertEmployeePage2, UpsertEmployeePage3]
  ), [isUpdate]);

  return (
    <>
      {mainPages.map((Component, index) => <Component key={index.toString()} />)}
      <UpsertEmployeeOptional onSkipPage={onSkipPage} />
      <UpsertEmployeePage4 isUpdate={isUpdate} isCompleted={isCompleted} />
    </>
  );
};

export { getEmployeePageCount, UpsertEmployeePages };
