'use client'
import ProfileClient from '@/components/Action-Interface/User/common/Profile/ProfileClient'
import Protected from '@/hooks/useProtected'
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state: any) => state.auth.user);

  return (
    <div>
      <Protected>
       <ProfileClient user={user}  />
      </Protected>
    </div>
  )
}

export default UserProfile