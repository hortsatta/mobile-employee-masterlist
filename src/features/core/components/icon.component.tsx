import React, { FC } from 'react';
import { lightColors } from 'config/core';

import EllipsisStrokeVerticalSvg from 'assets/svgs/ellipsis-stroke-vertical.svg';
import EnvelopeSvg from 'assets/svgs/envelope.svg';
import EyeSvg from 'assets/svgs/eye.svg';
import EyeSlashSvg from 'assets/svgs/eye-slash.svg';
import FilterListSvg from 'assets/svgs/filter-list.svg';
import FloppyDiskSvg from 'assets/svgs/floppy-disk.svg';
import GithubSvg from 'assets/svgs/github.svg';
import KeySvg from 'assets/svgs/key.svg';
import LeftSvg from 'assets/svgs/left.svg';
import PlusSvg from 'assets/svgs/plus.svg';
import XmarkSvg from 'assets/svgs/xmark.svg';

export enum IconName {
  ELLIPSIS_STROKE_VERTICAL = 'ellipsis_stroke_vertical',
  ENVELOPE = 'envelope',
  EYE = 'eye',
  EYE_SLASH = 'eye_slash',
  FILTER_LIST = 'filter_list',
  FLOPPY_DISK = 'floppy_disk',
  GITHUB = 'github',
  KEY = 'key',
  LEFT = 'left',
  PLUS = 'plus',
  XMARK = 'xmark'
}

const getSvg = (name: IconName | string) => {
  switch (name) {
    case IconName.ELLIPSIS_STROKE_VERTICAL:
      return EllipsisStrokeVerticalSvg;
    case IconName.ENVELOPE:
      return EnvelopeSvg;
    case IconName.EYE:
      return EyeSvg;
    case IconName.EYE_SLASH:
      return EyeSlashSvg;
    case IconName.FILTER_LIST:
      return FilterListSvg;
    case IconName.FLOPPY_DISK:
      return FloppyDiskSvg;
    case IconName.GITHUB:
      return GithubSvg;
    case IconName.KEY:
      return KeySvg;
    case IconName.LEFT:
      return LeftSvg;
    case IconName.PLUS:
      return PlusSvg;
    case IconName.XMARK:
      return XmarkSvg;
    default:
      return XmarkSvg;
  }
};

type Props = {
  name: IconName | string;
  style?: any;
  color?: string;
  size?: number;
  direction?: 'rtl' | 'ltr';
  allowFontScaling?: boolean;
}

export const Icon: FC<Props> = ({ style, name, color, size }) => {
  const IconSvg = getSvg(name);
  return (
    <IconSvg style={style} width={size} height={size} fill={color} />
  );
};

Icon.defaultProps = {
  color: lightColors.text,
  size: 32,
  direction: 'ltr'
};
