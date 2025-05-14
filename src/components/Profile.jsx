import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import UserCard from './UserCard';

const Profile = () => {
  const userData = useSelector((store) => store.user);

  return userData && <EditProfile user={userData} />;
};

export default Profile;
