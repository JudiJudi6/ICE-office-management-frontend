import OfficeDataInterface from "@/interfaces/OfficeInterface";

const API_KEY = "http://localhost:3000";

export async function sendOffice(officeData: OfficeDataInterface) {
  const response = await fetch(API_KEY + "/api/v1/office/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...officeData,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    throw new Error(`${bodyText}`);
  }
}
