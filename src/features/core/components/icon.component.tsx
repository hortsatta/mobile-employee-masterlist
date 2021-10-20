import React, { FC } from 'react';
import { lightColors } from 'config/core';

import ArrowListAscendingSvg from 'assets/svgs/arrow-up-short-wide.svg';
import ArrowListDescendingSvg from 'assets/svgs/arrow-down-wide-short.svg';
import CircleXmark from 'assets/svgs/circle-xmark.svg';
import EllipsisStrokeVerticalSvg from 'assets/svgs/ellipsis-stroke-vertical.svg';
import EnvelopeSvg from 'assets/svgs/envelope.svg';
import EyeSvg from 'assets/svgs/eye.svg';
import EyeSlashSvg from 'assets/svgs/eye-slash.svg';
import FemaleSvg from 'assets/svgs/venus.svg';
import FilterSvg from 'assets/svgs/filter.svg';
import FloppyDiskSvg from 'assets/svgs/floppy-disk.svg';
import FloppyDiskArrowRightSvg from 'assets/svgs/floppy-disk-circle-arrow-right.svg';
import GithubSvg from 'assets/svgs/github.svg';
import KeySvg from 'assets/svgs/key.svg';
import LeftSvg from 'assets/svgs/left.svg';
import MagnifyingGlassSvg from 'assets/svgs/magnifying-glass.svg';
import MaleSvg from 'assets/svgs/mars.svg';
import PenSwirlSvg from 'assets/svgs/pen-swirl.svg';
import PlusSvg from 'assets/svgs/plus.svg';
import ScreenUsersSvg from 'assets/svgs/screen-users.svg';
import SquareCheckSvg from 'assets/svgs/square-check.svg';
import SquarePlusSvg from 'assets/svgs/square-plus.svg';
import UserTieSvg from 'assets/svgs/user-tie.svg';
import XmarkSvg from 'assets/svgs/xmark.svg';

export enum IconName {
  ARROW_LIST_ASCENDING = 'arrow_list_ascending',
  ARROW_LIST_DESCENDING = 'arrow_list_descending',
  CIRCLE_XMARK = 'circle_xmark',
  ELLIPSIS_STROKE_VERTICAL = 'ellipsis_stroke_vertical',
  ENVELOPE = 'envelope',
  EYE = 'eye',
  EYE_SLASH = 'eye_slash',
  FEMALE = 'female',
  FILTER = 'filter',
  FLOPPY_DISK = 'floppy_disk',
  FLOPPY_DISK_ARROW_RIGHT = 'floppy_disk_arrow_right',
  GITHUB = 'github',
  HEAD_SIDE = 'head_side',
  KEY = 'key',
  LEFT = 'left',
  MAGNIFYING_GLASS = 'magnifying_glass',
  MALE = 'male',
  PEN_SWIRL = 'pen_swirl',
  PLUS = 'plus',
  SCREEN_USERS = 'screen_users',
  SQUARE_CHECK = 'square_check',
  SQUARE_PLUS = 'square_plus',
  USER_TIE = 'user_tie',
  XMARK = 'xmark'
}

const getSvg = (name: IconName | string) => {
  switch (name) {
    case IconName.ARROW_LIST_ASCENDING:
      return ArrowListAscendingSvg;
    case IconName.ARROW_LIST_DESCENDING:
      return ArrowListDescendingSvg;
    case IconName.CIRCLE_XMARK:
      return CircleXmark;
    case IconName.ELLIPSIS_STROKE_VERTICAL:
      return EllipsisStrokeVerticalSvg;
    case IconName.ENVELOPE:
      return EnvelopeSvg;
    case IconName.EYE:
      return EyeSvg;
    case IconName.EYE_SLASH:
      return EyeSlashSvg;
    case IconName.FEMALE:
      return FemaleSvg;
    case IconName.FILTER:
      return FilterSvg;
    case IconName.FLOPPY_DISK:
      return FloppyDiskSvg;
    case IconName.FLOPPY_DISK_ARROW_RIGHT:
      return FloppyDiskArrowRightSvg;
    case IconName.GITHUB:
      return GithubSvg;
    case IconName.KEY:
      return KeySvg;
    case IconName.LEFT:
      return LeftSvg;
    case IconName.MAGNIFYING_GLASS:
      return MagnifyingGlassSvg;
    case IconName.MALE:
      return MaleSvg;
    case IconName.PEN_SWIRL:
      return PenSwirlSvg;
    case IconName.PLUS:
      return PlusSvg;
    case IconName.SCREEN_USERS:
      return ScreenUsersSvg;
    case IconName.SQUARE_CHECK:
      return SquareCheckSvg;
    case IconName.SQUARE_PLUS:
      return SquarePlusSvg;
    case IconName.USER_TIE:
      return UserTieSvg;
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
