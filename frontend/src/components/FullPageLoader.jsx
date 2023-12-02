import LoadingImage from '../assets/loading.gif'

const FullPageLoader = () => {
  return (
    <>
      <div className="h-[80vh] flex justify-center items-center">
        <img src={LoadingImage} alt="loading" />
      </div>
    </>
  );
};

export default FullPageLoader;
