const UserCard = ({ user }) => {
  const { firstName, lastName, age, photoUrl, gender, skills, about } = user;
  return (
    <div className="card bg-base-300 w-60 shadow-sm ">
      <figure>
        <img src={photoUrl} alt="user's photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {age && gender && <p>{age + ' ' + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
