import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const changePassword = async () => {
    setError('');

    try {
      const res = await axios.patch(
        BASE_URL + '/profile/changepassword',
        {
          emailId: user.emailId,
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 2000);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      {toast && (
        <div className="toast toast-top toast-end mt-15">
          <div className="alert alert-success shadow-lg">
            <span>Password changed successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-20">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full lg:w-96 border p-6 shadow-lg">
          <div className="fieldset-legend text-lg font-semibold text-primary">
            Change Password
          </div>

          {/* Old Password */}
          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Old Password</span>
            </label>
            <input
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="input input-bordered w-full pr-10 mt-2"
              placeholder="Enter your old password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">New Password</span>
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full pr-10 mt-2"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-3"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            onClick={changePassword}
            className="btn btn-primary w-full mt-6"
          >
            Save
          </button>
          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}
        </fieldset>
      </div>
    </>
  );
};

export default ChangePassword;
