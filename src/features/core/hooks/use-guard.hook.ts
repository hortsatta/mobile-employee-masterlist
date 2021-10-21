import { useSelector } from 'react-redux';
import { validateRole } from 'helpers';
import { selectCurrentUserRole } from 'store/auth/auth.selectors';

type UseGuard = {
  canActivate: (actions: string[]) => boolean;
}

export const useGuard = (): UseGuard => {
  const currentUserRole = useSelector(selectCurrentUserRole);

  const canActivate = (actions: string[]): boolean => (
    validateRole(currentUserRole?.value || 0, actions)
  );

  return { canActivate };
};
