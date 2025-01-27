import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";


const Nombre = () => {
  const [formData, setFormData] = useState({
    name: "",
    secondname: "",
  });

  const [_error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:4000", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <p className="text-[#88D0EF] text-center">Quien eres?</p>
        </div>
        <Card className=" border-none shadow-none">
          <form onSubmit={handleSubmit} className="space-y-2 mt-[5rem]">
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="name"
                className="text-[#8BD0EF]"
              >
                Nombre
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
            </div>
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="apellido"
                className="text-[#8BD0EF]"
              >
                Apellido
              </Label>
              <Input
                id="secondname"
                type="text"
                name="secondname"
                value={formData.secondname}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
            </div>
            <Link to='/edad'>
              <Button type="submit" className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
                Continuar
              </Button>
            </Link>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default Nombre;
