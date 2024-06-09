import OfficeDataInterface, {
  ReservationData,
} from "@/interfaces/OfficeInterface";

const API_KEY = "http://localhost:3000";

export async function sendOffice(officeData: OfficeDataInterface) {
  console.log({ ...officeData });
  const response = await fetch(API_KEY + "/api/v1/office/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(officeData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    console.error(bodyText);
    throw new Error(`${bodyText}`);
  }
}

export async function getOffice() {
  const response = await fetch(API_KEY + "/api/v1/office/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    console.error(response);
    throw new Error(`${bodyText}`);
  }
}

export async function getUserOffice(userId: string | undefined) {
  const response = await fetch(API_KEY + "/api/v1/user/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    console.error(response);
    throw new Error(`${bodyText}`);
  }
}

export async function getDeskReservations(
  deskId: string,
  officeId: string | undefined
) {
  const response = await fetch(
    API_KEY + "/api/v1/reservations/" + officeId + "/" + deskId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    console.error(response);
    throw new Error(`${bodyText}`);
  }
}

export async function makeReservation(
  deskId: string,
  officeId: string | undefined,
  reservation: ReservationData
) {
  const response = await fetch(
    API_KEY + "/api/v1/reservations/" + officeId + "/" + deskId,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    console.error(response);
    throw new Error(`${bodyText}`);
  }
}

export async function changeAvailibility(
  deskId: string | undefined,
  officeId: string | undefined,
  active: boolean
) {
  const response = await fetch(
    API_KEY + "/api/v1/office/" + officeId + "/" + deskId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const bodyText = await response.text();
    console.error(response);
    throw new Error(`${bodyText}`);
  }
}
