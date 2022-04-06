import Link from "next/link";
const Card = ({ data }) => {
  console.log(data);
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
      <div>
        <embed
          src={`data:image/svg+xml;base64,${data.svg}`}
          width="200"
          height="200"
        />
      </div>
      <div>
        <Link href={data.link}>
          <a>{data.link}</a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
