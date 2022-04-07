import Link from "next/link";
const Card = ({ data }) => {
  console.log(data);
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div>
        <embed
          src={`data:image/svg+xml;base64,${data.svg}`}
          height="200"
          width="200"
        />
      </div>
      <div className="truncate w-[200px]">
        <Link href={data.link}>
          <a>Goto:{data.link}</a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
