import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import CoverAccountingSvg from 'assets/svgs/cover-accounting.svg';
import CoverAuditSvg from 'assets/svgs/cover-audit.svg';
import CoverHrSvg from 'assets/svgs/cover-hr.svg';
import CoverItSvg from 'assets/svgs/cover-it.svg';

const enum DepartmentId {
  ACCOUNTING = '96AXvOeRZXkEoDCbuhWq',
  AUDIT = '8JcQHnOnS1R07SCcziU5',
  HR = 'cV4at0NQqawQ9KBJQ2Ja',
  IT = 'm4Oj8QMCXarmDyQn1nUi',
}

type Props = {
  departmentId: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const getGradientColors = (departmentId : string) => {
  switch (departmentId) {
    // Accounting
    case DepartmentId.ACCOUNTING:
      return ['#8dcbfd', '#5bafec', '#3398de'];
    // Audit
    case DepartmentId.AUDIT:
      return ['#efa5d0', '#ec82bf', '#e966b3'];
    // Human Resource
    case DepartmentId.HR:
      return ['#c2adff', '#a080ff', '#875eff'];
    // Information Technology
    case DepartmentId.IT:
      return ['#8ff1d3', '#6bdab4', '#42bf91'];
    default:
      return ['#8dcbfd', '#5bafec', '#3398de'];
  }
};

const Svg: FC<Props & SvgProps> = ({ departmentId, ...moreProps }) => {
  switch (departmentId) {
    case DepartmentId.ACCOUNTING:
      return (
        <CoverAccountingSvg
          style={[styles.svg, styles.accountingSvg]}
          width={215}
          height={215}
          {...moreProps}
        />
      );
    case DepartmentId.AUDIT:
      return (
        <CoverAuditSvg
          style={[styles.svg, styles.auditSvg]}
          width={236}
          height={236}
          {...moreProps}
        />
      );
    case DepartmentId.HR:
      return (
        <CoverHrSvg
          style={[styles.svg, styles.hrSvg]}
          width={225}
          height={225}
          {...moreProps}
        />
      );
    case DepartmentId.IT:
      return (
        <CoverItSvg
          style={[styles.svg, styles.itSvg]}
          width={225}
          height={225}
          {...moreProps}
        />
      );
    default:
      return (
        <CoverAccountingSvg
          style={[styles.svg, styles.accountingSvg]}
          width={215}
          height={215}
          {...moreProps}
        />
      );
  }
};

export const EmployeeCoverImage: FC<Props> = ({ style, departmentId, children }) => {
  const colors = getGradientColors(departmentId);

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.gradientWrapper}>
        <LinearGradient colors={colors}>
          <Svg fill='#000' departmentId={departmentId} />
        </LinearGradient>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    backgroundColor: '#000'
  },
  gradientWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  svg: {
    alignSelf:'center'
  },
  accountingSvg: { top: 20 },
  auditSvg: { top: 15 },
  hrSvg: { top: 30 },
  itSvg: { top: 20 }
});
