import { useState } from 'react';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  // const { firstName, lastName, age, gender, about, skills, photoUrl } = user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError('');
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, gender, photoUrl, about, skills },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } catch (err) {
      setError(err.response.data);
      console.log(error);
    }
  };
  return (
    <>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row p-6 gap-8 max-w-6xl mx-auto">
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full lg:w-96 border p-6 shadow-lg">
          <div className="fieldset-legend text-lg font-semibold text-primary">
            Edit Profile
          </div>
          {/* {console.log(user)} */}
          <label className="label">
            <span className="label-text font-medium">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />

          <label className="label">
            <span className="label-text font-medium">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />

          <label className="label">
            <span className="label-text font-medium">Photo URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Enter your photo Url"
          />

          <label className="label">
            <span className="label-text font-medium">Age</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />

          <label className="label">
            <span className="label-text font-medium">Gender</span>
          </label>
          <select
            defaultValue={gender}
            className="select select-bordered w-full"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Choose your gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>

          <label className="label">
            <span className="label-text font-medium">About</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full resize-none"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Bio"
          ></textarea>

          <label className="label">
            <span className="label-text font-medium">Skills</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Write about your skills"
          />
          <button className="btn btn-primary w-full mt-6" onClick={saveProfile}>
            Save
          </button>
          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}
        </fieldset>

        <div className="flex justify-center lg:justify-start">
          <UserCard
            user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
