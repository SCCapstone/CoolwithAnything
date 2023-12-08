// app/generate+api.ts
import { ExpoResponse } from "expo-router";

export async function EXPOGET() {
  debugger;
  const json = await fetch(
    "http://api.api-ninjas.com/v1/exercises?muscle=chest",
    {
      headers: {
        "x-api-key": "YI2p8KNjtpE/7cMNLJH7Vg==EwWwS5V84xFH9Ty3",
      },
      method: "GET",
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
      }),
    }
  ).then((res) => res.json());
  debugger;
  console.log(json);
  return ExpoResponse.json(json);
}
