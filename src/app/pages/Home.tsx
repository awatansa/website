import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
export default function Home() {
  const [city, setCity] = useState("");
  const citySelectItems = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <Dropdown
          value={city}
          options={citySelectItems}
          onChange={(e) => setCity(e.value)}
          placeholder="Select a City"
        />
         
        <p className="text-gray-600 dark:text-blue-200">
          You have a new message!
        </p>
      </div>
    </div>
  );
}
