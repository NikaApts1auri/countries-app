import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./card-create.css";
import OtpInputs from "@/Components/OTP/otp";
import { postCountries } from "@/api/countries";
import { ICountry } from "@/api/countries/api";

type CardCreateFormProps = {
  onCardCreate: (
    image: string | null,
    nameEn: string,
    nameKa: string,
    capitalEn: string,
    capitalKa: string,
    population: string,
  ) => void;
  refetch: () => void;
};

export default function CardCreateForm({ refetch }: CardCreateFormProps) {
  const [nameEn, setNameEn] = useState("");
  const [nameKa, setNameKa] = useState("");
  const [capitalEn, setCapitalEn] = useState("");
  const [capitalKa, setCapitalKa] = useState("");
  const [population, setPopulation] = useState("");
  const [validationError, setValidationError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "ka">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async (newCountry: ICountry) => {
      return postCountries(newCountry);
    },
    onSuccess: () => {
      refetch();
      setIsSubmitting(false);
      setValidationError("");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!nameEn || !capitalEn || !nameKa || !capitalKa) {
      setValidationError(
        "ინგლისურ და ქართულ ენაზე სახელები და დედაქალაქები აუცილებელია.",
      );
      setIsSubmitting(false);
      return;
    }

    if (!population || isNaN(Number(population)) || Number(population) < 0) {
      setValidationError("მოსახლეობა დადებითი უნდა იყოს.");
      setIsSubmitting(false);
      return;
    }

    const newCountry: ICountry = {
      image,
      nameEn,
      nameKa,
      capitalEn,
      capitalKa,
      population,
      id: Date.now().toString(),
      vote: 0,
      isDeleted: false,
    };

    mutation.mutate(newCountry);

    setNameEn("");
    setNameKa("");
    setCapitalEn("");
    setCapitalKa("");
    setPopulation("");
    setValidationError("");
    setImage(null);
  };

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImage = ["image/jpeg", "image/png"];
      if (!validImage.includes(file.type)) {
        setValidationError("გთხოვთ ატვირთოთ სურათი (jpg ან png).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <OtpInputs />
      <form className="form-container" onSubmit={handleSubmit} noValidate>
        <div className="tab-buttons">
          <button
            type="button"
            onClick={() => setActiveTab("en")}
            className={activeTab === "en" ? "active" : ""}
          >
            ინგლისური
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ka")}
            className={activeTab === "ka" ? "active" : ""}
          >
            ქართული
          </button>
        </div>

        {activeTab === "en" && (
          <>
            <div className="form-group">
              <label htmlFor="nameEn">name</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                id="nameEn"
                name="nameEn"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capitalEn">capital</label>
              <input
                type="text"
                value={capitalEn}
                onChange={(e) => setCapitalEn(e.target.value)}
                id="capitalEn"
                name="capitalEn"
                required
              />
            </div>
          </>
        )}

        {activeTab === "ka" && (
          <>
            <div className="form-group">
              <label htmlFor="nameKa">სახელი (ქართული)</label>
              <input
                type="text"
                value={nameKa}
                onChange={(e) => setNameKa(e.target.value)}
                id="nameKa"
                name="nameKa"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capitalKa">დედაქალაქი (ქართული)</label>
              <input
                type="text"
                value={capitalKa}
                onChange={(e) => setCapitalKa(e.target.value)}
                id="capitalKa"
                name="capitalKa"
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="population">population</label>
          <input
            type="text"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            id="population"
            name="population"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="upload">upload</label>
          <input
            type="file"
            onChange={handleAddImage}
            id="image"
            name="image"
            required
          />
        </div>

        {validationError && <p className="error">{validationError}</p>}

        <button type="submit" disabled={isSubmitting || mutation.isLoading}>
          create card
        </button>
      </form>
    </>
  );
}
