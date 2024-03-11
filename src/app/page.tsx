import TaskList from "@/components/TaskList";

const Home = async ({}) => {
  return (
    <div className="home-container">
      <div className="h-screen">
        <h3 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-16 pb-10 sm:pb-24">
          Welcome to Task Manager
        </h3>
        <div className="grid place-items-center">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Home;
