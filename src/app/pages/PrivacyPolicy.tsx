import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="privacy">
      <h1 className={"flex justify-content-center align-items-center p-4 m-4"}>Privacy Policy</h1>

      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>Introduction</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>
      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>What information do we collect?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>

      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>How do we use your information?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>
      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>Do we disclose any information to outside parties?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>
      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>Can you access your information?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>

      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>Do we use cookies?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>

      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>Do we disclose any information to outside parties?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>

      <div className="shadow-1 flex flex-column justify-content-center align-items-center p-2 m-2">
        <h3 className={"mx-2 p-2"}>Can you access your information?</h3>
        <p className={"privacy-p"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus odio
          perferendis expedita iure necessitatibus adipisci, quae vero fugit
          suscipit quas fugiat eligendi accusantium dicta! Hic corrupti sunt
          exercitationem atque iure.
        </p>
      </div>

      <Button onClick={() => navigate("/")} label="Back to home" />
    </div>
  );
}
