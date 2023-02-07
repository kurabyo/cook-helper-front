function UserInfo({ user }) {
    return (
      <div className="text-center">
        <h1>Hello, {user.username}</h1>
      </div>
    );
  }
  
  export default UserInfo;