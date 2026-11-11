
const webhookUrl = "https://mishra0510.app.n8n.cloud/webhook-test/coaching-lead";

const lead = {
  name: "Rahul Kumar",
  email: "rahul33.test@gmail.com",
  phone: "9873343210",
  course: "Full Stack Development"
};

async function submitLead() {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead)
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", result);

  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

submitLead();
