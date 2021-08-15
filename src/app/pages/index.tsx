import TopNav from "app/components/TopNav";
import Body from "app/components/Body";

const Index = () => {
  return (
    <div className={"conatiner"}>
      <div className="index title">
        <TopNav></TopNav>
      </div>
      <div className="body">
        <Body />
      </div>
    </div>
  );
};

export default Body