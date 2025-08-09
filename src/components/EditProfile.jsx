import { useState } from 'react';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  // const { firstName, lastName, age, gender, about, skills, photoUrl } = user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-lg ">Edit Profile </legend>
        {console.log(user)}
        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Enter your photo Url"
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Enter your gender"
        />

        <label className="label">About</label>
        <input
          type="text"
          className="input"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Write more about yourself"
        />

        <label className="label">Skills</label>
        <input
          type="text"
          className="input"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Write about your skills"
        />
      </fieldset>

      <UserCard
        user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
      />
    </>
  );
};

export default EditProfile;
