export const sendMetaEvent = async (event) => {
  await fetch("/api/meta/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [event],
    }),
  });
};