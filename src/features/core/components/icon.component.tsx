import { FC } from 'react';
import { lightColors } from 'config/core';

import ArrowListAscendingSvg from 'assets/svgs/arrow-up-short-wide.svg';
import ArrowListDescendingSvg from 'assets/svgs/arrow-down-wide-short.svg';
import CameraSvg from 'assets/svgs/camera.svg';
import CameraSlashSvg from 'assets/svgs/camera-slash.svg';
import CaretDownSvg from 'assets/svgs/caret-down.svg';
import CaretUpSvg from 'assets/svgs/caret-up.svg';
import CircleXmarkSvg from 'assets/svgs/circle-xmark.svg';
import DoorOpenSvg from 'assets/svgs/door-open.svg';
import EllipsisStrokeVerticalSvg from 'assets/svgs/ellipsis-stroke-vertical.svg';
import EnvelopeSvg from 'assets/svgs/envelope.svg';
import EyeSvg from 'assets/svgs/eye.svg';
import EyeSlashSvg from 'assets/svgs/eye-slash.svg';
import FemaleSvg from 'assets/svgs/venus.svg';
import FilterSvg from 'assets/svgs/filter.svg';
import FloppyDiskSvg from 'assets/svgs/floppy-disk.svg';
import FloppyDiskArrowRightSvg from 'assets/svgs/floppy-disk-circle-arrow-right.svg';
import GemSvg from 'assets/svgs/gem.svg';
import GithubSvg from 'assets/svgs/github.svg';
import ImageSvg from 'assets/svgs/image.svg';
import ImageSlashSvg from 'assets/svgs/image-slash.svg';
import KeySvg from 'assets/svgs/key.svg';
import LeftSvg from 'assets/svgs/left.svg';
import MagnifyingGlassSvg from 'assets/svgs/magnifying-glass.svg';
import MaleSvg from 'assets/svgs/mars.svg';
import PenSwirlSvg from 'assets/svgs/pen-swirl.svg';
import PlusSvg from 'assets/svgs/plus.svg';
import RotateSvg from 'assets/svgs/rotate.svg';
import SquareCheckSvg from 'assets/svgs/square-check.svg';
import SquarePlusSvg from 'assets/svgs/square-plus.svg';
import UserTieSvg from 'assets/svgs/user-tie.svg';
import XmarkSvg from 'assets/svgs/xmark.svg';

export enum IconName {
  ARROW_LIST_ASCENDING = 'arrow_list_ascending',
  ARROW_LIST_DESCENDING = 'arrow_list_descending',
  CAMERA = 'camera',
  CAMERA_SLASH = 'camera_slash',
  CARET_DOWN = 'caret_down',
  CARET_UP = 'caret_up',
  CIRCLE_XMARK = 'circle_xmark',
  DOOR_OPEN = 'door_open',
  ELLIPSIS_STROKE_VERTICAL = 'ellipsis_stroke_vertical',
  ENVELOPE = 'envelope',
  EYE = 'eye',
  EYE_SLASH = 'eye_slash',
  FEMALE = 'female',
  FILTER = 'filter',
  FLOPPY_DISK = 'floppy_disk',
  FLOPPY_DISK_ARROW_RIGHT = 'floppy_disk_arrow_right',
  GEM = 'gem',
  GITHUB = 'github',
  IMAGE = 'image',
  IMAGE_SLASH = 'image_slash',
  KEY = 'key',
  LEFT = 'left',
  MAGNIFYING_GLASS = 'magnifying_glass',
  MALE = 'male',
  PEN_SWIRL = 'pen_swirl',
  PLUS = 'plus',
  ROTATE = 'rotate',
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
    case IconName.CAMERA:
      return CameraSvg;
    case IconName.CAMERA_SLASH:
      return CameraSlashSvg;
    case IconName.CARET_DOWN:
      return CaretDownSvg;
    case IconName.CARET_UP:
      return CaretUpSvg;
    case IconName.CIRCLE_XMARK:
      return CircleXmarkSvg;
    case IconName.DOOR_OPEN:
      return DoorOpenSvg;
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
    case IconName.GEM:
      return GemSvg;
    case IconName.GITHUB:
      return GithubSvg;
    case IconName.IMAGE:
      return ImageSvg;
    case IconName.IMAGE_SLASH:
      return ImageSlashSvg;
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
    case IconName.ROTATE:
      return RotateSvg;
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
