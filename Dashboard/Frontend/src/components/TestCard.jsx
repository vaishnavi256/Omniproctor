import { Link } from "react-router-dom";

const TestCard = ({ name, id }) => (
  <div className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md">
    <h3 className="font-medium text-accent-foreground">{name}</h3>
    <Link to={`/view/${id}`} className="bg-accent-foreground text-accent px-4 py-1 rounded ">
      View Test
    </Link>
  </div>
);

export default TestCard;
