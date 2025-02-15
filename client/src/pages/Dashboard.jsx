import UserData from "../components/UserData";

function Dashboard() {

  return (
    <>
      <div className="container flex flex-wrap p-10 justify-self-center items-center bg-white dark:bg-gray-200 shadow  md:w-[50%] w-[80%]">
        <UserData />
      </div>
    </>
  );
}

export default Dashboard;
