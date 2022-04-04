const Card = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="h-96 w-96">Picture here</div>
      <div>
        <h3>Title</h3>
        <p>Description</p>
      </div>
    </div>
  );
};

export default Card;
