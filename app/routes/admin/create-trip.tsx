import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import React, { useState } from "react";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems, user } from "~/constants";
import { cn, formatKey } from "~/lib/utils";
import { LayerDirective, LayersDirective, MapsComponent } from "@syncfusion/ej2-react-maps";
//import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
import { redirect, useNavigate } from "react-router";
//import { n } from "node_modules/react-router/dist/development/lib-CCSAGgcP.mjs";
//import { n } from "node_modules/react-router/dist/development/lib-CCSAGgcP.mjs";
//import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
export const loader = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flag + country.name.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
  }));
};
const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
     const countries = loaderData as Country[];
     const navigate = useNavigate();
    const [formData, setFormData] = React.useState<TripFormData>({
        country: countries[0]?.name || "",
        travelStyle: "",
        interest: "",
        budget: "",
        duration: 0,
        groupType: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (even: React.FormEvent<HTMLFormElement>) => {
   even.preventDefault();
   setLoading(true);
   if (
    !formData.country ||
    !formData.travelStyle ||
    !formData.interest ||
    !formData.budget ||
    !formData.duration ||
    !formData.groupType

) {
    

    setError('Please fill in all fields');
    setLoading(false);
    return;
   }

   if (formData.duration < 1 || formData.duration > 10) {
    setError('Duration must be between 1 and 10 days');
    setLoading(false);
    return;
   }

    const user = await account.get();
    if (!user.$id) {
      console.error("User not authenticated");
      setLoading(false);
      return;
    }
   try {
    const response = await fetch("/api/create-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: formData.country,
         numberOfDays: formData.duration,
         travelStyle: formData.travelStyle,
         interests: formData.interest,
         budget: formData.budget,
         groupType: formData.groupType,
         userId: user.$id,
      }),
    });
    const result : CreateTripResponse  = await response.json();
    if (result?.id) navigate(`/trip/${result.id}`);
    else console.error("Error creating trip:", result);
    console.log(result);
    
    
   } catch (error) {
    console.error("Error creating trip:", error);
    
   }finally {
    setLoading(false);
   }
  };
  
  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
 
  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));
  const mapData = [
    {
        country: formData.country,
        color: "#EA382E",
        coordinates: countries.find((country) => country.name === formData.country)?.coordinates || [0, 0]
    }
  ]

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI generated travel plans"
      />
      <section className="mt-2.5 wrapper-md">
        <form action="" className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a country"
              allowCustom={true}
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering={true}
              filtering={(e) => {
                const query = e.text.toLowerCase();
                const filteredData = countries
                  .filter((country) =>
                    country.name.toLowerCase().includes(query)
                  )
                  .map((country) => ({
                    text: country.name,
                    value: country.value,
                  }));
                e.updateData(filteredData);
              }}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Enter a number of days (5,12..."
              className="form-input placeholder:text-gray-100 border-gray-400 "
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>
          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering={true}
                filtering={(e) => {
                  const query = e.text.toLowerCase();
                  const filteredData = comboBoxItems[key]
                    .filter((item) =>
                      item.toLowerCase().includes(query)
                    )
                    .map((item) => ({
                      text: item,
                      value: item,
                    }));
                  e.updateData(filteredData);
                }}
                className="combo-box"
              />
            </div>
          ))}
          <div>
            <label htmlFor="location">
                Location on the world map
            </label>
            <MapsComponent>
             <LayersDirective>
                <LayerDirective
                shapeData={world_map}
                shapePropertyPath="name"
                shapeDataPath="country"
                shapeSettings={{
                    colorValuePath: "color",
                    fill: "#e5e5e5"
                }}
                  dataSource={mapData}
                  
                />
             </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full"/>
          {error && (
            <div className="error">
               <p>{error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              iconCss="e-search-icon"
              className="button-class !h-11 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${loading ? "loader" : "magic-star"}.svg`}
                alt="search"
                className={cn("size-5", loading ? "animate-spin" : "")}
              />
              <span className="ml-2 p16-semibold text-white">{loading ? "Creating..." : "Create Trip"}</span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
