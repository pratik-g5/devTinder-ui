import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const HandleupdatePassword = async () => {
    try {
      setShowError(false);
      const response = await axios.post(
        BASE_URL + '/profile/password',
        {
          existingPassword,
          newPassword,
          repeatNewPassword,
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
      setExistingPassword('');
      setNewPassword('');
      setRepeatNewPassword('');
    } catch (err) {
      setShowError(true);
      setError(err?.response?.data || 'Change Password failed');
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Change Password</legend>

        <label className="label">Existing Password</label>
        <input
          type="password"
          className="input"
          value={existingPassword}
          onChange={(e) => setExistingPassword(e.target.value)}
          onClick={() => setShowError(false)}
        />

        <label className="label">New Password</label>
        <input
          type="password"
          className="input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onClick={() => setShowError(false)}
        />
        <label className="label">Repeat New Password</label>
        <input
          type="password"
          className="input"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
          onClick={() => setShowError(false)}
        />
        {showError && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="btn btn-neutral mt-4"
          onClick={() => HandleupdatePassword()}
        >
          Update Password
        </button>
      </fieldset>
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

export default ChangePassword;
