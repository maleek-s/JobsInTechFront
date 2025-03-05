import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
};

export default Loader;
