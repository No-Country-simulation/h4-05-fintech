import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Select from "react-select";
import axios from "axios";

interface Option {
  value: string;
  label: string;
}

const Ocupacion = () => {

  const [formData, setFormData] = useState<{ ocupacion: string }>({ ocupacion: "" });
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const options = [
    { value: 'Arquitecto', label: 'Arquitecto' },
    { value: 'Ingeniero', label: 'Ingeniero' },
    { value: 'Abogado', label: 'Abogado' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:3000", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    setError(null);
    if (selectedOption) {
      const newFormData = { ...formData, ocupacion: selectedOption.value };
      setFormData(newFormData);
      setSelectedValue(selectedOption);
      localStorage.setItem("formData", JSON.stringify(newFormData));
    }
  };



  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center mt-[11rem]" >
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            className="w-[341px] h-[49px]"
          />
        </div>
        <div className=" justify-end grid-rows-12">
          <p className="text-[#88D0EF] text-center">Cual es tu ocupación?</p>
        </div>
        <Card className=" border-none shadow-none">
          <form onSubmit={handleSubmit} className="space-y-2 mt-[5rem]">
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="ocupacion"
                className="text-[#8BD0EF]"
              >
                Ocupación:
              </Label>
              <Select
                options={options}
                onChange={handleChange}
                value={selectedValue}
                className="w-full h-[52px] bg-[#11668233] text-[#8BD0EF] text-base font-normal tracking-wide px-2 mx-2"
              />
              <p className="text-center font-semibold text-indigo-200">Selected Value: {selectedValue?.label}</p>
            </div>
            <Button type="submit" className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
              Continuar
            </Button>
          </form>
          {error && <p>{error}</p>}
        </Card>
      </div>
    </main>
  )
}

export default Ocupacion;
