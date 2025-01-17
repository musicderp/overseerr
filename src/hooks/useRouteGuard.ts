import { useEffect } from 'react';
import { useRouter } from './useRouter';
import { Permission, PermissionCheckOptions, useUser } from './useUser';

const useRouteGuard = (
  permission: Permission | Permission[],
  options?: PermissionCheckOptions
): void => {
  const router = useRouter();
  const { user, hasPermission } = useUser();

  useEffect(() => {
    if (user && !hasPermission(permission, options)) {
      router.push('/');
    }
  }, [user, permission, router, hasPermission, options]);
};

export default useRouteGuard;
