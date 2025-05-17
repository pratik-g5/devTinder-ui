import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setError(null);
      const response = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(response?.data?.user));
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 1000);
    } catch (err) {
      setError(err?.response?.data || 'Profile update failed');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-8 py-4 px-2 sm:px-0">
      <div className="w-full sm:w-auto flex justify-center items-center mx-2 sm:mx-8">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full sm:w-xs border p-4">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <label className="label">Age</label>
          <input
            type="text"
            className="input w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <fieldset className="fieldset">
            <legend className="label">Gender</legend>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select w-full"
            >
              <option
                disabled={true}
                value=""
              >
                choose gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </fieldset>

          <label className="label">About</label>
          <textarea
            type="text"
            className="textarea w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={() => handleSaveProfile()}
          >
            Save
          </button>
        </fieldset>
      </div>
      <div className="w-full sm:w-auto h-auto sm:h-80 pt-10 sm:pt-4 ">
        <UserCard
          feed={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
      {isSaved && (
        <div className="toast toast-top toast-center pt-10">
          <div className="alert alert-success">
            <span>Profile Saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
