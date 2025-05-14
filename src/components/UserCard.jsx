const UserCard = ({ feed }) => {
  const { firstName, lastName, age, gender, skills, photoUrl, about } = feed;
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Profile"
          className="w-full h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p className="text-md text-neutral-400">{age + ', ' + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center py-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
