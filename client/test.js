
const webhookUrl = "https://mishra0510.app.n8n.cloud/webhook-test/coaching-lead";

const lead = {
  idempotencyKey: "test-lead-002",
  name: "LuckyAbhi ",
  email: "mishra10@gmail.com",
  phone: "9065991886",
  course: "UG in Geography"
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
